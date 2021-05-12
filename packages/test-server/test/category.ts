/**
 *
 * Category Integration Test
 *
 */
import t from 'tap';
import { config } from 'dotenv';
config();

import { request } from '../utils/clientRequest';
import { release, initDbConnection, exec } from '../utils/db';
import { getSchemaName, uniqName } from '../utils/string';
import { Category, TransactionType } from '@prisma/client';

const connectionString =
  process.env.DATABASE_URL || 'postgresql://budgets:budgets@localhost:5432/budgets?schema=public';

const SCHEMA = getSchemaName(connectionString) || 'public';

t.before(() => {
  initDbConnection(connectionString);
});

t.test('Create a new category', async (t) => {
  /**
   * Should create a new category without error
   */
  const name = uniqName('cat-');
  const response = await request<Category>('POST', '/api/categories', {
    name,
    transactionType: TransactionType.EXPENSE,
  });

  t.ok(response.statusCode === 200, 'should have status code 200');
  t.ok(response.data.id > 0, 'should have id which is greater than 0');
  t.ok(response.data.name === name, 'should match the name');
  t.ok(
    response.data.transactionType === TransactionType.EXPENSE,
    'should match the transaction type'
  );

  const dbCategoryResponse = await exec<Category>({
    text: `SELECT id, name, "transactionType" FROM ${SCHEMA}."Category" WHERE id = $1`,
    values: [response.data.id],
  });

  t.ok(dbCategoryResponse.rowCount === 1, 'should create only one category');
  t.ok(dbCategoryResponse.rows[0].id === response.data.id, "should match category's id");
  t.ok(dbCategoryResponse.rows[0].name === name, "should match category's name");
  t.ok(
    dbCategoryResponse.rows[0].transactionType === TransactionType.EXPENSE,
    "should match category's type"
  );

  /**
   * Should throw validation error
   */
  const errRes = await request<Record<string, string>>('POST', '/api/categories', {});

  t.ok(errRes.statusCode === 400, 'should return status code of 400');
  t.ok(errRes.data.name && errRes.data.name.length, 'should return name field error');
  t.ok(
    errRes.data.transactionType && errRes.data.transactionType.length,
    'should return type field error'
  );

  t.end();
});

t.test('Select categories', async (t) => {
  const name = uniqName('cat-');
  await request<Category>('POST', '/api/categories', {
    name,
    transactionType: TransactionType.EXPENSE,
  });

  const result = await request<Category[]>('GET', '/api/categories');
  const apiCategoryResponse = result.data.sort((a, b) => a.id - b.id);

  const dbCategoryResponse = await exec<Category>(
    `SELECT id, name, "transactionType" FROM ${SCHEMA}."Category" ORDER BY id`
  );

  t.ok(apiCategoryResponse.length === dbCategoryResponse.rowCount, 'should have the same length');
  for (let i = 0; i < apiCategoryResponse.length; i++) {
    t.ok(apiCategoryResponse[i].id === dbCategoryResponse.rows[i].id, 'should match id');
    t.ok(
      apiCategoryResponse[i].name === dbCategoryResponse.rows[i].name,
      'should match category name'
    );
    t.ok(
      apiCategoryResponse[i].transactionType === dbCategoryResponse.rows[i].transactionType,
      'should match category type'
    );
  }

  t.ok(result.data.filter((c) => c.name === name).length > 0, 'should have the created category');
});

t.test('Update category', async (t) => {
  /**
   * Should allow to update category without throwing error.
   */
  const name = uniqName('cat-');
  const updatingName = uniqName('cat-');

  const dbCategoryResponse = await exec<Category>({
    text:
      `INSERT INTO ${SCHEMA}."Category" ("name","transactionType") VALUES ($1, $2) RETURNING id;`,
    values: [name, TransactionType.INCOME],
  });

  const updateNameResult = await request<Category>('PUT', '/api/categories', {
    id: dbCategoryResponse.rows[0].id,
    name: updatingName,
  });

  t.ok(updateNameResult.data.name === updatingName, 'should update name successfully');

  const updateTypeResult = await request<Category>('PUT', '/api/categories', {
    id: dbCategoryResponse.rows[0].id,
    transactionType: TransactionType.EXPENSE,
  });

  t.ok(
    updateTypeResult.data.transactionType === TransactionType.EXPENSE,
    'should update type successfully'
  );

  const dbCategoryUpdatingResponse = await exec<Category>({
    text: `SELECT id, name, "transactionType" FROM ${SCHEMA}."Category" WHERE id = $1`,
    values: [dbCategoryResponse.rows[0].id],
  });

  t.ok(dbCategoryUpdatingResponse.rows[0].id === updateTypeResult.data.id, 'should match id');
  t.ok(dbCategoryUpdatingResponse.rows[0].name === updateTypeResult.data.name, 'should match name');
  t.ok(
    dbCategoryUpdatingResponse.rows[0].transactionType === updateTypeResult.data.transactionType,
    'should match type'
  );

  /**
   * Should throw error about id field missing.
   */
  const errRes = await request<Record<string, string>>('PUT', '/api/categories', {
    transactionType: TransactionType.EXPENSE,
  });

  t.ok(errRes.statusCode === 400, 'should return status code of 400');
  t.ok(errRes.data.id && errRes.data.id.length, 'should return id field error');

  t.end();
});

t.test('Delete a category', async (t) => {
  /**
   * Should allow to delete an empty category
   */
  const deletingDbResponse = await exec<Category>({
    text:
      `INSERT INTO ${SCHEMA}."Category" ("name","transactionType") VALUES ($1, $2) RETURNING id;`,
    values: ['deleting', TransactionType.INCOME],
  });

  const deletingApiResponse = await request(
    'DELETE',
    `/api/categories?id=${deletingDbResponse.rows[0].id}`
  );

  t.ok(deletingApiResponse.statusCode === 200, 'should delete immediately');

  const deletedDbResponse = await exec<Category>({
    text: `SELECT id, name, "transactionType" FROM ${SCHEMA}."Category" WHERE id = $1`,
    values: [deletingDbResponse.rows[0].id],
  });

  t.ok(deletedDbResponse.rowCount === 0, 'should be deleted in db');

  /**
   * Should not allow to delete a not empty category
   */
  const newDeletingDbResponse = await exec<Category>({
    text:
      `INSERT INTO ${SCHEMA}."Category" ("name","transactionType") VALUES ($1, $2) RETURNING id;`,
    values: ['deleting', TransactionType.INCOME],
  });
  await exec<Category>({
    text: `INSERT INTO ${SCHEMA}."Transaction" (amount,"date",description,"transactionType","categoryId") VALUES ($1, $2, $3, $4, $5);`,
    values: [
      1,
      new Date(),
      'description',
      TransactionType.EXPENSE,
      newDeletingDbResponse.rows[0].id,
    ],
  });

  const errorDeleteApiResponse = await request(
    'DELETE',
    `/api/categories?id=${newDeletingDbResponse.rows[0].id}`
  );

  t.ok(errorDeleteApiResponse.statusCode === 423, 'should return error status');

  t.end();
});

t.teardown(() => {
  release();
});
