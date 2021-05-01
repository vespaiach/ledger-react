import { TransactionType } from '@prisma/client';
import HttpStatusCode, {
  CreateCategoryRequest,
  DeleteCategoryRequest,
  QueryCategoriesRequest,
  UpdateCategoryRequest,
} from '../types';
import { CustomError } from '../util';

export const checkCreateCategory: CreateCategoryRequest = async (req, res, next) => {
  const errors: Record<string, string> = {};

  if (!req.body.name) {
    errors['name'] = '"name" is required, but missing';
  } else if (req.body.name.length > 255) {
    errors['name'] = '"name" is too long, limit to 255 characters only';
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
    req.body.name = String(req.body.name);

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
      data: await prisma.category.findMany({ orderBy: [{ createdAt: 'desc' }] }),
    });
  } catch (err) {
    next(err);
  }
};

export const checkDeleteCategory: DeleteCategoryRequest = async (req, res, next) => {
  if (!req.query.id || isNaN(req.query.id) || req.query.id <= 0) {
    next(
      new CustomError(HttpStatusCode.BAD_REQUEST, {
        fields: {
          id: '"id" is missing or incorrect',
        },
      })
    );
  } else {
    try {
      const counter = await res.locals.prisma.transaction.count({
        where: {
          categoryId: Number(req.query.id),
        },
      });

      if (counter > 0) {
        next(
          new CustomError(HttpStatusCode.LOCKED, {
            message: "Couldn't delete this category. It is being referencing by others",
          })
        );
      } else {
        req.query.id = Number(req.query.id);
        next();
      }
    } catch (err) {
      next(err);
    }
  }
};

export const deleteCategory: DeleteCategoryRequest = async (req, res, next) => {
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

export const checkUpdateCategory: UpdateCategoryRequest = async (req, res, next) => {
  const errors: Record<string, string> = {};

  if (!req.body.id || isNaN(req.body.id) || req.body.id <= 0) {
    errors['id'] = '"id" is required, but missing';
  }

  if (req.body.name && String(req.body.name).length > 255) {
    errors['name'] = '"name" is too long, limit to 255 characters only';
  }

  if (
    req.body.transactionType &&
    req.body.transactionType !== TransactionType.EXPENSE &&
    TransactionType.INCOME
  ) {
    errors['transactionType'] = '"transactionType" is either "EXPENSE" or "INCOME"';
  }

  if (Object.keys(errors).length > 0) {
    next(new CustomError(HttpStatusCode.BAD_REQUEST, { fields: errors }));
  } else {
    req.body.id = Number(req.body.id);
    req.body.name = String(req.body.name);

    next();
  }
};

export const updateCategory: UpdateCategoryRequest = async (req, res, next) => {
  try {
    const data: { name?: string; transactionType?: TransactionType } = {};
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.transactionType) {
      data.transactionType = req.body.transactionType;
    }

    const category = await res.locals.prisma.category.update({
      where: {
        id: req.body.id,
      },
      data,
    });

    res.status(200).send({
      data: category,
    });
  } catch (err) {
    next(err);
  }
};
