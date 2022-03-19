import create, { StateSelector } from 'zustand';

import { FilterArgs, Maybe, TransactionMap } from '../graphql.generated';

interface TransactionStore {
  filters: Maybe<FilterArgs>;
  transactions: TransactionMap[];

  setFilters: (filters: Maybe<FilterArgs>) => void;
  clearFilters: () => void;
  addTransactions: (transactions: TransactionMap[]) => void;
  updateTransaction: (transaction: TransactionMap) => void;
}

export const filtersSelector: StateSelector<TransactionStore, TransactionStore['filters']> = (state) =>
  state.filters;
export const transactionsSelector: StateSelector<TransactionStore, TransactionStore['transactions']> = (
  state
) => state.transactions;
export const updateTransactionSelector: StateSelector<
  TransactionStore,
  TransactionStore['updateTransaction']
> = (state) => state.updateTransaction;
export const addTransactionsSelector: StateSelector<TransactionStore, TransactionStore['addTransactions']> = (
  state
) => state.addTransactions;

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  filters: null,
  transactions: [],

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  clearFilters: () => set({ filters: null }),
  addTransactions: (transactions) => set({ transactions: get().transactions.concat(transactions) }),
  updateTransaction: (transaction) => {
    const transactions = get().transactions;
    const index = transactions.findIndex((t) => t.id === transaction.id);

    if (index > -1) {
      transactions[index] = transaction;
      set({ transactions: [...transactions] });
    }
  },
}));
