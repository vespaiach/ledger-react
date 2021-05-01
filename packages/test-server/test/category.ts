import t from 'tap';
import { config } from 'dotenv';
config();

import { request } from '../utils/clientRequest';
import { release, initDbConnection, exec } from '../utils/db';
import { uniqName } from '../utils/string';
import { Category, TransactionType } from '@prisma/client';

const connectionString = 'postgresql://budgets:budgets@localhost:5432/budgets?schema=public';

t.before(() => {
  initDbConnection(connectionString);
});

t.test('Create a new category', async (t) => {
  const name = uniqName('cat-');
  const response = await request<Category>('POST', '/api/categories', {
    name,
    transactionType: TransactionType.EXPENSE,
  });

  t.ok(response.statusCode === 200, 'should has status code 200');
  t.ok(response.data.id > 0, 'should has id which is greater than 0');
  t.ok(response.data.name === name, 'should match the name');
  t.ok(
    response.data.transactionType === TransactionType.EXPENSE,
    'should match the transaction type'
  );

  const dbCategoryResponse = await exec<Category>({
    text: 'SELECT id, name, "transactionType" FROM public."Category" WHERE id = $1',
    values: [response.data.id],
  });

  t.ok(dbCategoryResponse.rowCount === 1, 'should create only one category');
  t.ok(dbCategoryResponse.rows[0].id === response.data.id, "should match category's id");
  t.ok(dbCategoryResponse.rows[0].name === name, "should match category's name");
  t.ok(
    dbCategoryResponse.rows[0].transactionType === TransactionType.EXPENSE,
    "should match category's type"
  );

  t.end();
});

t.tearDown(() => {
  release();
});
