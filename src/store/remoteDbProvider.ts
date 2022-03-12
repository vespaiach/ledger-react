import { of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';

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
  return new Promise<ConvertedTransaction[]>((next) => {
    callRemote(getTransactionsQuery, variables)
      .pipe(
        map<AjaxResponse, ConvertedTransaction[]>((r) => {
          const res = r.response.data;
          return res.transactions?.map(mapTransaction) ?? [];
        }),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe({ next });
  });
}

function loadReasons() {
  return new Promise<ConvertedReason[]>((next) => {
    callRemote(getReasons)
      .pipe(
        map((r) => {
          const res = r.response.data;
          return res.reasons?.map(mapReason) ?? [];
        }),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe({ next });
  });
}

function createReason(variables: MutationCreateReasonArgs) {
  return new Promise<ConvertedReason>((next) => {
    callRemote(createReasonMutation, variables)
      .pipe(
        map((r) => {
          if (!r.response.data?.reason) throw new Error("Couldn't create a Reason");

          return mapReason(r.response.data.reason);
        })
      )
      .subscribe({ next });
  });
}

function saveTransaction(variables: any) {
  return new Promise<ConvertedTransaction>((next) => {
    callRemote(variables.id ? updateTransactionMutation : createTransactionMutation, variables)
      .pipe(
        map((r) => {
          const res = r.response.data;

          if (!res?.transaction) throw new Error("Couldn't create a Transaction");

          return mapTransaction(res.transaction);
        })
      )
      .subscribe({ next });
  });
}

export function deleteTransaction(id: number) {
  return new Promise<boolean>((next) => {
    callRemote(deleteTransactionMutation, { id })
      .pipe(
        map((r) => {
          const res = r.response.data;

          if (!res?.deleteTransaction) throw new Error("Couldn't delete Transaction");

          return true;
        })
      )
      .subscribe({ next });
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
