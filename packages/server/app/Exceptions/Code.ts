/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

export enum ExceptionCode {
  QueryTransactionFailure = 'E_QUERY_TRANSACTION',
  UpdateTransactionFailure = 'E_UPDATE_TRANSACTION',
  DeleteTransactionFailure = 'E_DELETE_TRANSACTION',
  CreateTransactionFailure = 'E_CREATE_TRANSACTION',

  ValidationFailure = 'E_VALIDATION_FAILURE',
  InternalServerFailure = 'E_INTERNAL_SERVER',
  WrongCredentialFailure = 'E_WRONG_CREDENTIALS',
  AuthorizedFailure = 'E_UNAUTHORIZED',
}
