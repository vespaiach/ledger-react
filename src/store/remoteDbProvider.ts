import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import {
  Reason,
  Transaction,
  ConvertedTransaction,
  ConvertedReason,
  QueryGetTransactionsArgs,
  DataProvider,
  MutationCreateReasonArgs,
} from '../graphql.generated';
import { getReasons } from '../graphql/reason';
import {
  createReasonMutation,
  createTransactionMutation,
  deleteTransactionMutation,
  getTransactionsQuery,
  updateTransactionMutation,
} from '../graphql/transaction';

const url = import.meta.env.VITE_GRAPHQL_URL as string;

const mapTransaction = (tran: Transaction): ConvertedTransaction => ({
  ...tran,
  updatedAt: new Date(tran.date),
  date: new Date(tran.date),
  reason: mapReason(tran.reason),
});

const mapReason = (reason: Reason): ConvertedReason => ({
  ...reason,
  updatedAt: new Date(reason.updatedAt),
});

function callRemote(query: string, variables?: Record<string, unknown>) {
  return ajax({
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
}

function loadTransactions(variables: QueryGetTransactionsArgs) {
  return new Promise<ConvertedTransaction[]>((next, error) => {
    callRemote(getTransactionsQuery, variables)
      .pipe(
        map<AjaxResponse, ConvertedTransaction[]>((r) => {
          const res = r.response.data;
          return res.transactions?.map(mapTransaction) ?? [];
        })
      )
      .subscribe({ next, error });
  });
}

function loadReasons() {
  return new Promise<ConvertedReason[]>((next, error) => {
    callRemote(getReasons)
      .pipe(
        map((r) => {
          const res = r.response.data;
          return res.reasons?.map(mapReason) ?? [];
        })
      )
      .subscribe({ next, error });
  });
}

function createReason(variables: MutationCreateReasonArgs) {
  return new Promise<ConvertedReason>((next, error) => {
    callRemote(createReasonMutation, variables)
      .pipe(
        map((r) => {
          if (!r.response.data?.reason) throw new Error("Couldn't create a Reason");

          return mapReason(r.response.data.reason);
        })
      )
      .subscribe({ next, error });
  });
}

function saveTransaction(variables: any) {
  return new Promise<ConvertedTransaction>((next, error) => {
    callRemote(variables.id ? updateTransactionMutation : createTransactionMutation, variables)
      .pipe(
        map((r) => {
          const res = r.response.data;

          if (!res?.transaction) throw new Error("Couldn't create a Transaction");

          return mapTransaction(res.transaction);
        })
      )
      .subscribe({ next, error });
  });
}

export function deleteTransaction(id: number) {
  return new Promise<boolean>((next, error) => {
    callRemote(deleteTransactionMutation, { id })
      .pipe(
        map((r) => {
          const res = r.response.data;

          if (!res?.deleteTransaction) throw new Error("Couldn't delete Transaction");

          return true;
        })
      )
      .subscribe({ next, error });
  });
}

const provider: DataProvider = {
  loadTransactions,
  loadReasons,

  saveTransaction,
  deleteTransaction,
  createReason,
};

export default provider;
