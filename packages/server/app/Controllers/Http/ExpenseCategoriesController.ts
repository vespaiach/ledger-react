import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExpenseCategory from 'App/Models/ExpenseCategory'
import User from 'App/Models/User'

export default class ExpenseCategoriesController {
  /**
   * Return list of category
   */
  public async list({ auth }: HttpContextContract) {
    return await ExpenseCategory.query()
      .select('*')
      .where('userId', (auth.user as User).id)
      .orderBy('name', 'asc')
  }
}
