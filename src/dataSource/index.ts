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
import { UnauthenticationError } from '../utils/AuthError';
import { useAuthStore } from '../store/auth';

const selectedProvider = window.localStorage.getItem('offline_provider') ? provider : provider;

const mapTransaction = (tran: Transaction): TransactionMap => {
  return {
    ...tran,
    updatedAt: new Date(tran.updatedAt),
    date: new Date(tran.date),
    reasons: tran.reasons.map(mapReason),
  };
};

const mapReason = (reason: Reason): ReasonMap => ({
  ...reason,
  updatedAt: new Date(reason.updatedAt),
});

const errorReport = (e: any) => {
  console.error(e);

  if (e instanceof UnauthenticationError) {
    useAuthStore.getState().setAuth(null);
  }

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
            take: args.take || 100,
          }
        : { take: 100 }
    )
  ).pipe(
    catchError((e) => errorReport(e)),
    map((dt) => ({ transactions: dt.transactions.map(mapTransaction), total: dt.total }))
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

export const signin$ = (username: string, password: string) =>
  from(selectedProvider.signin(username, password)).pipe(catchError((e) => errorReport(e)));
