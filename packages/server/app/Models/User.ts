import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ExpenseCategory from './ExpenseCategory'
import IncomeCategory from './IncomeCategory'
import Expense from './Expense'
import Income from './Income'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ExpenseCategory)
  public expenseCategories: HasMany<typeof ExpenseCategory>

  @hasMany(() => IncomeCategory)
  public incomeCategories: HasMany<typeof IncomeCategory>

  @hasMany(() => Expense)
  public expenses: HasMany<typeof Expense>

  @hasMany(() => Income)
  public incomes: HasMany<typeof Income>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
