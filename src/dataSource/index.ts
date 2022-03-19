import { from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import provider from './remoteDbProvider';
import {
  Maybe,
  MutationSaveTransactionArgs,
  QueryGetTransactionsArgs,
  Reason,
  ReasonMap,
  Transaction,
  TransactionMap,
} from '../graphql.generated';
import { useAppStore } from '../store/app';

const selectedProvider = window.localStorage.getItem('offline_provider') ? provider : provider;

const mapTransaction = (tran: Transaction): TransactionMap => {
  return {
    ...tran,
    updatedAt: new Date(tran.date),
    date: new Date(tran.date),
    reason: mapReason(tran.reason),
  };
};

const mapReason = (reason: Reason): ReasonMap => ({
  ...reason,
  updatedAt: new Date(reason.updatedAt),
});

const errorReport = (e: any) => {
  console.error(e);

  useAppStore.getState().addError(e.message);
  throw e;
};

export const getTransaction$ = (id: number) => {
  return from(selectedProvider.getTransaction(id)).pipe(
    catchError((e) => errorReport(e)),
    map((t) => (t ? mapTransaction(t) : null))
  );
};

export const loadTransactions$ = (
  args?: Omit<QueryGetTransactionsArgs, 'fromDate' | 'toDate'> & {
    fromDate?: Maybe<Date>;
    toDate?: Maybe<Date>;
  }
) => {
  return from(
    selectedProvider.loadTransactions(
      args
        ? {
            ...args,
            fromDate: args.fromDate?.toISOString(),
            toDate: args.toDate?.toISOString(),
          }
        : undefined
    )
  ).pipe(
    catchError((e) => errorReport(e)),
    map((t) => t.map(mapTransaction))
  );
};

export const loadReasons$ = () =>
  from(selectedProvider.loadReasons()).pipe(
    catchError((e) => errorReport(e)),
    map((r) => r.map(mapReason))
  );

export const deleteTransaction$ = (id: number) =>
  from(selectedProvider.deleteTransaction(id)).pipe(catchError((e) => errorReport(e)));

export const saveTransaction$ = (args: Omit<MutationSaveTransactionArgs, 'date'> & { date?: Maybe<Date> }) =>
  from(selectedProvider.saveTransaction({ ...args, date: args.date?.toISOString() })).pipe(
    catchError((e) => errorReport(e)),
    map(mapTransaction)
  );

export const signout$ = () => from(selectedProvider.signout()).pipe(catchError((e) => errorReport(e)));

export const getToken$ = (key: string) =>
  from(selectedProvider.token(key)).pipe(catchError((e) => errorReport(e)));

export const getSigninKey$ = (email: string) =>
  from(selectedProvider.signin(email)).pipe(catchError((e) => errorReport(e)));
