import { Category, Transaction } from '.prisma/client';
import { RequestHandler, Express, NextFunction } from 'express';
import { RootContext } from './types';

const getCategories: RequestHandler<unknown, Category[], unknown, unknown, RootContext> = async (
  _,
  res,
  next: NextFunction
) => {
  try {
    const prisma = res.locals.prisma;
    res.status(200).send(await prisma.category.findMany());
  } catch (err) {
    next(err);
  }
};

const getYears: RequestHandler<unknown, number[], unknown, unknown, RootContext> = async (
  _,
  res,
  next: NextFunction
) => {
  try {
    const prisma = res.locals.prisma;

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

    res.status(200).send(years);
  } catch (err) {
    next(err);
  }
};

const getTransactions: RequestHandler<
  unknown,
  Transaction[],
  unknown,
  { year: number },
  RootContext
> = (req, res, next) => {
  if (isNaN(req.query.year)) {
    next(new Error('Invalid year query'));
    return;
  }
  const fromDate = new Date(req.query.year, 0, 1, 0, 0);
  const toDate = new Date(req.query.year, 11, 31, 0, 0);
  return res.locals.prisma.transaction.findMany({
    where: {
      date: {
        gte: fromDate,
        lt: toDate,
      },
    },
  }) as Promise<Transaction[]>;
};

export default function createRouter(app: Express) {
  app.get('/api/years', getYears);
  app.get('/api/categories', getCategories);
  app.get('/api/transactions', getTransactions);
}
