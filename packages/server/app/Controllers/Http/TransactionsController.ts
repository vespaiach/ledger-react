/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Logger from '@ioc:Adonis/Core/Logger'

import Transaction from 'App/Models/Trasactions'
import TransactionType from 'App/Models/TransactionType'
import SyncValidator from 'App/Validator/SyncValidator'
import SyncException from 'App/Exceptions/SyncException'
import GetValidator from 'App/Validator/GetValidator'

export default class TransactionsController {
  /**
   * Get all transactions in year and sort by date in descending order
   */
  public async get({ request }: HttpContextContract) {
    const { year } = await request.validate(GetValidator)

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
    const { payload } = await request.validate(SyncValidator)

    const results: {
      id: number | undefined
      date: DateTime
      amount: number
      description: string
      category: string
      transactionType: string
      status: string
    }[] = []

    try {
      for (const item of payload) {
        if (item.id) {
          const tran = await Transaction.find(item.id)
          if (tran) {
            tran.date = item.date
            tran.amount = item.amount
            tran.description = item.description
            tran.category = item.category
            tran.transactionType =
              item.transactionType === TransactionType.Expense
                ? TransactionType.Expense
                : TransactionType.Income
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
          tran.transactionType =
            item.transactionType === TransactionType.Expense
              ? TransactionType.Expense
              : TransactionType.Income
          await tran.save()
          results.push({ ...item, id: tran.id, status: 'created' })
        }
      }
    } catch (e) {
      Logger.error(e)
      throw new SyncException('Synchronize fail')
    }

    return results
  }
}
