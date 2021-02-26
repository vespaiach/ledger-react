import { Action, Transaction } from '../types.d';

export const GET_LIST_YEAR = 'get list of available years';
export const RECEIVE_LIST_YEAR = 'receive list of available years';
export const GET_TRANSACTION = 'get list of transactions in year';
export const RECEIVE_TRANSACTION = 'receive list of transaction in year';
export const RECORD_TRANSACTION = 'create a new transaction';
export const UPDATE_TRANSACTION = 'update a transaction';
export const DELETE_TRANSACTION = 'delete a transaction';
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

export const yearRequest = (): Omit<Action, 'payload'> => ({ type: GET_LIST_YEAR });

export const yearList = (payload: number[]): Action<string, number[]> => ({
    type: RECEIVE_LIST_YEAR,
    payload,
});

export const transactionRequestAction = (year: number): Action<string, number> => ({
    type: GET_TRANSACTION,
    payload: year,
});

export const transactionList = (transactions: Transaction[]): Action<string, Transaction[]> => ({
    type: RECEIVE_TRANSACTION,
    payload: transactions,
});

export const transactionCreatingRequest = (payload: {
    [key: string]: string | number | Date | undefined;
}): Action<string, { [key: string]: string | Date | undefined | number }> => ({
    type: RECORD_TRANSACTION,
    payload,
});

export const transactionUpdatingRequest = (payload: {
    [key: string]: string | number | Date | undefined;
}): Action<string, { [key: string]: string | Date | number | undefined }> => ({
    type: UPDATE_TRANSACTION,
    payload,
});

export const transactionDeletingRequest = (id: number): Action<string, number> => ({
    type: DELETE_TRANSACTION,
    payload: id,
});

export const incomeFilterRequest = (income: boolean): Action<string, boolean> => ({
    type: FILTER_INCOME,
    payload: income,
});

export const expenseFilterRequest = (expense: boolean): Action<string, boolean> => ({
    type: FILTER_EXPENSE,
    payload: expense,
});

export const amountFilterEnableRequest = (enable: boolean): Omit<Action, 'payload'> => ({
    type: enable ? ENABLE_AMOUNT_FILTER : DISABLE_AMOUNT_FILTER,
});

export const dateFilterEnableRequest = (enable: boolean): Omit<Action, 'payload'> => ({
    type: enable ? ENABLE_DATE_FILTER : DISABLE_DATE_FILTER,
});

export const dateFromFilterRequest = (dateFrom: Date | null): Action => ({
    type: FILTER_DATE_FROM,
    payload: dateFrom,
});

export const dateToFilterRequest = (dateTo: Date | null): Action => ({
    type: FILTER_DATE_TO,
    payload: dateTo,
});

export const amountFromFilterRequest = (amountFrom: number): Action => ({
    type: FILTER_AMOUNT_FROM,
    payload: amountFrom,
});

export const amountToFilterRequest = (amountTo: number): Action => ({
    type: FILTER_AMOUNT_TO,
    payload: amountTo,
});
