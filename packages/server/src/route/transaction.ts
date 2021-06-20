import { TransactionType } from '@prisma/client';
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import {
  CreateTransactionRequest,
  CreatingTransactionPayload,
  UpdatingTransactionPayload,
  HttpStatusCode,
  QueryTransactionRequest,
  UpdateTransactionRequest,
} from 'src/types';
import { CustomError } from '../util';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

/**
 * Check if requests have year pamameter.
 */
export const checkGetTransaction: QueryTransactionRequest = async (req, _, next) => {
  if (isNaN(req.query.year)) {
    next(new Error('Invalid year query'));
    return;
  }

  next();
};

/**
 * Return transactions in the year.
 */
export const getTransactions: QueryTransactionRequest = async (req, res, next) => {
  try {
    const fromDate = new Date(req.query.year, 0, 1, 0, 0);
    const toDate = new Date(req.query.year, 11, 31, 0, 0);

    res.status(200).send({
      data: await res.locals.prisma.transaction.findMany({
        where: {
          date: {
            gte: fromDate,
            lt: toDate,
          },
        },
      }),
    });
  } catch (err) {
    next(err);
  }
};

const creatingTransactionSchema: JSONSchemaType<CreatingTransactionPayload> = {
  type: 'object',
  properties: {
    amount: { type: 'number', minimum: 0, maximum: Number.MAX_SAFE_INTEGER },
    date: { type: 'string', format: 'date' },
    description: { type: 'string', maxLength: 511 },
    transactionType: { type: 'string', enum: ['EXPENSE', 'INCOME'] },
    categoryId: { type: 'integer', minimum: 1 },
  },
  required: ['amount', 'date', 'description', 'transactionType', 'categoryId'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      amount: `data.amount should be number > 0 and < ${Number.MAX_SAFE_INTEGER}`,
      date: 'data.date should be a string of date in ISO format',
      description: `data.description should be a string with length < 511 characters`,
      transactionType: `data.transactionType should be either 'EXPENSE' or 'INCOME'`,
      categoryId: `data.categoryId should be a number`,
    },
    required: {
      amount: `data.amount is required`,
      date: 'data.date is required',
      description: `data.description is required`,
      transactionType: `data.transactionType is required`,
      categoryId: `data.categoryId is required`,
    },
  },
};
const createTransactionValidator = ajv.compile(creatingTransactionSchema);

/**
 * Validate request's payload
 */
export const checkCreateTransaction: CreateTransactionRequest = async (req, res, next) => {
  const valid = createTransactionValidator(req.body);
  if (!valid) {
    next(new CustomError(HttpStatusCode.BAD_REQUEST, { fields: {} }));
    return;
  }

  next();
};

/**
 * Validation passed. Create a transaction.
 */
export const createTransaction: CreateTransactionRequest = async (req, res, next) => {
  try {
    res.status(200).send({
      data: await res.locals.prisma.transaction.create({
        data: {
          ...req.body,
          transactionType:
            req.body.transactionType === 'INCOME'
              ? TransactionType.INCOME
              : TransactionType.EXPENSE,
        },
      }),
    });
  } catch (err) {
    next(err);
  }
};

const updatingTransactionSchema: JSONSchemaType<UpdatingTransactionPayload> = {
  type: 'object',
  properties: {
    id: { type: 'number', minimum: 0 },
    amount: { type: 'number', minimum: 0, maximum: Number.MAX_SAFE_INTEGER },
    date: { type: 'string', format: 'date' },
    description: { type: 'string', maxLength: 511 },
    transactionType: { type: 'string', enum: ['EXPENSE', 'INCOME'] },
    categoryId: { type: 'integer', minimum: 1 },
  },
  required: ['id'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      amount: `data.amount should be number > 0 and < ${Number.MAX_SAFE_INTEGER}`,
      date: 'data.date should be a string of date in ISO format',
      description: `data.description should be a string with length < 511 characters`,
      transactionType: `data.transactionType should be either 'EXPENSE' or 'INCOME'`,
      categoryId: `data.categoryId should be a number`,
    },
    required: {
      id: `data.id is required`,
    },
  },
};
const updateTransactionValidator = ajv.compile(updatingTransactionSchema);

/**
 * Validate request's payload
 */
export const checkUpdateTransaction: UpdateTransactionRequest = async (req, _, next) => {
  const valid = updateTransactionValidator(req.body);
  if (!valid) {
    next(new CustomError(HttpStatusCode.BAD_REQUEST, { fields: {} }));
    return;
  }

  next();
};

/**
 * Validation passed. Create a transaction.
 */
export const updateTransaction: UpdateTransactionRequest = async (req, res, next) => {
  try {
    res.status(200).send({
      data: await res.locals.prisma.transaction.update({
        where: {
          id: req.body.id,
        },
        data: {
          ...req.body,
          transactionType:
            req.body.transactionType === 'INCOME'
              ? TransactionType.INCOME
              : TransactionType.EXPENSE,
        },
      }),
    });
  } catch (err) {
    next(err);
  }
};
