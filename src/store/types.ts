import { PopPaneAction, PushPaneAction } from './Pane/action';
import { RequestReasonsAction, ReceiveReasonsAction } from './Reason/action';
import { AppErrorAction, AppLoadingAction } from './Shared/action';
import {
  UpdateTransactionFilterAction,
  RequestTransactionsAction,
  ReceiveTransactionsAction,
  RequestTransactionPagesAction,
  UpdateTransactionTotalPagesAction,
  UpdateTransactionPageAction,
  SetTransactionPageAction,
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
  SET_PAGE = '@Transaction/set-page-status',
}

export enum SharedActionType {
  LOADING = '@Shared/application-loading',
  ERROR = '@Shared/application-error',
}

export enum PaneActionType {
  PUSH = '@Pane/push',
  POP = '@Pane/pop',
}

export type SagaReturn<T> = {
  error?: string;
  data?: T;
};

export type LedgerAction =
  | UpdateTransactionFilterAction
  | RequestTransactionPagesAction
  | RequestTransactionsAction
  | ReceiveTransactionsAction
  | UpdateTransactionTotalPagesAction
  | UpdateTransactionPageAction
  | SetTransactionPageAction
  | RequestReasonsAction
  | ReceiveReasonsAction
  | AppLoadingAction
  | AppErrorAction
  | PushPaneAction
  | PopPaneAction;
