/**
 *
 * Use DataLoader to resolve n+1 problem.
 *
 */
import { PrismaClient, Transaction } from '@prisma/client';
import DataLoader from 'dataloader';
import groupBy from 'lodash/groupBy';
import { Loader } from './types';

export default function createLoader(prisma: PrismaClient): Loader {
  const getTransactionsByCategoryIds = async (categoryIds: readonly number[]) => {
    const transactions = await prisma.transaction.findMany({
      where: {
        categoryId: { in: [...categoryIds] },
      },
    });

    const byCatIds = groupBy(transactions, (t) => t.categoryId);

    return categoryIds.map((id) => byCatIds[id]);
  };

  return {
    loadTransactionsByCategoryIds: new DataLoader<number, Transaction[]>(
      getTransactionsByCategoryIds
    ),
  };
}
