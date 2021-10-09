import { Transaction } from '../../../graphql.generated';
import {
  ChangeTotalTransactionAction,
  DeleteTransactionAction,
  ReceiveOneTransactionAction,
  ReceiveTransactionAction,
  RequestTransactionsAction,
  SaveTransactionAction,
  TransactionActionType,
  TransactionInput,
} from '../../types';

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
