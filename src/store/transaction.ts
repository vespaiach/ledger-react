import { Maybe } from 'graphql/jsutils/Maybe';
import { atom, Setter } from 'jotai';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { MutationSaveTransactionArgs, TransactionMap } from '../graphql.generated';
import { reasonsAtom } from './reason';
import provider from './remoteDbProvider';
import { loadReasons$, loadTransactions$, saveTransaction$, appMessageAtom, reportError } from './utils';

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
export const transactionsAtom = atom<TransactionMap[]>([]);

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

    const transPromise = provider.loadTransactions({
      fromDate: filtering?.fromDate?.toISOString(),
      toDate: filtering?.toDate?.toISOString(),
      fromAmount: filtering?.fromAmount,
      toAmount: filtering?.toAmount,
      reasonIds: filtering?.reasonIds,
      take: 50,
      lastCursor: cursor,
    });

    loadTransactions$(transPromise).subscribe({
      next: (transitions) => {
        set(lastCursorTransactionAtom, cursor);
        set(transactionsAtom, (prev) => (cursor ? [...prev, ...transitions] : transitions));
      },
      error: (err) => reportError(set, err),
    });
  }
});

/**
 * Creating/ Updating/ Deleting TransactionMap.
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
  (_, set, variables: MutationSaveTransactionArgs) => {
    set(transactionSaveStatusAtom, 'saving');

    saveTransaction$(provider.saveTransaction(variables))
      .pipe(
        mergeMap((transaction) =>
          loadReasons$(provider.loadReasons()).pipe(map((reasons) => ({ transaction, reasons })))
        )
      )
      .subscribe({
        next: ({ transaction, reasons }) => {
          set(reasonsAtom, reasons);

          if (variables.id) {
            set(transactionsAtom, (t) =>
              t.map((t) => {
                if (t.id === transaction.id) return { ...transaction };
                return t;
              })
            );
          } else {
            set(writeLastCursorAtom, { cursor: null });
          }
        },
        error: (err) => {
          reportError(set, err);

          set(transactionSaveStatusAtom, 'error');
        },
        complete: () => {
          set(transactionSaveStatusAtom, 'success');
        },
      });
  }
);

export const deleteTransactionAtom = atom(null, (_, set, { id }: { id: number }) => {
  if (id) {
    try {
      from(provider.deleteTransaction(id)).subscribe({
        complete: () => {
          set(transactionsAtom, (trans) => trans.filter((t) => t.id !== id));
        },

        error: () => {
          set(appMessageAtom, {
            message: 'Transaction deleted!',
            type: 'success',
            timeout: 3000,
          });
        },
      });
    } catch (e) {
      console.error(e);

      reportError(set, e);
    }
  }
});
