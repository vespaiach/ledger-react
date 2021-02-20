/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TransactionsFactory } from 'Database/factories'

export default class TransactionSeeder extends BaseSeeder {
  public async run() {
    await TransactionsFactory.createMany(300)
  }
}
