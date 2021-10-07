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

export const receiveOneTransaction = (transaction: Transaction): ReceiveOneTransactionAction => ({
  type: TransactionActionType.RECEIVE_ONE,
  payload: transaction,
});

export const changeTotalTransaction = (number: number): ChangeTotalTransactionAction => ({
  type: TransactionActionType.CHANGE_TOTAL_TRANSACTION,
  payload: number,
});

export const saveTransaction = (
  transactionInput: TransactionInput,
  paneIndex: number
): SaveTransactionAction => ({
  type: TransactionActionType.SAVE,
  payload: {
    transactionInput,
    paneIndex,
  },
});

export const deleteTransaction = (transactionId: number, paneIndex: number): DeleteTransactionAction => ({
  type: TransactionActionType.DELETE,
  payload: {
    transactionId,
    paneIndex,
  },
});