import { ListYearsRequest } from 'src/types';

export const getYears: ListYearsRequest = async (_, res, next) => {
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

    res.status(200).send({
      data: years,
    });
  } catch (err) {
    next(err);
  }
};
