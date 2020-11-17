import { DateTime } from 'luxon'
import { BaseModel, column, afterSave } from '@ioc:Adonis/Lucid/Orm'
import ExpenseCategory from './ExpenseCategory'

export default class Expense extends BaseModel {
  public static table = 'expenses'

  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime

  @column()
  public amount: number

  @column()
  public description: string

  @column()
  public category: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ serializeAs: null })
  public userId: number

  @afterSave()
  public static async saveCategory(expense: Expense) {
    const categoryName = expense.category.toLowerCase()
    let category = await ExpenseCategory.findBy('name', categoryName)

    if (!category) {
      category = new ExpenseCategory()
      category.name = categoryName
      category.userId = expense.userId
      await category.save()
    }
  }
}
