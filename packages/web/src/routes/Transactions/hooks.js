import { useCallback, useMemo } from 'react';

function useDateFrom(val) {
    return useCallback(
        (item) => {
            if (val) {
                return item.date >= val;
            }
            return true;
        },
        [val]
    );
}

function useDateTo(val) {
    return useCallback(
        (item) => {
            if (val) {
                return item.date < val;
            }
            return true;
        },
        [val]
    );
}

function useAmountFrom(val) {
    return useCallback(
        (item) => {
            if (val) {
                return item.amount >= val;
            }
            return true;
        },
        [val]
    );
}

function useAmountTo(val) {
    return useCallback(
        (item) => {
            if (val) {
                return item.amount < val;
            }
            return true;
        },
        [val]
    );
}

function useType(val) {
    return useCallback(
        (item) => {
            if (val) {
                return item.transactionType === val;
            }
            return true;
        },
        [val]
    );
}

export function useTransactions({ data, dateFrom, dateTo, amountFrom, amountTo, type, sortingFn }) {
    const dateFromFilter = useDateFrom(dateFrom);
    const dateToFilter = useDateTo(dateTo);
    const amountFromFilter = useAmountFrom(amountFrom);
    const amountToFilter = useAmountTo(amountTo);
    const typeFilter = useType(type);

    const filtered = useMemo(() => {
        const pipe = [dateFromFilter, dateToFilter, amountFromFilter, amountToFilter, typeFilter];
        return data.filter((it) => pipe.every((fn) => fn(it)));
    }, [data, dateFromFilter, dateToFilter, amountFromFilter, amountToFilter, typeFilter]);

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
