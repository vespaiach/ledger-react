import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useCounting(tabValue) {
    const dispatch = useDispatch();
    const inSort = useSelector((state) => state.app.inSort);
    const inSearch = useSelector((state) => state.app.inSearch);
    const exSort = useSelector((state) => state.app.exSort);
    const exSearch = useSelector((state) => state.app.exSearch);
    const inSortingCount = useMemo(() => Object.values(inSort).filter((s) => !!s).length, [inSort]);
    const exSortingCount = useMemo(() => Object.values(exSort).filter((s) => !!s).length, [exSort]);
    const inSearchingCount = useMemo(() => Object.values(inSearch).filter((s) => !!s).length, [
        inSearch,
    ]);
    const exSearchingCount = useMemo(() => Object.values(exSearch).filter((s) => !!s).length, [
        exSearch,
    ]);
    const onSortReset = useCallback(() => {
        if (tabValue === 0) {
            dispatch({ type: 'Reducer - app: reset insort' });
        } else if (tabValue === 1) {
            dispatch({ type: 'Reducer - app: reset exsort' });
        }
    }, [dispatch, tabValue]);
    const onSearchReset = useCallback(() => {
        if (tabValue === 0) {
            dispatch({ type: 'Reducer - app: reset insearch' });
        } else if (tabValue === 1) {
            dispatch({ type: 'Reducer - app: reset exsearch' });
        }
    }, [dispatch, tabValue]);
    const onSortApply = useCallback(
        (payload) => {
            if (tabValue === 0) {
                dispatch({ type: 'Reducer - app: apply insort', payload });
            } else if (tabValue === 1) {
                dispatch({ type: 'Reducer - app: apply exsort', payload });
            }
        },
        [dispatch, tabValue]
    );
    const onSearchApply = useCallback(
        (payload) => {
            if (tabValue === 0) {
                dispatch({ type: 'Reducer - app: apply insearch', payload });
            } else if (tabValue === 1) {
                dispatch({ type: 'Reducer - app: apply exsearch', payload });
            }
        },
        [dispatch, tabValue]
    );

    if (tabValue === 0) {
        return {
            sortingCount: inSortingCount,
            searchingCount: inSearchingCount,
            sort: inSort,
            search: inSearch,
            onSortReset,
            onSearchReset,
            onSortApply,
            onSearchApply,
        };
    }
    return {
        sortingCount: exSortingCount,
        searchingCount: exSearchingCount,
        sort: exSort,
        search: exSearch,
        onSortReset,
        onSearchReset,
        onSortApply,
        onSearchApply,
    };
}
