import { Action, Category, SortingFunction, Transaction } from '../types';

export const REQUEST_LIST_YEAR = 'request list of available years';
export const RECEIVE_LIST_YEAR = 'receive list of available years';

export const REQUEST_LIST_CATEGORY = 'request list of categories';
export const RECEIVE_LIST_CATEGORY = 'receive list of categories';

export const REQUEST_LIST_TRANSACTION = 'request list of transactions in year';
export const RECEIVE_LIST_TRANSACTION = 'receive list of transactions in year';

export const REQUEST_CREATE_TRANSACTION = 'request to create a new transaction';
export const REQUEST_UPDATE_TRANSACTION = 'request to update a transaction';
export const REQUEST_DELETE_TRANSACTION = 'request to delete a transaction';

export const SELECT_YEAR = 'user select a year';
export const SORT_TRANSACTION = 'user sort transaction list';
export const ENABLE_AMOUNT_FILTER = 'enable filter transaction by amount';
export const DISABLE_AMOUNT_FILTER = 'disable filter transaction by amount';
export const ENABLE_DATE_FILTER = 'enable filter transaction by date';
export const DISABLE_DATE_FILTER = 'disable filter transaction by date';
export const FILTER_INCOME = 'filter income transaction';
export const NOT_FILTER_INCOME = 'not filter income transaction';
export const FILTER_EXPENSE = 'filter expense transaction';
export const NOT_FILTER_EXPENSE = 'not filter expense transaction';
export const FILTER_DATE_FROM = 'filter transactionsfrom date';
export const FILTER_DATE_TO = 'filter transaction until date';
export const FILTER_AMOUNT_FROM = 'filter transactions has amount greater than';
export const FILTER_AMOUNT_TO = 'filter transaction has amount lower than';
export const RESET_FILTER_VALUES = 'reset all filter values to default';

export const yearRequest = (): Omit<Action, 'payload'> => ({ type: REQUEST_LIST_YEAR });

export const yearList = (payload: number[]): Action<number[]> => ({
  type: RECEIVE_LIST_YEAR,
  payload,
});

export const categoryList = (payload: Category[]): Action<Category[]> => ({
  type: RECEIVE_LIST_CATEGORY,
  payload,
});

export const transactionRequestAction = (year: number): Action<number> => ({
  type: REQUEST_LIST_TRANSACTION,
  payload: year,
});

export const transactionList = (transactions: Transaction[]): Action<Transaction[]> => ({
  type: RECEIVE_LIST_TRANSACTION,
  payload: transactions,
});

export const transactionCreatingRequest = (payload: {
  [key: string]: string | number | Date | undefined;
}): Action<{ [key: string]: string | Date | undefined | number }> => ({
  type: REQUEST_CREATE_TRANSACTION,
  payload,
});

export const transactionUpdatingRequest = (payload: {
  [key: string]: string | number | Date | undefined;
}): Action<{ [key: string]: string | Date | number | undefined }> => ({
  type: REQUEST_UPDATE_TRANSACTION,
  payload,
});

export const transactionDeletingRequest = (id: number): Action<number> => ({
  type: REQUEST_DELETE_TRANSACTION,
  payload: id,
});

export const incomeFilterAction = (income: boolean): Action => ({
  type: income ? FILTER_INCOME : NOT_FILTER_INCOME,
});

export const expenseFilterAction = (expense: boolean): Action => ({
  type: expense ? FILTER_EXPENSE : NOT_FILTER_EXPENSE,
});

export const amountFilterEnableRequest = (enable: boolean): Omit<Action, 'payload'> => ({
  type: enable ? ENABLE_AMOUNT_FILTER : DISABLE_AMOUNT_FILTER,
});

export const dateFilterEnableRequest = (enable: boolean): Omit<Action, 'payload'> => ({
  type: enable ? ENABLE_DATE_FILTER : DISABLE_DATE_FILTER,
});

export const dateFromFilterRequest = (dateFrom: Date | null): Action<Date | null> => ({
  type: FILTER_DATE_FROM,
  payload: dateFrom,
});

export const dateToFilterRequest = (dateTo: Date | null): Action<Date | null> => ({
  type: FILTER_DATE_TO,
  payload: dateTo,
});

export const amountFromFilterRequest = (amountFrom: number): Action<number> => ({
  type: FILTER_AMOUNT_FROM,
  payload: amountFrom,
});

export const amountToFilterRequest = (amountTo: number): Action<number> => ({
  type: FILTER_AMOUNT_TO,
  payload: amountTo,
});

export const sortTransactionAction = (payload: SortingFunction): Action<SortingFunction> => ({
  type: SORT_TRANSACTION,
  payload,
});

export const selectYearAction = (payload: number): Action<number> => ({
  type: SELECT_YEAR,
  payload,
});

export const resetFilterAction = (): Action => ({
  type: RESET_FILTER_VALUES,
});
