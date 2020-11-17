import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IncomeCategory from 'App/Models/IncomeCategory'
import User from 'App/Models/User'

export default class IncomeCategoriesController {
  /**
   * Return list of category
   */
  public async list({ auth }: HttpContextContract) {
    return await IncomeCategory.query()
      .select('*')
      .where('userId', (auth.user as User).id)
      .orderBy('name', 'asc')
  }
}
