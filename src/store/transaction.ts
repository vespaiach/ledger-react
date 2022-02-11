import { atom } from 'jotai';
import {
  GetTransactionsDocument,
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  Transaction,
  TransactionType,
} from '../graphql/graphql.generated';
import { gqlClient } from './utils';

export const lastCursorAtom = atom<number | null>(null);
export const transactionTypeAtom = atom<TransactionType | null>(null);
export const reasonIdAtom = atom<number | null>(null);
export const fromAmountAtom = atom<number | null>(null);
export const toAmountAtom = atom<number | null>(null);
export const fromDateAtom = atom<Date | null>(null);
export const toDateAtom = atom<Date | null>(null);

export const transactionsAtom = atom<Transaction[]>([]);

export const fetchTransactionsAtom = atom<
  Transaction[],
  GetTransactionsQueryVariables | undefined | null,
  Promise<void>
>(
  (get) => get(transactionsAtom),
  async (get, set, args) => {
    try {
      if (args) {
        args.lastCursor !== undefined && set(lastCursorAtom, args.lastCursor);
        args.transactionType !== undefined && set(transactionTypeAtom, args.transactionType);
        args.reasonId !== undefined && set(reasonIdAtom, args.reasonId);
        args.fromAmount !== undefined && set(fromAmountAtom, args.fromAmount);
        args.toAmount !== undefined && set(toAmountAtom, args.toAmount);
        args.fromDate !== undefined && set(fromDateAtom, args.fromDate);
        args.toDate !== undefined && set(toDateAtom, args.toDate);
      }

      const { error, data } = await gqlClient.query<GetTransactionsQuery, GetTransactionsQueryVariables>({
        query: GetTransactionsDocument,
        variables: {
          lastCursor: get(lastCursorAtom),
          toAmount: get(toAmountAtom),
          fromAmount: get(fromAmountAtom),
          toDate: get(toDateAtom),
          fromDate: get(fromDateAtom),
          reasonId: get(reasonIdAtom),
          transactionType: get(transactionTypeAtom),
        },
      });

      if (!error && data) {
        set(transactionsAtom, data.transactions ?? []);
      }
    } catch (e) {
      console.error(e);
    }
  }
);
