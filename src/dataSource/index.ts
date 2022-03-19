import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import provider from './remoteDbProvider';
import {
  Maybe,
  MutationSaveTransactionArgs,
  QueryGetTransactionsArgs,
  Reason,
  ReasonMap,
  Transaction,
  TransactionMap,
  UpdateTransactionMutationVariables,
} from '../graphql.generated';

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

export const getTransaction$ = (id: number) => {
  return from(selectedProvider.getTransaction(id)).pipe(map((t) => (t ? mapTransaction(t) : null)));
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
  ).pipe(map((t) => t.map(mapTransaction)));
};

export const loadReasons$ = () => from(selectedProvider.loadReasons()).pipe(map((r) => r.map(mapReason)));

export const saveTransaction$ = (
  args: Omit<MutationSaveTransactionArgs, 'date'> & { date?: Maybe<Date> }
) =>
  from(selectedProvider.saveTransaction({ ...args, date: args.date?.toISOString() })).pipe(
    map(mapTransaction)
  );

export const signout$ = () => from(selectedProvider.signout());

export const getToken$ = (key: string) => from(selectedProvider.token(key));

export const getSigninKey$ = (email: string) => from(selectedProvider.signin(email));
