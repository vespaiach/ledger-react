import { Maybe } from 'graphql/jsutils/Maybe';
import { atom } from 'jotai';

import { ConvertedReason, ConvertedTransaction } from '../graphql.generated';
import { reasonsAtom } from './reason';
import provider from './remoteDbProvider';

export const appMessageAtom = atom<AppMessage | null>(null);

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
export const transactionsAtom = atom<ConvertedTransaction[]>([]);

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
    const filtering = get(filterTransactionAtom);

    const trans = await provider.loadTransactions({
      fromDate: filtering?.fromDate?.toISOString(),
      toDate: filtering?.toDate?.toISOString(),
      fromAmount: filtering?.fromAmount,
      toAmount: filtering?.toAmount,
      reasonIds: filtering?.reasonIds,
      take: 50,
      lastCursor: cursor,
    });

    if (trans) {
      set(lastCursorTransactionAtom, cursor);
      set(transactionsAtom, (prev) => (cursor ? [...prev, ...trans] : trans));
    }
  }
});

/**
 * Creating/ Updating/ Deleting ConvertedTransaction.
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
      id?: number | undefined | null;
      reasonText?: Maybe<string>;
      amount?: Maybe<number>;
      date?: Maybe<Date>;
      note?: Maybe<string>;
    }
  ) => {
    const reasons = get(reasonsAtom);
    set(transactionSaveStatusAtom, 'saving');

    /**
     * Create a new reason if not exist.
     */
    const reason = reasons.find((r) => r.text === reasonText);
    let reasonId = reason?.id;

    if (!reason && reasonText) {
      const reason = await provider.createReason({ text: reasonText });

      if (reason) {
        set(reasonsAtom, (prev) => {
          const ar: ConvertedReason[] = [...prev, reason];
          ar.sort((a, b) => a.text.localeCompare(b.text));

          return ar;
        });

        reasonId = reason.id;
      }
    }

    if (reasonId) {
      const tran = await provider.saveTransaction({ id, date: date?.toISOString(), amount, reasonId, note });

      if (tran) {
        if (id) {
          set(transactionsAtom, (t) =>
            t.map((t) => {
              if (t.id === id) return { ...tran };
              return t;
            })
          );
        } else {
          set(writeLastCursorAtom, { cursor: null });
        }
        set(transactionSaveStatusAtom, 'success');
      } else {
        set(transactionSaveStatusAtom, 'error');
      }
    } else {
      set(transactionSaveStatusAtom, 'error');
      set(appMessageAtom, { message: "Couldn't create a new reason", type: 'error', timeout: 3000 });
    }
  }
);

export const deleteTransactionAtom = atom(null, async (_, set, { id }: { id: number }) => {
  if (id) {
    const result = await provider.deleteTransaction(id);

    if (!result) {
      set(appMessageAtom, {
        message: "Couldn't delete transaction",
        type: 'error',
        timeout: 3000,
      });
    } else {
      set(transactionsAtom, (trans) => trans.filter((t) => t.id !== id));

      set(appMessageAtom, {
        message: 'ConvertedTransaction deleted!',
        type: 'success',
        timeout: 3000,
      });
    }
  }
});
