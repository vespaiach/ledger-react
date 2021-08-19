/**
 *
 * Transaction Integration Test
 *
 */
import t from 'tap';
import { config } from 'dotenv';
config();

import { request } from '../utils/clientRequest';
import { release, initDbConnection, exec } from '../utils/db';
import { getSchemaName } from '../utils/string';
import { Transaction, TransactionType } from '@prisma/client';
import { cleanDb, seedCategory, seedTransaction } from '../utils/seedingHelper';

const connectionString =
  process.env.DATABASE_URL || 'postgresql://budgets:budgets@localhost:5432/budgets?schema=public';

const SCHEMA = getSchemaName(connectionString) || 'public';

t.before(() => {
  initDbConnection(connectionString);
});

t.test('Query transactions', async (t) => {
  /**
   * Prepare database for test
   */

  cleanDb(SCHEMA);

  const icate = await seedCategory(SCHEMA, 'Cate Income', TransactionType.INCOME);
  const ecate = await seedCategory(SCHEMA, 'Cate Expense', TransactionType.EXPENSE);

  const startDate = new Date();
  for (let i = 0; i < 10; i++) {
    await seedTransaction(
      SCHEMA,
      100,
      new Date(startDate.setDate(startDate.getDate() + i)),
      'Description Income',
      TransactionType.INCOME,
      icate.rows[0].id
    );
    await seedTransaction(
      SCHEMA,
      100,
      new Date(startDate.setDate(startDate.getDate() + i)),
      'Description Expense',
      TransactionType.EXPENSE,
      ecate.rows[0].id
    );
  }

  /**
   * Should query a list of transactions
   */

  const response = await request<Transaction>('GET', '/api/transactions', {
    year: startDate.getFullYear(),
  });

  t.ok(response.statusCode === 200, 'should have status code 200');

  t.end();
});

t.teardown(() => {
  release();
});
