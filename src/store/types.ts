import { PopPaneAction, PushPaneAction, RemovePaneAction } from './Pane/action';
import { RequestReasonsAction, ReceiveReasonsAction } from './Reason/action';
import { ResetAction } from './Shared/action';
import {
  ChangeTotalTransactionAction,
  DeleteTransactionAction,
  ReceiveOneTransactionAction,
  ReceiveTotalPagesAction,
  ReceiveTransactionAction,
  RequestTotalPagesAction,
  RequestTransactionsAction,
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
  | ResetAction;

export type LedgerAction = Actions & { callback?: (data: unknown, error: Error) => void };
