export type ResponseData<T> = {
  statusCode?: number;
  data: T;
};

export type ErrorCode =
  | 'SERVER_ERROR'
  | 'UNEXPECTED_ERROR'
  | 'BAD_REQUEST_ERROR'
  | 'NOT_FOUND_ERROR';

export type ResponseError = {
  error: ErrorCode[];
};
