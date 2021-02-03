import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Transaction from 'App/Models/Trasactions'

const transactionSchema = schema.object().members({
  id: schema.number.optional(),
  date: schema.date({ format: 'iso' }),
  amount: schema.number(),
  description: schema.string({ escape: true, trim: true }, [rules.maxLength(255)]),
  category: schema.string({ escape: true, trim: true }, [rules.maxLength(63)]),
})

export default class TransactionsController {
  /**
   * Get all transactions in year and sort by date in descending order
   */
  public async get({ params }: HttpContextContract) {
    const { year } = params

    const fromDate = DateTime.fromJSDate(new Date(year, 0, 1, 0, 0))
    const toDate = DateTime.fromJSDate(new Date(year, 11, 31, 0, 0))

    let query = Transaction.query()
    query = query.andWhere('date', '>', fromDate.toSQL())
    query = query.andWhere('date', '<', toDate.toSQL())

    return await query.orderBy('date', 'desc')
  }

  /**
   * Update batch of transactions or create if they are new.
   * Payload will be an array:
   * [
   *   {
   *      id: number | undefined,
   *      date: DateTime,
   *      amount: number,
   *      description: string,
   *      category: string
   *   }
   *   ...
   * ]
   *
   * @return
   * [
   *   {
   *      id: number | undefined,
   *      date: DateTime,
   *      amount: number,
   *      description: string,
   *      category: string
   *      status: string // Can be one of these value: ['updated', 'missed', 'created']
   *   }
   */
  public async sync({ request }: HttpContextContract) {
    const { payload } = await request.validate({
      schema: schema.create({
        payload: schema.array([rules.minLength(1)]).members(transactionSchema),
      }),
    })

    const results: {
      id: number | undefined
      date: DateTime
      amount: number
      description: string
      category: string
      status: string
    }[] = []

    for (const item of payload) {
      if (item.id) {
        const tran = await Transaction.find(item.id)
        if (tran) {
          tran.date = item.date
          tran.amount = item.amount
          tran.description = item.description
          tran.category = item.category
          await tran.save()
          results.push({ ...item, status: 'updated' })
        } else {
          results.push({ ...item, status: 'missed' })
        }
      } else {
        const tran = new Transaction()
        tran.date = item.date
        tran.amount = item.amount
        tran.description = item.description
        tran.category = item.category
        await tran.save()
        results.push({ ...item, id: tran.id, status: 'created' })
      }
    }

    return results
  }
}
