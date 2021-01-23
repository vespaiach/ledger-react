import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Expense from 'App/Models/Expense'
import { schema } from '@ioc:Adonis/Core/Validator'
import {
  parseOrderBy,
  fromSchema,
  toSchema,
  cateSchema,
  bySchema,
  pgSchema,
  dateSchema,
  amountSchema,
  descriptionSchema,
  categorySchema,
} from 'App/Utils/schemas'
import User from 'App/Models/User'
import NotAllowException from 'App/Exceptions/NotAllowException'
import { to2Decimal } from 'App/Utils/small'

const PER_PAGE = Env.get('PER_PAGE', 20)

export default class ExpensesController {
  /**
   * Return one expense record detail
   */
  public async detail({ params }) {
    const { id } = params

    return await Expense.findOrFail(id)
  }

  /**
   * Get list of expenses
   * Query parameters:
   *  from  : yyyy-MM-dd HH:mm:ss
   *  to    : yyyy-MM-dd HH:mm:ss
   *  cate  : category name
   *  by    : (required) order by. Ex: amount, -date...
   *  pg    : (required) page number
   */
  public async index({ request, auth }: HttpContextContract) {
    const { from, to, cate, by, pg } = await request.validate({
      schema: schema.create({
        from: fromSchema,
        to: toSchema,
        cate: cateSchema,
        by: bySchema,
        pg: pgSchema,
      }),
    })

    let query = Expense.query().select('*')
    /**
     * Only see what expenses belong to his/her account
     */
    query.where({ userId: (auth.user as User).id })
    if (from) {
      query = query.andWhere('date', '>', from.toSQL())
    }
    if (to) {
      query = query.andWhere('date', '<', to.toSQL())
    }
    if (cate) {
      query = query.andWhere({ category: cate })
    }

    const [col, dir] = parseOrderBy(by)
    return (await query.orderBy(col, dir).paginate(pg, PER_PAGE)).all()
  }

  /**
   * Paging request doesn't return paging information.
   * In order to provide paging information, we add another
   * API endpoint for getting total page number.
   *
   * Number of record per page is not customizable by clients,
   * but it can be configed through env variable.
   * PER_PAGE = 20 by default
   */
  public async total({ request, auth }: HttpContextContract) {
    const { from, to, cate } = await request.validate({
      schema: schema.create({
        from: fromSchema,
        to: toSchema,
        cate: cateSchema,
      }),
    })

    let query = Expense.query()
    /**
     * Only see what expenses belong to his/her account
     */
    query.where({ userId: (auth.user as User).id })
    if (from) {
      query = query.andWhere('date', '>', from.toSQL())
    }
    if (to) {
      query = query.andWhere('date', '<', to.toSQL())
    }
    if (cate) {
      query = query.andWhere({ category: cate })
    }

    const result = await query.count('id')
    const total = result ? Number(result[0].count) : 0

    return {
      total: Math.floor(total / PER_PAGE) + (total % PER_PAGE !== 0 ? 1 : 0),
      perPage: PER_PAGE,
    }
  }

  /**
   * Create new expenses record
   */
  public async store({ request, auth }: HttpContextContract) {
    const { date, amount, description, category } = await request.validate({
      schema: schema.create({
        date: dateSchema,
        amount: amountSchema,
        description: descriptionSchema,
        category: categorySchema,
      }),
    })

    const exp = new Expense()
    exp.date = date
    exp.amount = to2Decimal(amount)
    exp.description = description
    exp.category = category
    exp.userId = (auth.user as User).id

    return await exp.save()
  }

  /**
   * Update expense record
   *  id: is required, and has been checked for existing
   */
  public async update({ request, params, auth }: HttpContextContract) {
    const { id } = params
    const { date, amount, description, category } = await request.validate({
      schema: schema.create({
        date: dateSchema,
        amount: amountSchema,
        description: descriptionSchema,
        category: categorySchema,
      }),
    })

    const exp = await Expense.firstOrFail(id)
    /**
     * Don't allow to update expense of others
     */
    if (exp.userId !== (auth.user as User).id) {
      throw new NotAllowException('You are not allow to update')
    }
    if (date) {
      exp.date = date
    }
    if (amount) {
      exp.amount = to2Decimal(amount)
    }
    if (description) {
      exp.description = description
    }
    if (category) {
      exp.category = category
    }

    return await exp.save()
  }

  /**
   * Delete an expense record
   */
  public async delete({ params, auth }: HttpContextContract) {
    const { id } = params

    const exp = await Expense.firstOrFail(id)
    /**
     * Don't allow to delete expense of others
     */
    if (exp.userId !== (auth.user as User).id) {
      throw new NotAllowException('You are not allow to delete')
    }
    await exp.delete()

    return
  }
}
