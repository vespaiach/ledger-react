import { PrismaClient, TransactionType } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'food', transactionType: TransactionType.EXPENSE },
      { name: 'gifts', transactionType: TransactionType.EXPENSE },
      { name: 'health/medical', transactionType: TransactionType.EXPENSE },
      { name: 'home', transactionType: TransactionType.EXPENSE },
      { name: 'personal', transactionType: TransactionType.EXPENSE },
      { name: 'transportation', transactionType: TransactionType.EXPENSE },
      { name: 'travel', transactionType: TransactionType.EXPENSE },
      { name: 'pets', transactionType: TransactionType.EXPENSE },
      { name: 'utilities', transactionType: TransactionType.EXPENSE },
      { name: 'other', transactionType: TransactionType.EXPENSE },

      { name: 'savings', transactionType: TransactionType.INCOME },
      { name: 'paycheck', transactionType: TransactionType.INCOME },
      { name: 'interest', transactionType: TransactionType.INCOME },
      { name: 'bonus', transactionType: TransactionType.INCOME },
      { name: 'other', transactionType: TransactionType.INCOME },
    ],
  });

  const incomeIds = await prisma.category.findMany({
    where: {
      transactionType: TransactionType.INCOME,
    },
    select: {
      id: true,
    },
  });

  const expenseIds = await prisma.category.findMany({
    where: {
      transactionType: TransactionType.EXPENSE,
    },
    select: {
      id: true,
    },
  });

  const fromDate = new Date();
  const toDate = new Date(fromDate);
  toDate.setMonth(-12);
  const transactions = [];

  for (let i = 0; i < 100; i++) {
    const transactionType = faker.datatype.boolean()
      ? TransactionType.EXPENSE
      : TransactionType.INCOME;

    let categoryId;
    if (transactionType === TransactionType.EXPENSE) {
      categoryId = expenseIds[faker.datatype.number(expenseIds.length - 1)].id;
    } else {
      categoryId = incomeIds[faker.datatype.number(incomeIds.length - 1)].id;
    }

    transactions.push({
      date: faker.date.between(fromDate, toDate),
      amount: parseFloat(faker.finance.amount(1, 100000, 2)),
      description: faker.lorem.sentence(),
      transactionType,
      categoryId,
    });
  }

  await prisma.transaction.createMany({ data: transactions });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
