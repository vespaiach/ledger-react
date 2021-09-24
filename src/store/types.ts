import { PopPaneAction, PushPaneAction } from './Pane/action';
import { RequestReasonsAction, ReceiveReasonsAction } from './Reason/action';
import { AppErrorAction, AppLoadingAction } from './Shared/action';
import {
  ReceiveOneTransactionAction,
  ReceiveTotalPagesAction,
  ReceiveTransactionAction,
  RequestTotalPagesAction,
  RequestTransactionsAction,
  ResetTransactionDataAction,
  SaveTransactionAction,
  UpdateFilterAction,
  UpdatePageAction,
} from './Transaction/action';

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
  REQUEST = '@Transaction/request-list-transaction',
  RECEIVE = '@Transaction/receive-list-transactions',
  RECEIVE_ONE = '@Transaction/receive-a-transaction',
  RESET = '@Transaction/clear-all-transaction-data',
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
  | RequestTransactionsAction
  | ReceiveTransactionAction
  | ReceiveOneTransactionAction
  | ResetTransactionDataAction
  | SaveTransactionAction
  | RequestTotalPagesAction
  | ReceiveTotalPagesAction
  | UpdatePageAction
  | UpdateFilterAction
  | RequestReasonsAction
  | ReceiveReasonsAction
  | AppLoadingAction
  | AppErrorAction
  | PushPaneAction
  | PopPaneAction;
