import { atom, Setter } from 'jotai';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Reason, ReasonMap, Transaction, TransactionMap } from '../graphql.generated';

export const appMessageAtom = atom<AppMessage | null>(null);

export function reportError(set: Setter, error: any, timeout = 300) {
  set(appMessageAtom, { message: error.message, type: 'error', timeout });
}

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

export const loadTransactions$ = (source: Promise<Transaction[]>) =>
  from(source).pipe(map((t) => t.map(mapTransaction)));

export const saveTransaction$ = (source: Promise<Transaction>) => from(source).pipe(map(mapTransaction));

export const loadReasons$ = (source: Promise<Reason[]>) => from(source).pipe(map((r) => r.map(mapReason)));
