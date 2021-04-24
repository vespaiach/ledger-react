import { Category, Transaction } from '@prisma/client';
import { IResolvers } from 'graphql-tools';
import { RootContext } from './types';

const root: IResolvers<unknown, RootContext, Record<string, unknown>> = {
  Query: {
    categories: (_, __, { prisma }) => {
      return prisma.category.findMany();
    },
    transactions: (_, args: { year: number }, { prisma }) => {
      const fromDate = new Date(args.year, 0, 1, 0, 0);
      const toDate = new Date(args.year, 11, 31, 0, 0);
      return prisma.transaction.findMany({
        where: {
          date: {
            gte: fromDate,
            lt: toDate,
          },
        },
        include: {
          category: true,
        },
      }) as Promise<Transaction[]>;
    },
    years: async (_, __, { prisma }) => {
      const results = await Promise.all([
        prisma.transaction.findFirst({
          orderBy: {
            date: 'asc',
          },
        }),
        prisma.transaction.findFirst({
          orderBy: {
            date: 'desc',
          },
        }),
      ]);

      const years: number[] = [];

      if (results && results[0] && results[1]) {
        const fromYear = results[0].date.getFullYear();
        const toYear = results[1].date.getFullYear();
        for (let i = toYear; i >= fromYear; i--) {
          years.push(i);
        }
      } else {
        years.push(new Date().getFullYear());
      }

      return years;
    },
  },

  Category: {
    transactions: (parent: Category, _, ctx) => {
      return ctx.loader.loadTransactionsByCategoryIds.load(parent.id);
    },
  },

  Transaction: {
    category: (parent: Transaction & { category: Category }) => {
      return parent.category;
    },
  },
};

export default root;
