import create, { StateSelector } from 'zustand';

import { FilterArgs, Maybe, TransactionMap } from '../graphql.generated';

interface TransactionStore {
  transactions: TransactionMap[];
  total: number;

  setTransactions: (transactions: TransactionMap[]) => void;
  addTransactions: (transactions: TransactionMap[]) => void;
  setTotal: (total: number) => void;
  updateTransaction: (transaction: TransactionMap) => void;
  insertTransaction: (transaction: TransactionMap) => void;
}

interface FilterStore {
  filters: Maybe<FilterArgs>;

  setFilters: (filters: Maybe<FilterArgs>) => void;
  clearFilters: () => void;
}

export const filtersSelector: StateSelector<FilterStore, FilterStore['filters']> = (state) => state.filters;
export const clearFiltersSelector: StateSelector<FilterStore, FilterStore['clearFilters']> = (state) =>
  state.clearFilters;
export const setFiltersSelector: StateSelector<FilterStore, FilterStore['setFilters']> = (state) =>
  state.setFilters;
export const transactionsSelector: StateSelector<TransactionStore, TransactionStore['transactions']> = (
  state
) => state.transactions;
export const totalSelector: StateSelector<TransactionStore, TransactionStore['total']> = (state) =>
  state.total;
export const updateTransactionSelector: StateSelector<
  TransactionStore,
  TransactionStore['updateTransaction']
> = (state) => state.updateTransaction;
export const addTransactionsSelector: StateSelector<TransactionStore, TransactionStore['addTransactions']> = (
  state
) => state.addTransactions;
export const insertTransactionsSelector: StateSelector<
  TransactionStore,
  TransactionStore['insertTransaction']
> = (state) => state.insertTransaction;
export const setTransactionsSelector: StateSelector<TransactionStore, TransactionStore['setTransactions']> = (
  state
) => state.setTransactions;

export const useFiltersStore = create<FilterStore>((set, get) => ({
  filters: null,

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  clearFilters: () => set({ filters: null }),
}));

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  total: 0,

  setTransactions: (transactions) => set({ transactions }),
  setTotal: (total) => set({ total }),
  addTransactions: (transactions) => set({ transactions: get().transactions.concat(transactions) }),
  insertTransaction: (transaction) => {
    const transactions = get().transactions;

    let i = 0;
    while (transaction.date < transactions[i].date) i++;

    transactions.splice(i, 1, transaction);
    set({ transactions: [...transactions] });
  },
  updateTransaction: (transaction) => {
    const transactions = get().transactions;
    const index = transactions.findIndex((t) => t.id === transaction.id);

    if (index > -1) {
      transactions[index] = transaction;
      set({ transactions: [...transactions] });
    }
  },
}));
