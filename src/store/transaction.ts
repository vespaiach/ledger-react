import { Maybe } from 'graphql/jsutils/Maybe';
import { atom } from 'jotai';

import {
  CreateReasonDocument,
  CreateReasonMutation,
  CreateReasonMutationVariables,
  CreateTransactionDocument,
  CreateTransactionMutation,
  CreateTransactionMutationVariables,
  GetTransactionsDocument,
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  Reason,
  Transaction,
} from '../graphql/graphql.generated';
import { reasonsAtom } from './reason';
import { gqlClient } from './utils';

export const reasonIdAtom = atom<number | null>(null);
export const fromAmountAtom = atom<number | null>(null);
export const toAmountAtom = atom<number | null>(null);
export const fromDateAtom = atom<Date | null>(null);
export const toDateAtom = atom<Date | null>(null);

export const transactionsAtom = atom<Transaction[]>([]);

export const transactionCreatingAtom = atom(false);

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

export const createTransactionsAtom = atom<
  null,
  {
    date: Date;
    amount: number;
    reasonId: Maybe<number>;
    reasonText?: Maybe<string>;
    note: Maybe<string>;
  }
>(
  () => null,
  async (_, set, { date, amount, reasonId, reasonText, note }) => {
    try {
      set(transactionCreatingAtom, true);

      let checkReasonId = reasonId;
      if (!reasonId && reasonText) {
        const { errors, data } = await gqlClient.mutate<CreateReasonMutation, CreateReasonMutationVariables>({
          mutation: CreateReasonDocument,
          variables: { text: reasonText },
        });

        if (!errors && data?.reason) {
          set(reasonsAtom, (prev) => {
            const ar: Reason[] = [...prev, data.reason as Reason];
            ar.sort((a, b) => a.text.localeCompare(b.text));

            return ar;
          });

          checkReasonId = data.reason.id;
        } else {
          console.error(errors);
        }
      }

      if (checkReasonId) {
        const { errors } = await gqlClient.mutate<
          CreateTransactionMutation,
          CreateTransactionMutationVariables
        >({
          mutation: CreateTransactionDocument,
          variables: { date, amount, reasonId: checkReasonId, note },
        });

        if (errors) {
          console.error(errors);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      set(transactionCreatingAtom, false);
    }
  }
);
