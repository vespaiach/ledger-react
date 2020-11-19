import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Expense from 'App/Models/Expense'
import Income from 'App/Models/Income'
import User from 'App/Models/User'

export default class StatisticsController {
  /**
   * Sum the total amount of categories of expenses or incomes by month and by year
   *  month   : 1..12 (if omitted, return the whole year)
   *  year    : 1900..2222 (if omitted, get the current year)
   *  type    : expenses|incomes
   */
  public async sum({ request, auth }: HttpContextContract) {
    let { month, type, year } = await request.validate({
      schema: schema.create({
        month: schema.number.optional([rules.range(1, 12)]),
        year: schema.number.optional([rules.range(1900, 2222)]),
        type: schema.string({ trim: true }, [rules.type()]),
      }),
      messages: {
        'month.range': 'month paramater must be 1..12',
        'year.range': 'year paramater must be 1900..2222',
        'type.require': 'type paramater is required',
        'type.type': 'type must be either expenses or incomes',
      },
    })

    if (!year) {
      year = new Date().getFullYear()
    }

    let firstDate
    let lastDate
    if (month) {
      // Month in js start from 0..11
      month = month - 1

      firstDate = new Date(year, month, 1)
      lastDate = new Date(year, month + 1, 0)
    } else {
      firstDate = new Date(year, 0, 1)
      lastDate = new Date(year + 1, 0, 1)
    }

    if (type === 'expenses') {
      return await Expense.query()
        .select(Database.raw('EXTRACT(month from date) as month'))
        .select('category')
        .sum('amount as total')
        .where({ userId: (auth.user as User).id })
        .andWhere('date', '>=', firstDate)
        .andWhere('date', '<', lastDate)
        .groupBy(['month', 'category'])
        .orderBy([
          { column: 'month', order: 'asc' },
          { column: 'category', order: 'asc' },
        ])
    }
    return await Income.query()
      .select(Database.raw('EXTRACT(month from date) as month'))
      .select('category')
      .sum('amount as total')
      .where({ userId: (auth.user as User).id })
      .andWhere('date', '>=', firstDate)
      .andWhere('date', '<', lastDate)
      .groupBy(['month', 'category'])
      .orderBy([
        { column: 'month', order: 'asc' },
        { column: 'category', order: 'asc' },
      ])
  }

  /**
   * Sum the total amount of expenses or incomes by month and year
   *  month   : 1..12
   *  year    : 1900..2222 (= current year if omitted)
   *  type    : expenses|incomes
   */
  public async total({ request, auth }: HttpContextContract) {
    let { type, year } = await request.validate({
      schema: schema.create({
        year: schema.number.optional([rules.range(1900, 2222)]),
        type: schema.string({ trim: true }, [rules.type()]),
      }),
      messages: {
        'year.range': 'year paramater must be 1900..2222',
        'type.require': 'type paramater is required',
        'type.type': 'type is either expenses or incomes',
      },
    })

    if (!year) {
      year = new Date().getFullYear()
    }

    const firstDate = new Date(year, 0, 1)
    const lastDate = new Date(year + 1, 0, 1)

    if (type === 'expenses') {
      return await Income.query()
        .sum('amount as total')
        .select(Database.raw('EXTRACT(month FROM date) as month'))
        .where({ userId: (auth.user as User).id })
        .andWhere('date', '>=', firstDate)
        .andWhere('date', '<', lastDate)
        .groupBy('month')
        .orderBy('month', 'asc')
    }
    return await Income.query()
      .sum('amount as total')
      .select(Database.raw('EXTRACT(month FROM date) as month'))
      .where({ userId: (auth.user as User).id })
      .andWhere('date', '>=', firstDate)
      .andWhere('date', '<', lastDate)
      .groupBy('month')
      .orderBy('month', 'asc')
  }
}
