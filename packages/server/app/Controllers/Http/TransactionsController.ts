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
   *      transaction_type: string,
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
   *      transaction_type: string,
   *      status: string // Can be one of these value: ['updated', 'missed', 'created']
   *   }
   */
  public async sync({ request }: HttpContextContract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, date, amount, description, category, transaction_type } = await request.validate(
      SyncValidator
    )

    try {
      let tran
      if (id) {
        tran = await Transaction.find(id)
        if (!tran) {
          throw new Error(`Wrong id: ${id}`)
        }
      } else {
        tran = new Transaction()
      }

      tran.date = date
      tran.amount = amount
      tran.description = description
      tran.category = category
      tran.transactionType =
        transaction_type === TransactionType.Expense
          ? TransactionType.Expense
          : TransactionType.Income
      await tran.save()
    } catch (e) {
      Logger.error(e)
      throw new SyncException('Synchronize fail')
    }

    return
  }
}
