import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { IncomesFactory, ExpensesFactory } from 'Database/factories'

export default class ExpenseSeeder extends BaseSeeder {
  public async run() {
    const user = await User.updateOrCreate(
      { id: 1 },
      {
        name: 'Toan Nguyen',
        email: 'anhtoan@gmail.com',
        password: '12345678',
      }
    )

    await ExpensesFactory.merge({ userId: user.id }).createMany(2000)
    await IncomesFactory.merge({ userId: user.id }).createMany(2000)
  }
}
