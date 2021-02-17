/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { useCallback, useMemo } from 'react';

function useDateFrom(val, enable) {
    return useCallback(
        (item) => {
            if (enable) {
                return item.date >= val;
            }
            return true;
        },
        [val, enable]
    );
}

function useDateTo(val, enable) {
    return useCallback(
        (item) => {
            if (enable) {
                return item.date <= val;
            }
            return true;
        },
        [val, enable]
    );
}

function useAmountFrom(val, enable) {
    return useCallback(
        (item) => {
            if (enable) {
                return item.amount >= val;
            }
            return true;
        },
        [val, enable]
    );
}

function useAmountTo(val, enable) {
    return useCallback(
        (item) => {
            if (enable) {
                return item.amount <= val;
            }
            return true;
        },
        [val, enable]
    );
}

function useTransactionType(income, expense) {
    return useCallback(
        (item) => {
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
export function useTransactions({ data, filter, sortingFn }) {
    const dateFromFilter = useDateFrom(filter.dateFrom, filter.enableDateFilter);
    const dateToFilter = useDateTo(filter.dateTo, filter.enableDateFilter);
    const amountFromFilter = useAmountFrom(filter.amountFrom, filter.enableAmountFilter);
    const amountToFilter = useAmountTo(filter.amountTo, filter.enableAmountFilter);
    const transactionTypeFilter = useTransactionType(filter.income, filter.expense);

    const filtered = useMemo(() => {
        const pipe = [
            dateFromFilter,
            dateToFilter,
            amountFromFilter,
            amountToFilter,
            transactionTypeFilter,
        ];
        return data.filter((it) => pipe.every((fn) => fn(it)));
    }, [
        data,
        dateFromFilter,
        dateToFilter,
        amountFromFilter,
        amountToFilter,
        transactionTypeFilter,
    ]);

    return useMemo(() => (sortingFn ? filtered.sort(sortingFn) : filtered), [filtered, sortingFn]);
}

export function useCategories({ data }) {
    return useMemo(() => {
        const cats = new Set();
        data.forEach((it) => {
            cats.add(it.category);
        });
        return Array.from(cats);
    }, [data]);
}
