import { atom } from 'jotai';

import {
  GetTransactionsDocument,
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  Transaction,
} from '../graphql/graphql.generated';
import { gqlClient } from './utils';

export const reasonIdAtom = atom<number | null>(null);
export const fromAmountAtom = atom<number | null>(null);
export const toAmountAtom = atom<number | null>(null);
export const fromDateAtom = atom<Date | null>(null);
export const toDateAtom = atom<Date | null>(null);

export const transactionsAtom = atom<Transaction[]>([]);

export const fetchTransactionsAtom = atom<Transaction[], GetTransactionsQueryVariables, Promise<void>>(
  (get) => get(transactionsAtom),
  async (_, set, variables) => {
    try {
      const { error, data } = await gqlClient.query<GetTransactionsQuery, GetTransactionsQueryVariables>({
        query: GetTransactionsDocument,
        variables,
      });

      if (!error && data) {
        const transactions = data.transactions ?? [];

        set(transactionsAtom, (prev) => (variables.lastCursor ? [...prev, ...transactions] : transactions));
      }
    } catch (e) {
      console.error(e);
    }
  }
);
