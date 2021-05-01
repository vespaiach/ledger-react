import { PrismaClient } from '.prisma/client';

import { ErrorRequestHandler, RequestHandler } from 'express';
import createLoader from './loader';
import { ResponseData, RootContext } from './types';
import { CustomError } from './util';

const prisma = new PrismaClient();
const context: RootContext = {
  prisma,
  loader: createLoader(prisma),
};
export const createDbContext: RequestHandler<undefined, any, any, undefined, RootContext> = (
  _,
  res,
  next
) => {
  res.locals = context;
  next();
};

export const errorHandler: ErrorRequestHandler<undefined, ResponseData, any, any, RootContext> = (
  err: any | CustomError,
  _,
  res,
  next
) => {
  console.error(err);

  if (err && err instanceof CustomError) {
    err.write(res);
  } else {
    res.status(500).send({
      error: ['UNEXPECTED_ERROR'],
    });
  }
};
