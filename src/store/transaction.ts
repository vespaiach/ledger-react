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
  GetTransactionsDocument,
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  Reason,
  Transaction,
  UpdateTransactionDocument,
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

      set(appMessageAtom, { message: 'Something went wrong', type: 'error', timeout: 3000 });
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

export const transactionSaveStatusAtom = atom<'saving' | 'success' | 'error' | null>(null);
export const transactionLoadingAtom = atom(false);

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
      id?: Maybe<number>;
      reasonText?: Maybe<string>;
      amount?: Maybe<number>;
      date?: Maybe<Date>;
      note?: Maybe<string>;
    }
  ) => {
    try {
      const reasons = get(reasonsAtom);
      set(transactionSaveStatusAtom, 'saving');

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
          set(appMessageAtom, { message: "Couldn't create a new reason", type: 'error', timeout: 3000 });
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
            set(appMessageAtom, {
              message: "Couldn't create a new transaction",
              type: 'error',
              timeout: 3000,
            });
          } else {
            set(transactionSaveStatusAtom, 'success');
          }

          return;
        }

        if (id) {
          const { errors } = await gqlClient.mutate<
            UpdateTransactionMutation,
            UpdateTransactionMutationVariables
          >({
            mutation: UpdateTransactionDocument,
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
            set(appMessageAtom, {
              message: "Couldn't update transaction",
              type: 'error',
              timeout: 3000,
            });
          } else {
            set(transactionSaveStatusAtom, 'success');
          }

          return;
        }
      } else {
        set(transactionSaveStatusAtom, 'error');
        set(appMessageAtom, { message: "Couldn't create a new reason", type: 'error', timeout: 3000 });
      }
    } catch (e) {
      console.error(e);
      set(appMessageAtom, { message: String(e), type: 'error', timeout: 3000 });
      set(transactionSaveStatusAtom, 'error');
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

      set(appMessageAtom, {
        message: "Couldn't delete transaction",
        type: 'error',
        timeout: 3000,
      });
    }

    if (data?.deleteTransaction) {
      set(transactionsAtom, (trans) => trans.filter((t) => t.id !== id));
    }
  }
});

export interface AppMessage {
  message: string;
  type: 'error' | 'success' | 'notification';
  timeout?: number; // miliseconds
}

export const appMessageAtom = atom<AppMessage | null>(null);
