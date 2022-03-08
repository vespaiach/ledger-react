import { Maybe } from 'graphql/jsutils/Maybe';
import { atom } from 'jotai';

import {
  CreateReasonDocument,
  CreateReasonMutation,
  CreateReasonMutationVariables,
  CreateTransactionDocument,
  CreateTransactionMutation,
  CreateTransactionMutationVariables,
  DeleteTransactionDocument,
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables,
  GetTransactionDocument,
  GetTransactionQuery,
  GetTransactionQueryVariables,
  GetTransactionsDocument,
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  MutationUpdateTransactionArgs,
  Reason,
  Transaction,
  UpdateTransactionMutation,
  UpdateTransactionMutationVariables,
} from '../graphql/graphql.generated';
import { reasonsAtom } from './reason';
import { gqlClient } from './utils';

export const filterTransactionAtom = atom<
  Maybe<{
    fromAmount?: Maybe<number>;
    toAmount?: Maybe<number>;
    fromDate?: Maybe<Date>;
    toDate?: Maybe<Date>;
    reasonIds?: Maybe<number[]>;
  }>
>(null);
export const lastCursorTransactionAtom = atom<number | null>(null);
export const transactionsAtom = atom<Transaction[]>([]);

export const writeFilterTransactionAtom = atom(
  null,
  (
    _,
    set,
    update: Maybe<{
      fromAmount?: Maybe<number>;
      toAmount?: Maybe<number>;
      fromDate?: Maybe<Date>;
      toDate?: Maybe<Date>;
      reasonIds?: Maybe<number[]>;
    }>
  ) => {
    set(filterTransactionAtom, (filters) => ({ ...filters, ...update }));
    set(writeLastCursorAtom, { cursor: null });
  }
);
export const writeLastCursorAtom = atom(null, async (get, set, { cursor }: { cursor: number | null }) => {
  const lastCursor = get(lastCursorTransactionAtom);

  if (cursor !== lastCursor || lastCursor === null) {
    try {
      const filtering = get(filterTransactionAtom);

      const { error, data } = await gqlClient.query<GetTransactionsQuery, GetTransactionsQueryVariables>({
        query: GetTransactionsDocument,
        variables: {
          fromDate: filtering?.fromDate?.toISOString(),
          toDate: filtering?.toDate?.toISOString(),
          fromAmount: filtering?.fromAmount,
          toAmount: filtering?.toAmount,
          reasonIds: filtering?.reasonIds,
          take: 50,
          lastCursor: cursor,
        },
      });

      if (!error && data) {
        const transactions = data.transactions ?? [];

        set(lastCursorTransactionAtom, cursor);
        set(transactionsAtom, (prev) => (cursor ? [...prev, ...transactions] : transactions));
      }
    } catch (e) {
      console.error(e);
    }
  }
});

/**
 * Creating/ Updating/ Deleting Transaction.
 */
export const transactionIdAtom = atom<Maybe<number>>(null);
export const reasonIdAtom = atom<Maybe<number>>(null);
export const reasonTextAtom = atom<Maybe<string>>(null);
export const amountAtom = atom<Maybe<number>>(null);
export const dateAtom = atom<Maybe<Date>>(null);
export const noteAtom = atom<Maybe<string>>(null);

export const transactionSavingAtom = atom(false);
export const transactionLoadingAtom = atom(false);

export const transactionForCreatingUpdatingAtom = atom<null, { id?: string }>(
  () => null,
  async (_, set, { id }) => {
    if (!id) {
      set(transactionIdAtom, null);
      set(reasonIdAtom, null);
      set(reasonTextAtom, null);
      set(dateAtom, null);
      set(amountAtom, null);
      set(noteAtom, null);

      return;
    }

    try {
      set(transactionSavingAtom, true);

      const { error, data } = await gqlClient.query<GetTransactionQuery, GetTransactionQueryVariables>({
        query: GetTransactionDocument,
        variables: { id: Number(id) },
      });

      if (!error && data?.transaction) {
        set(transactionIdAtom, data.transaction.id);
        set(reasonIdAtom, data.transaction.reason.id);
        set(reasonTextAtom, data.transaction.reason.text);
        set(dateAtom, new Date(data.transaction.date));
        set(amountAtom, data.transaction.amount);
        set(noteAtom, data.transaction.note);
      }
    } catch (e) {
      console.error(e);
    } finally {
      set(transactionSavingAtom, false);
    }
  }
);

export const saveTransactionAtom = atom(
  () => null,
  /**
   * Let's validate data outside of this function.
   * Expecting data being saved are valid
   */
  async (
    get,
    set,
    {
      id,
      reasonText,
      amount,
      date,
      note,
    }: {
      id?: number;
      reasonText?: Maybe<string>;
      amount?: Maybe<number>;
      date?: Maybe<Date>;
      note?: Maybe<string>;
    }
  ) => {
    try {
      const reasons = get(reasonsAtom);
      set(transactionSavingAtom, true);

      /**
       * Create a new reason if not exist.
       */

      const reason = reasons.find((r) => r.text === reasonText);
      let reasonId = reason?.id;

      if (!reason && reasonText) {
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

          reasonId = data.reason.id;
        } else {
          console.error(errors);
        }
      }

      if (reasonId) {
        if (!id && date && amount) {
          const { errors } = await gqlClient.mutate<
            CreateTransactionMutation,
            CreateTransactionMutationVariables
          >({
            mutation: CreateTransactionDocument,
            variables: { date: date.toISOString(), amount, reasonId, note },
          });

          if (errors) {
            console.error(errors);
          }

          return;
        }

        if (id) {
          const { errors } = await gqlClient.mutate<
            UpdateTransactionMutation,
            UpdateTransactionMutationVariables
          >({
            mutation: CreateTransactionDocument,
            variables: {
              id,
              date: date?.toISOString(),
              amount,
              reasonId,
              note,
            },
          });

          if (errors) {
            console.error(errors);
          }

          return;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      set(transactionSavingAtom, false);
    }
  }
);

export const deleteTransactionAtom = atom(null, async (_, set, { id }: { id: number }) => {
  if (id) {
    const { errors, data } = await gqlClient.mutate<
      DeleteTransactionMutation,
      DeleteTransactionMutationVariables
    >({
      mutation: DeleteTransactionDocument,
      variables: { id },
    });

    if (errors) {
      console.error(errors);
    }

    if (data?.deleteTransaction) {
      set(transactionsAtom, (trans) => trans.filter((t) => t.id !== id));
    }
  }
});
