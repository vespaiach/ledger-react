import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import TransactionType from './TransactionType'

export default class Transaction extends BaseModel {
  public static table = 'transactions'

  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public date: DateTime

  @column()
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
