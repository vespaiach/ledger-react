/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { useCallback, useMemo } from 'react';
import { SortingFunction, Transaction } from '../../types';

function useDateFrom(val: Date | null, enable: boolean) {
    return useCallback(
        (item: Transaction): boolean => {
            if (enable && val) {
                return item.date >= val;
            }
            return true;
        },
        [val, enable]
    );
}

function useDateTo(val: Date | null, enable: boolean) {
    return useCallback(
        (item: Transaction): boolean => {
            if (enable && val) {
                return item.date <= val;
            }
            return true;
        },
        [val, enable]
    );
}

function useAmountFrom(val: number | null, enable: boolean) {
    return useCallback(
        (item: Transaction): boolean => {
            if (enable && val !== null) {
                return item.amount >= val;
            }
            return true;
        },
        [val, enable]
    );
}

function useAmountTo(val: number | null, enable: boolean) {
    return useCallback(
        (item: Transaction): boolean => {
            if (enable && val !== null) {
                return item.amount <= val;
            }
            return true;
        },
        [val, enable]
    );
}

function useTransactionType(income: boolean, expense: boolean) {
    return useCallback(
        (item: Transaction): boolean => {
            if (income && expense) {
                return true;
            } else if (income) {
                return item.transactionType === 'in';
            } else if (expense) {
                return item.transactionType === 'ex';
            } else {
                return false;
            }
        },
        [income, expense]
    );
}

/**
 * Every transaction record will pass to a pipe of filtering functions.
 * If all the filtering functions return true, that record will be kept in hook's return
 */
export function useTransactions({
    transactions,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
    showIncome,
    showExpense,
    allowDateFilter,
    allowAmountFilter,
    sortingFunction,
}: {
    transactions: Transaction[];
    dateFrom: Date | null;
    dateTo: Date | null;
    amountFrom: number | null;
    amountTo: number | null;
    showIncome: boolean;
    showExpense: boolean;
    allowDateFilter: boolean;
    allowAmountFilter: boolean;
    sortingFunction: SortingFunction | null;
}) {
    const dateFromFilter = useDateFrom(dateFrom, allowDateFilter);
    const dateToFilter = useDateTo(dateTo, allowDateFilter);
    const amountFromFilter = useAmountFrom(amountFrom, allowAmountFilter);
    const amountToFilter = useAmountTo(amountTo, allowAmountFilter);
    const transactionTypeFilter = useTransactionType(showIncome, showExpense);

    const filtered = useMemo(() => {
        const pipe = [
            dateFromFilter,
            dateToFilter,
            amountFromFilter,
            amountToFilter,
            transactionTypeFilter,
        ];
        return transactions.filter((it) => pipe.every((fn) => fn(it)));
    }, [
        transactions,
        dateFromFilter,
        dateToFilter,
        amountFromFilter,
        amountToFilter,
        transactionTypeFilter,
    ]);

    return useMemo(() => (sortingFunction ? filtered.sort(sortingFunction) : filtered), [
        filtered,
        sortingFunction,
    ]);
}

/**
 * Loop throught list of transaction and get the list of categories.
 */
export function useCategories(transactions: Transaction[]) {
    return useMemo<string[]>((): string[] => {
        const cats = new Set<string>();
        transactions.forEach((it) => {
            cats.add(it.category);
        });
        return Array.from(cats);
    }, [transactions]);
}
