/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

import Transaction from 'App/Models/Trasactions'
import TransactionType from 'App/Models/TransactionType'
import SyncValidator from 'App/Validator/SyncValidator'
import GetValidator from 'App/Validator/GetValidator'
import { ExceptionCode } from 'App/Exceptions/Code'
import InternalServerException from 'App/Exceptions/InternalServerException'
import UnprocesableException from 'App/Exceptions/UnprocesableException'

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

    try {
      return await query.orderBy('date', 'desc')
    } catch (error) {
      throw new InternalServerException(
        'Could not query transaction',
        ExceptionCode.QueryTransactionFailure,
        { error, year }
      )
    }
  }

  /**
   * Create a new transaction.
   */
  public async create({ request }: HttpContextContract) {
    const record = await request.validate(SyncValidator)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { date, amount, description, category, transaction_type } = record

    const tran = new Transaction()
    tran.date = date
    tran.amount = amount
    tran.description = description
    tran.category = category
    tran.transactionType =
      transaction_type === TransactionType.Expense
        ? TransactionType.Expense
        : TransactionType.Income

    try {
      await tran.save()
    } catch (error) {
      throw new InternalServerException(
        'Server got error. Could not create a new transaction.',
        ExceptionCode.InternalServerFailure,
        { error, record }
      )
    }

    return
  }

  /**
   * Update a transaction.
   */
  public async update({ request }: HttpContextContract) {
    const record = await request.validate(SyncValidator)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, date, amount, description, category, transaction_type } = record

    let tran: Transaction | null
    if (id) {
      tran = await Transaction.find(id)
      if (!tran) {
        throw new UnprocesableException(
          'Could not find transaction to update',
          ExceptionCode.ValidationFailure,
          { record }
        )
      }
    } else {
      throw new UnprocesableException('Missing id parameter', ExceptionCode.ValidationFailure, {
        record,
      })
    }

    tran.date = date
    tran.amount = amount
    tran.description = description
    tran.category = category
    tran.transactionType =
      transaction_type === TransactionType.Expense
        ? TransactionType.Expense
        : TransactionType.Income

    try {
      await tran.save()
    } catch (error) {
      throw new InternalServerException(
        'Server got error. Could not update transaction',
        ExceptionCode.InternalServerFailure,
        { error, record }
      )
    }

    return
  }

  /**
   * Delete transaction.
   */
  public async delete({ params }: HttpContextContract) {
    const { id } = params

    const tran = await Transaction.find(id)
    if (tran) {
      try {
        await tran.delete()
      } catch (error) {
        throw new InternalServerException(
          'Server got error. Could not delete transaction',
          ExceptionCode.InternalServerFailure,
          { id, error }
        )
      }
    } else {
      throw new UnprocesableException(
        'Could not find transaction to delete',
        ExceptionCode.DeleteTransactionFailure,
        { id }
      )
    }

    return
  }

  /**
   * Get list of years that have transaction data.
   */
  public async years() {
    let start: Transaction | null
    let end: Transaction | null
    try {
      ;[start, end] = await Promise.all([
        Transaction.query().orderBy('date', 'asc').first(),
        Transaction.query().orderBy('date', 'desc').first(),
      ])
    } catch (error) {
      throw new InternalServerException(
        'Could not query the list of available years',
        ExceptionCode.QueryTransactionFailure,
        { error }
      )
    }

    const results: number[] = []
    const fromDate = start?.date
    const toDate = end?.date

    if (fromDate && toDate) {
      for (let i = toDate.year; i >= fromDate.year; i--) {
        results.push(i)
      }
    } else {
      if (fromDate) {
        results.push(fromDate.year)
      } else if (toDate) {
        results.push(toDate.year)
      } else {
        results.push(new Date().getFullYear())
      }
    }

    return results
  }
}
