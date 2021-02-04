/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { TransactionsFactory } from 'Database/factories'

export default class ExpenseSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { id: 1 },
      {
        email: 'test@test.com',
        password: '12345678',
      }
    )

    await TransactionsFactory.createMany(3000)
  }
}
