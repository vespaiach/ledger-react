import { Response } from 'express';
import HttpStatusCode from './types';

// https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
export class CustomError extends Error {
  code: HttpStatusCode;
  fields?: Record<string, string>;

  constructor(
    code: HttpStatusCode,
    { fields, message }: { fields?: Record<string, string>; message?: string } = {}
  ) {
    super(message);
    this.code = code;
    this.fields = fields;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  write(res: Response) {
    res.status(this.code).send(
      this.fields
        ? {
            data: this.fields,
          }
        : {}
    );
  }
}
