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
  Reason,
  Transaction,
} from '../graphql/graphql.generated';
import { reasonsAtom } from './reason';
import { gqlClient } from './utils';

/**
 * For filtering
 */
export const filterTransactionAtom = atom<
  Maybe<{
    fromAmount?: Maybe<number>;
    toAmount?: Maybe<number>;
    fromDate?: Maybe<Date>;
    toDate?: Maybe<Date>;
    reasonId?: Maybe<number>;
  }>
>(null);

export const transactionsAtom = atom<Transaction[]>([]);
export const fetchTransactionsAtom = atom<Transaction[], GetTransactionsQueryVariables, Promise<void>>(
  (get) => get(transactionsAtom),
  async (get, set, { take, lastCursor }) => {
    try {
      const filtering = get(filterTransactionAtom);

      const { error, data } = await gqlClient.query<
        GetTransactionsQuery,
        Pick<GetTransactionsQueryVariables, 'take' | 'lastCursor'>
      >({
        query: GetTransactionsDocument,
        variables: {
          ...filtering,
          take,
          lastCursor,
        },
      });

      if (!error && data) {
        const transactions = data.transactions ?? [];

        set(transactionsAtom, (prev) => (lastCursor ? [...prev, ...transactions] : transactions));
      }
    } catch (e) {
      console.error(e);
    }
  }
);

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

export const saveTransactionAtom = atom<null, undefined, Promise<void>>(
  () => null,
  /**
   * Let's validate data outside of this function.
   * Expecting data being saved are valid
   */
  async (get, set) => {
    try {
      set(transactionSavingAtom, true);

      const reasonId = get(reasonIdAtom);
      const reasonText = get(reasonTextAtom);
      const amount = get(amountAtom) as number;
      const date = get(dateAtom) as Date;
      const note = get(noteAtom);

      /**
       * Create a new reason if not exist.
       */
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
          variables: { date: date.toISOString(), amount, reasonId: checkReasonId, note },
        });

        if (errors) {
          console.error(errors);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      set(transactionSavingAtom, false);
    }
  }
);

export const deleteTransactionAtom = atom<null, undefined, Promise<void>>(
  () => null,
  async (get, set) => {
    const id = get(transactionIdAtom);

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

      set(transactionIdAtom, null);
      set(reasonIdAtom, null);
      set(reasonTextAtom, null);
      set(dateAtom, null);
      set(amountAtom, null);
      set(noteAtom, null);
    }
  }
);
