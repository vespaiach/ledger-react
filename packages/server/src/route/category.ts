import { TransactionType } from '@prisma/client';
import HttpStatusCode, {
  CreateCategoryRequest,
  DeleteCategoryRequest,
  QueryCategoriesRequest,
} from '../types';
import { CustomError } from '../util';

export const checkCreateCategory: CreateCategoryRequest = async (req, res, next) => {
  const errors: Record<string, string> = {};

  if (!req.body.name) {
    errors['name'] = '"name" is required, but missing';
  }

  if (!req.body.transactionType) {
    errors['transactionType'] = '"transactionType" is required, but missing';
  } else {
    if (req.body.transactionType !== TransactionType.EXPENSE && TransactionType.INCOME) {
      errors['transactionType'] = '"transactionType" is either "EXPENSE" or "INCOME"';
    }
  }

  if (Object.keys(errors).length > 0) {
    next(new CustomError(HttpStatusCode.BAD_REQUEST, { fields: errors }));
  } else {
    next();
  }
};

export const createCategory: CreateCategoryRequest = async (req, res, next) => {
  try {
    const data = await res.locals.prisma.category.create({
      data: req.body,
    });

    res.status(200).send({
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const queryCategories: QueryCategoriesRequest = async (_, res, next) => {
  try {
    const prisma = res.locals.prisma;
    res.status(200).send({
      data: await prisma.category.findMany(),
    });
  } catch (err) {
    next(err);
  }
};

export const checkDeleteCategories: DeleteCategoryRequest = async (req, res, next) => {
  if (!req.query.id || req.query.id <= 0) {
    next(
      new CustomError(HttpStatusCode.BAD_REQUEST, {
        fields: {
          id: '"id" is missing or incorrect',
        },
      })
    );
  } else {
    next();
  }
};

export const deleteCategories: DeleteCategoryRequest = async (req, res, next) => {
  try {
    await res.locals.prisma.category.delete({
      where: {
        id: req.query.id,
      },
    });

    res.status(200).send({});
  } catch (err) {
    next(err);
  }
};
