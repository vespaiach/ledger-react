import { RequestReasonsAction, ReceiveReasonsAction } from './Reason/action';
import { AppErrorAction, AppLoadingAction } from './Shared/action';
import {
  UpdateTransactionFilterAction,
  RequestTransactionsAction,
  ReceiveTransactionsAction,
  RequestTransactionPagesAction,
  UpdateTransactionTotalPagesAction,
  UpdateTransactionPageAction,
} from './Transaction/action';

export enum ReasonActionType {
  REQUEST = '@Reason/request-list',
  RECEIVE = '@Reason/receive-list',
  ERROR = '@Reason/receive-error',
}

export enum TransactionActionType {
  UPDATE_FILTER = '@Transaction/update-filter',
  UPDATE_PAGE = '@Transaction/update-page',
  REQUEST = '@Transaction/request',
  PAGES = '@Transaction/request-total-pages',
  RECEIVE = '@Transaction/receive',
  RECEIVE_PAGE = '@Transaction/receive-total-pages',
}

export enum SharedActionType {
  LOADING = '@Shared/application-loading',
  ERROR = '@Shared/application-error',
}

export type SagaReturn<T> = {
  error?: string;
  data?: T;
}

export type LedgerAction =
  | UpdateTransactionFilterAction
  | RequestTransactionPagesAction
  | RequestTransactionsAction
  | ReceiveTransactionsAction
  | UpdateTransactionTotalPagesAction
  | UpdateTransactionPageAction
  | RequestReasonsAction
  | ReceiveReasonsAction
  | AppLoadingAction
  | AppErrorAction;
