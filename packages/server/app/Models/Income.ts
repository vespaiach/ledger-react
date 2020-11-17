import { DateTime } from 'luxon'
import { BaseModel, column, afterSave } from '@ioc:Adonis/Lucid/Orm'
import IncomeCategory from './IncomeCategory'

export default class Income extends BaseModel {
  public static table = 'incomes'

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
  public static async saveCategory(income: Income) {
    const categoryName = income.category.toLowerCase()
    let category = await IncomeCategory.findBy('name', categoryName)

    if (!category) {
      category = new IncomeCategory()
      category.name = categoryName
      category.userId = income.userId
      await category.save()
    }
  }
}
