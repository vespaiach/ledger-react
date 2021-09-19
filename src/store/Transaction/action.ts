import { Maybe } from 'graphql/jsutils/Maybe';

import { Transaction } from '../../graphql.generated';
import { TransactionActionType } from '../types';

export interface TransactionFilter {
  amountFrom: Maybe<number>;
  amountTo: Maybe<number>;
  dateFrom: Maybe<number>;
  dateTo: Maybe<number>;
  reason: Maybe<number>;
}

export interface TransactionState {
  filter: TransactionFilter;
  data: Transaction[];
  pages: (boolean | null)[];
  lookup: Record<number, number>;
}

export interface UpdateTransactionFilterAction {
  type: TransactionActionType.UPDATE_FILTER;
  payload: {
    field: keyof TransactionFilter;
    value: TransactionFilter[keyof TransactionFilter];
  };
}

export interface UpdateTransactionPageAction {
  type: TransactionActionType.UPDATE_PAGE;
  payload: number;
}

export interface UpdateTransactionTotalPagesAction {
  type: TransactionActionType.RECEIVE_PAGE;
  payload: {
    totalPages: number;
    totalRecords: number;
  };
}

export interface RequestTransactionsAction {
  type: TransactionActionType.REQUEST;
  payload: {
    startIndex: number;
    endIndex?: number;
  };
}

export interface RequestTransactionPagesAction {
  type: TransactionActionType.PAGES;
}

export interface ReceiveTransactionsAction {
  type: TransactionActionType.RECEIVE;
  payload: {
    data: Transaction[];
    offset: number;
  };
}

/**
 * status:
 *  - False: loading
 *  - True: loaded
 */
export interface SetTransactionPageAction {
  type: TransactionActionType.SET_PAGE;
  payload: {
    page: number;
    status: boolean;
  };
}

export const setPageStatus = (page: number, status: boolean): SetTransactionPageAction => ({
  type: TransactionActionType.SET_PAGE,
  payload: {
    page,
    status,
  },
});

export const updateFilter = (
  field: keyof TransactionFilter,
  value: TransactionFilter[keyof TransactionFilter]
): UpdateTransactionFilterAction => ({
  type: TransactionActionType.UPDATE_FILTER,
  payload: {
    field,
    value,
  },
});

export const updatePage = (page: number): UpdateTransactionPageAction => ({
  type: TransactionActionType.UPDATE_PAGE,
  payload: page,
});

export const requestTransactions = (
  startIndex: number,
  endIndex?: number
): RequestTransactionsAction => ({
  type: TransactionActionType.REQUEST,
  payload: {
    startIndex,
    endIndex,
  },
});

export const requestTotalPages = (): RequestTransactionPagesAction => ({
  type: TransactionActionType.PAGES,
});

export const receiveTransactions = (
  transactions: Transaction[],
  offset: number
): ReceiveTransactionsAction => ({
  type: TransactionActionType.RECEIVE,
  payload: { data: transactions, offset },
});

export const receiveTotalPages = (payload: {
  totalPages: number;
  totalRecords: number;
}): UpdateTransactionTotalPagesAction => ({
  type: TransactionActionType.RECEIVE_PAGE,
  payload,
});
