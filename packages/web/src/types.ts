import { Action as ReduxAction } from 'redux';
import { APIResponse } from 'just-hooks';

/**
 * Redux action
 */
export type Action<P = never> = [P] extends [never]
  ? ReduxAction<string>
  : ReduxAction<string> & { payload: P };

export enum TransactionType {
  Income = 'INCOME',
  Expense = 'EXPENSE',
}

export interface Category {
  id: number;
  name: string;
  transactionType: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Transaction record.
 */
export interface Transaction {
  id: number;
  date: Date;
  amount: number;
  description: string;
  categoryId: number;
  transactionType: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

export interface HTTPResult<T> {
  ok: boolean;
  status: number;
  data: T;
}

export interface APIError {
  message: string;
  code: AppMessageCode;
}

/**
 * Data repository
 */
export interface RemoteRepository {
  getTransactions: (year?: number) => Promise<APIResponse<Transaction[]>>;

  updateTransaction: (params: Transaction) => Promise<APIResponse<void>>;

  createTransaction: (params: Omit<Transaction, 'id'>) => Promise<APIResponse<Transaction>>;

  deleteTransaction: (params: number) => Promise<APIResponse<void>>;

  getYears: () => Promise<APIResponse<number[]>>;

  getCategories: () => Promise<APIResponse<Category[]>>;
}

export enum AppBusyCode {
  Idle,
  Loading,
  Saving,
}

/**
 * Server + client message and error codes.
 */
export enum AppMessageCode {
  // Server exception
  QueryTransactionFailure = 'E_QUERY_TRANSACTION',
  UpdateTransactionFailure = 'E_UPDATE_TRANSACTION',
  DeleteTransactionFailure = 'E_DELETE_TRANSACTION',
  CreateTransactionFailure = 'E_CREATE_TRANSACTION',

  ValidationFailure = 'E_VALIDATION_FAILURE',
  InternalServerFailure = 'E_INTERNAL_SERVER',
  WrongCredentialFailure = 'E_WRONG_CREDENTIALS',
  AuthorizedFailure = 'E_UNAUTHORIZED',

  // Client exception
  NetworkError = 'E_NETWORK',
  UnknownError = 'E_UNKNOWN',

  // Success
  CreateTrasactionSuccess = 'S_CREATE_TRANSACTION',
  UpdateTransactionSuccess = 'S_UPDATE_TRANSACTION',
  DeleteTransactionSuccess = 'S_DELETE_TRANSACTION',
  SignoutSuccess = 'S_SIGNOUT',
}

export interface WholeAppState {
  /**
   * We don't want to show detail error, just a general message.
   */
  messageCode: AppMessageCode | null;
  busyCode: AppBusyCode;
  transaction: TransactionState;
  categories: Category[] | null;
}

export type SortingFunction = (transaction1: Transaction, transaction2: Transaction) => number;

export interface TransactionState {
  list: Transaction[];
  /**
   * We use this function to sort list of transaction.
   */
  sortingFunction: SortingFunction | null;
  /**
   * We load list of transaction by year.
   */
  year: number;
  /**
   * List of year that the server has transaction data.
   */
  years: number[] | null;
  filtering: TransactionFilterState;
}

/**
 * We try to keep track the initial value of all filtering values, so that users
 * can restore them later.
 */
type FilterValue<T> = {
  origin: T;
  value: T;
};

export type TransactionFilterState = {
  income: FilterValue<boolean>;
  expense: FilterValue<boolean>;
  dateFrom: FilterValue<Date | null>;
  dateTo: FilterValue<Date | null>;
  amountFrom: FilterValue<number | null>;
  amountTo: FilterValue<number | null>;
  enableAmountFilter: FilterValue<boolean>;
  enableDateFilter: FilterValue<boolean>;
};

export type YieldReturn<T> = T extends Promise<infer U> ? U : T;
