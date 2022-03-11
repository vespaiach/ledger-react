import { atom } from 'jotai';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import {
  CreateReasonMutation,
  CreateReasonMutationVariables,
  CreateTransactionMutation,
  GetReasonsQueryVariables,
  GetTransactionQuery,
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  Reason as ReasonQuery,
  GetReasonsQuery,
  UpdateTransactionMutationVariables,
  Maybe,
  DeleteTransactionMutation,
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

const mapTransaction = (tran: NonNullable<GetTransactionQuery['transaction']>): Transaction => ({
  ...tran,
  updatedAt: new Date(tran.date),
  date: new Date(tran.date),
  reason: {
    ...tran.reason,
    updatedAt: new Date(tran.reason.updatedAt),
  },
});

const mapReason = (reason: ReasonQuery): Reason => ({
  ...reason,
  updatedAt: new Date(reason.updatedAt),
});

export const appMessageAtom = atom<AppMessage | null>(null);

export function callRemote(query: string, variables?: Record<string, unknown>) {
  return ajax({
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
}

export function loadTransactions(variables: GetTransactionsQueryVariables) {
  return new Promise<Transaction[] | null>((next) => {
    callRemote(getTransactionsQuery, variables)
      .pipe(
        map((r) => {
          const res = r.response.data as GetTransactionsQuery;
          return res.transactions?.map(mapTransaction) ?? null;
        }),
        catchError((err) => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe({ next });
  });
}

export function loadReasons() {
  return new Promise<Reason[] | null>((next) => {
    callRemote(getReasons)
      .pipe(
        map((r) => {
          const res = r.response.data as GetReasonsQuery;
          return res.reasons?.map(mapReason) ?? null;
        }),
        catchError((err) => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe({ next });
  });
}

export function createReason(variables: CreateReasonMutationVariables) {
  return new Promise<Reason | null>((next) => {
    callRemote(createReasonMutation, variables)
      .pipe(
        map((r) => {
          const res = r.response.data as CreateReasonMutation;

          return res.reason ? { ...res.reason, updatedAt: new Date(res.reason?.updatedAt) } : null;
        }),
        catchError((err) => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe({ next });
  });
}

export function saveTransaction(
  variables: Omit<UpdateTransactionMutationVariables, 'id'> & { id: Maybe<number> }
) {
  return new Promise<Transaction | null>((next) => {
    callRemote(variables.id ? createTransactionMutation : updateTransactionMutation, variables)
      .pipe(
        map((r) => {
          const res = r.response.data as CreateTransactionMutation;

          return res.transaction ? mapTransaction(res.transaction) : null;
        }),
        catchError((err) => {
          console.error(err);
          return of(null);
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
          const res = r.response.data as DeleteTransactionMutation;

          return res.deleteTransaction ?? false;
        }),
        catchError((err) => {
          console.error(err);
          return of(false);
        })
      )
      .subscribe({ next });
  });
}
