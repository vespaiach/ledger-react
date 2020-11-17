import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableList from '../../components/TableList';
import MasterPage from '../../components/MasterPage';
import FilterModal from '../../components/FilterModal';

export default function ExpenseList() {
    const [openFilter, setOpenFilter] = useState(false);
    const dispatch = useDispatch();
    const expenses = useSelector((state) => {
        if (state.expenses.currentPage && !state.expenses.fetching) {
            return state.expenses.pages[state.expenses.currentPage];
        }
        return [];
    });
    const orderBy = useSelector((state) => state.expenses.orderBy);
    const hasFilter = useSelector(
        (state) =>
            state.expenses.category !== null ||
            state.expenses.from !== null ||
            state.expenses.to !== null
    );
    const from = useSelector((state) => state.expenses.from);
    const to = useSelector((state) => state.expenses.to);
    const category = useSelector((state) => state.expenses.category);
    const handleSort = (sort) => {
        dispatch({ type: 'REQUEST_SORT_EXPENSES', payload: sort });
    };
    const closeFilter = () => setOpenFilter(false);

    useEffect(() => {
        dispatch({ type: 'REQUEST_EXPENSES', payload: 1 });
    }, [dispatch]);

    return (
        <MasterPage>
            <TableList
                rows={expenses}
                onSort={handleSort}
                orderBy={orderBy.field}
                order={orderBy.order}
                hasFilter={hasFilter}
                onFilterClick={() => {
                    setOpenFilter(true);
                }}
            />
            <FilterModal
                from={from}
                to={to}
                category={category}
                open={openFilter}
                onClose={closeFilter}
                onClear={() =>
                    dispatch({ type: 'REQUEST_RESET_EXPENSES_FILTER' })
                }
                onSubmit={(payload) => {
                    dispatch({
                        type: 'REQUEST_UPDATE_EXPENSES_FILTER',
                        payload,
                    });
                }}
            />
        </MasterPage>
    );
}
