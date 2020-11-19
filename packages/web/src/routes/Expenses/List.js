import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableList from '../../components/TableList';
import MasterPage from '../../components/MasterPage';
import FilteringMenu from '../../components/FilteringMenu';

export default function ExpenseList() {
    const anchorEl = useRef(null);
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
    const categories = useSelector((state) => state.expenses.categories);
    const currentPage = useSelector((state) => state.expenses.currentPage);
    const totalPages = useSelector((state) => state.expenses.totalPages);
    const handleSort = (sort) => {
        dispatch({ type: 'Request: sort expense list', payload: sort });
    };
    const closeFilter = () => setOpenFilter(false);

    useEffect(() => {
        dispatch({ type: 'Request: fetch expense list', payload: 1 });
    }, [dispatch]);

    return (
        <MasterPage>
            <TableList
                filteringEleRef={anchorEl}
                rows={expenses}
                onSort={handleSort}
                orderBy={orderBy.field}
                order={orderBy.order}
                hasFilter={hasFilter}
                totalPages={totalPages}
                currentPage={currentPage}
                onFilterClick={() => {
                    setOpenFilter(!openFilter);
                }}
                onPage={(e, page) => {
                    dispatch({
                        type: 'Request: fetch expense list',
                        payload: page,
                    });
                }}
                onEdit={(dt) => {
                    dispatch({ type: 'Request: edit expense', payload: dt.id });
                }}
            />
            <FilteringMenu
                anchorEleRef={anchorEl}
                from={from}
                to={to}
                category={category}
                categories={(categories || []).map((c) => c.name)}
                open={openFilter}
                onClose={closeFilter}
                onClear={() => {
                    closeFilter();
                    dispatch({ type: 'Request: clear expense list fitering' });
                }}
                onFilter={(payload) => {
                    closeFilter();
                    dispatch({
                        type: 'Request: filter expense list',
                        payload,
                    });
                }}
            />
        </MasterPage>
    );
}
