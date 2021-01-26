import { useCallback, useMemo } from 'react';

export default function useCounting({
    tabValue,
    incomeSorting,
    expenseSorting,
    incomeSearching,
    expenseSearching,
    dispatch,
}) {
    const incomeSearchingCount = useMemo(
        () => Object.values(incomeSearching).filter((s) => !!s).length,
        [incomeSearching]
    );
    const expenseSearchingCount = useMemo(
        () => Object.values(expenseSearching).filter((s) => !!s).length,
        [expenseSearching]
    );
    const onSortReset = useCallback(() => {
        if (tabValue === 0) {
            dispatch({ type: 'Reducer - ins: reset income sorting' });
            dispatch({ type: 'Reducer - ins: clear list of incomes' });
        } else if (tabValue === 1) {
            dispatch({ type: 'Reducer - exs: reset expense sorting' });
            dispatch({ type: 'Reducer - exs: clear list of expenses' });
        }
    }, [dispatch, tabValue]);
    const onSearchReset = useCallback(() => {
        if (tabValue === 0) {
            dispatch({ type: 'Reducer - ins: reset income searching' });
            dispatch({ type: 'Reducer - ins: clear list of incomes' });
        } else if (tabValue === 1) {
            dispatch({ type: 'Reducer - exs: reset expense searching' });
            dispatch({ type: 'Reducer - exs: clear list of expenses' });
        }
    }, [dispatch, tabValue]);
    const onSortApply = useCallback(
        (payload) => {
            if (tabValue === 0) {
                dispatch({ type: 'Reducer - ins: apply income sorting', payload });
                dispatch({ type: 'Reducer - ins: clear list of incomes' });
            } else if (tabValue === 1) {
                dispatch({ type: 'Reducer - exs: apply expense sorting', payload });
                dispatch({ type: 'Reducer - exs: clear list of expenses' });
            }
        },
        [dispatch, tabValue]
    );
    const onSearchApply = useCallback(
        (payload) => {
            if (tabValue === 0) {
                dispatch({ type: 'Reducer - ins: apply income searching', payload });
                dispatch({ type: 'Reducer - ins: clear list of incomes' });
            } else if (tabValue === 1) {
                dispatch({ type: 'Reducer - exs: apply expense searching', payload });
                dispatch({ type: 'Reducer - exs: clear list of expenses' });
            }
        },
        [dispatch, tabValue]
    );

    if (tabValue === 0) {
        return {
            searchingCount: incomeSearchingCount,
            sorting: incomeSorting,
            searching: incomeSearching,
            onSortReset,
            onSearchReset,
            onSortApply,
            onSearchApply,
        };
    }
    return {
        searchingCount: expenseSearchingCount,
        sorting: expenseSorting,
        searching: expenseSearching,
        onSortReset,
        onSearchReset,
        onSortApply,
        onSearchApply,
    };
}
