import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import TransactionTable from '../../components/TransactionTable';
import BlockHeader from '../../components/BlockHeader';
import ExpenseForm from './Form';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.disabled,
    },
}));

export default function ExpenseList() {
    const anchorEl = useRef(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [openForm, setOpenForm] = useState(null);
    const dispatch = useDispatch();
    const expenses = useSelector((state) => {
        if (state.expenses.currentPage && !state.expenses.fetching) {
            return state.expenses.pages[state.expenses.currentPage];
        }
        return [];
    });
    const orderBy = useSelector((state) => state.expenses.orderBy);
    const from = useSelector((state) => state.expenses.from);
    const to = useSelector((state) => state.expenses.to);
    const category = useSelector((state) => state.expenses.category);
    const categories = useSelector((state) => state.expenses.categories);
    const currentPage = useSelector((state) => state.expenses.currentPage);
    const totalPages = useSelector((state) => state.expenses.totalPages);
    const numberOfFilter = (from !== null ? 1 : 0) + (to !== null ? 1 : 0) + (category !== null ? 1 : 0);

    const handleSort = (sort) => {
        dispatch({ type: 'Request: sort expense list', payload: sort });
    };
    const closeFilter = () => setOpenFilter(false);

    useEffect(() => {
        dispatch({ type: 'Request: fetch expense list', payload: 1 });
    }, [dispatch]);

    return (
        <>
            <BlockHeader title="Expenses Transactions"></BlockHeader>
            <TransactionTable
                numberOfFilter={numberOfFilter}
                filterButtonRef={anchorEl}
                rows={expenses}
                onSort={handleSort}
                orderBy={orderBy.field}
                order={orderBy.order}
                totalPages={totalPages}
                currentPage={currentPage}
                onFilter={() => {
                    setOpenFilter(!openFilter);
                }}
                onPage={(e, page) => {
                    dispatch({
                        type: 'Request: fetch expense list',
                        payload: page,
                    });
                }}
                onEdit={({ id, catgory, amount, description, date }) => {
                    setOpenForm({ id, catgory, amount, description, date });
                }}
            />
            <ExpenseForm {...(openForm || {})} open={openForm !== null} onCancel={() => setOpenForm(null)} />
        </>
    );
}
