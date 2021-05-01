import { Express } from 'express';
import HttpStatusCode from '../types';
import { CustomError } from '../util';

import { checkCreateCategory, createCategory } from './category';

export default function createRouter(app: Express) {
  app.post('/api/categories', checkCreateCategory, createCategory);

  app.use(function (_, __, next) {
    next(new CustomError(HttpStatusCode.NOT_FOUND, { message: 'route did not exist' }));
  });
}
