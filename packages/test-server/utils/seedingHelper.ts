import { Category, Transaction, TransactionType } from '.prisma/client';
import { exec } from './db';

export async function cleanDb(schema: string) {
  await exec(`DELETE FROM ${schema}."Transaction";`);
  await exec(`DELETE FROM ${schema}."Category";`);
}

export async function seedCategory(schema: string, name: string, type: TransactionType) {
  return await exec<Category>({
    text: `INSERT INTO ${schema}."Category" ("name","transactionType") VALUES ($1, $2) RETURNING id;`,
    values: [name, type],
  });
}

export async function seedTransaction(
  schema: string,
  amount: number,
  date: Date,
  description: string,
  transactionType: TransactionType,
  categoryId: number
) {
  return await exec<Transaction>({
    text: `INSERT INTO ${schema}."Transaction" (amount,"date",description,"transactionType","categoryId") VALUES ($1, $2, $3, $4, $5);`,
    values: [amount, date, description, transactionType, categoryId],
  });
}
