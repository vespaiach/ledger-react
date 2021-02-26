import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import TransactionType from './TransactionType'

export default class Transaction extends BaseModel {
  public static table = 'transactions'

  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public date: DateTime

  /**
   *
   * Underlying, node-postgres decide to leave bigint as string. This should be done in node-postgres lib instead.
   * https://github.com/brianc/node-postgres/issues/339
   * https://github.com/brianc/node-pg-types
   *
   */
  @column({
    consume: (value: string) => parseFloat(value),
  })
  public amount: number

  @column()
  public description: string

  @column()
  public category: string

  @column()
  public transactionType: TransactionType

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
