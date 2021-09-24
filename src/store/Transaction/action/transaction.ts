import { Transaction } from '../../../graphql.generated';
import { TransactionActionType } from '../../types';

export type TransactionInput = {
  id?: number;
  amount?: number;
  date?: Date;
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

export interface SaveTransactionAction {
  type: TransactionActionType.SAVE;
  payload: TransactionInput;
}

export interface ResetTransactionDataAction {
  type: TransactionActionType.RESET;
}

export const requestTransactions = (startIndex: number, endIndex?: number): RequestTransactionsAction => ({
  type: TransactionActionType.REQUEST,
  payload: {
    startIndex,
    endIndex,
  },
});

export const receiveTransactions = (data: Transaction[], offset: number): ReceiveTransactionAction => ({
  type: TransactionActionType.RECEIVE,
  payload: {
    data,
    offset,
  },
});

export const receiveOneTransaction = (payload: Transaction): ReceiveOneTransactionAction => ({
  type: TransactionActionType.RECEIVE_ONE,
  payload,
});

export const saveTransaction = (payload: TransactionInput): SaveTransactionAction => ({
  type: TransactionActionType.SAVE,
  payload,
});

export const resetTransactionData = (): ResetTransactionDataAction => ({
  type: TransactionActionType.RESET,
});
