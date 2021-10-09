import { Spec } from 'immutability-helper';

import { PopPaneAction, PushPaneAction, RemovePaneAction } from './Pane/action';
import { RequestReasonsAction, ReceiveReasonsAction } from './Reason/action';
import { ResetAction } from './Shared/action';
import { Maybe, Transaction } from '../graphql.generated';

/**
 * Redux action types
 */

export enum OtherActionType {
  UPDATE = '@Other/update',
}

export enum ReasonActionType {
  REQUEST = '@Reason/request-list',
  RECEIVE = '@Reason/receive-list',
  ERROR = '@Reason/receive-error',
}

export enum PageActionType {
  RECEIVE = '@Transaction/receive-total-pages',
  REQUEST = '@Transaction/request-total-pages',
  UPDATE = '@Transaction/update-pages',
}

export enum FilterActionType {
  UPDATE = '@Transaction/update-filter',
}

export enum TransactionActionType {
  SAVE = '@Transaction/create-update-transaction',
  DELETE = '@Transaction/delete-transaction',
  REQUEST = '@Transaction/request-list-transaction',
  RECEIVE = '@Transaction/receive-list-transactions',
  RECEIVE_ONE = '@Transaction/receive-a-transaction',
  CHANGE_TOTAL_TRANSACTION = '@Transaction/change-total-transactions',
  RESET = '@Transaction/clear-all-transaction-data',
}

export enum SharedActionType {
  UPDATE = '@Shared/update-field',
  RESET = '@Shared/reset',
}

export enum PaneActionType {
  PUSH = '@Pane/push',
  POP = '@Pane/pop',
  REMOVE = '@Pane/remove', // need to animate before closing
}

export type SagaReturn<T> = {
  error?: string;
  data?: T;
};

/**
 * Transaction pages
 */

export interface RequestTotalPagesAction {
  type: PageActionType.REQUEST;
}

export interface ReceiveTotalPagesAction {
  type: PageActionType.RECEIVE;
  payload: {
    totalPages: number;
    totalRecords: number;
  };
}

export interface UpdatePageAction {
  type: PageActionType.UPDATE;
  payload: {
    page: number;
    status: boolean;
  };
}

/**
 * Transaction data
 */

export interface TransactionState {
  filter: TransactionFilter;
  data: Transaction[];
  pages: (boolean | null)[];
  lookup: Record<number, number>;
  resetting: boolean;
}

export type TransactionInput = {
  id?: number;
  amount?: number;
  date?: Date | null;
  reason?: string;
  description?: string;
};

export interface RequestTransactionsAction {
  type: TransactionActionType.REQUEST;
  payload: {
    startIndex: number;
    endIndex?: number;
  };
}

export interface ReceiveTransactionAction {
  type: TransactionActionType.RECEIVE;
  payload: {
    offset: number;
    data: Transaction[];
  };
}

export interface ReceiveOneTransactionAction {
  type: TransactionActionType.RECEIVE_ONE;
  payload: Transaction;
}

export interface ChangeTotalTransactionAction {
  type: TransactionActionType.CHANGE_TOTAL_TRANSACTION;
  payload: number;
}

export interface SaveTransactionAction {
  type: TransactionActionType.SAVE;
  payload: {
    transactionInput: TransactionInput;
    paneIndex: number;
  };
}

export interface DeleteTransactionAction {
  type: TransactionActionType.DELETE;
  payload: {
    transactionId: number;
    paneIndex: number;
  };
}

/**
 * Transaction filters
 */

export interface TransactionFilter {
  amountFrom: Maybe<number>;
  amountTo: Maybe<number>;
  dateFrom: Maybe<number>;
  dateTo: Maybe<number>;
  reason: Maybe<number>;
  limit: number;
}

export interface UpdateFilterAction {
  type: FilterActionType.UPDATE;
  payload: {
    field: keyof TransactionFilter;
    value: TransactionFilter[keyof TransactionFilter];
  };
}

/**
 * Other fields from transaction state
 */

export interface UpdateOtherFieldsAction {
  type: OtherActionType.UPDATE;
  payload: Spec<TransactionState>;
}

/**
 * Ledger's Actions
 */
type Actions =
  | RequestTransactionsAction
  | ReceiveTransactionAction
  | ReceiveOneTransactionAction
  | ChangeTotalTransactionAction
  | SaveTransactionAction
  | DeleteTransactionAction
  | RequestTotalPagesAction
  | ReceiveTotalPagesAction
  | UpdatePageAction
  | UpdateFilterAction
  | RequestReasonsAction
  | ReceiveReasonsAction
  | PushPaneAction
  | PopPaneAction
  | RemovePaneAction
  | ResetAction
  | UpdateOtherFieldsAction;

export type LedgerAction = Actions & { callback?: (data: unknown, error: Error) => void };
