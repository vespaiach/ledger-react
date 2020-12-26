import { useMemo, useEffect, useRef, useState } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Setting from '../../components/Icons/Setting';
import Plus from '../../components/Icons/Plus';
import BlockHeader from '../../components/BlockHeader';
import VirtualTable from '../../components/VirtualTable';
import SettingDialog from '../../components/SettingDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import { formatLongDate, formatCurrency } from '../../utils/format';
import FormDialog from './Form';

const headerHeight = 60;
const rowHeight = 60;
const templateCols = [
    {
        label: 'Date',
        dataKey: 'date',
        align: 'left',
        rowHeight,
        headerHeight,
        width: 20, // percent
        format: formatLongDate,
    },
    {
        label: 'Amount',
        dataKey: 'amount',
        align: 'right',
        rowHeight,
        headerHeight,
        width: 18, // percent
        format: formatCurrency,
    },
    {
        label: 'Description',
        dataKey: 'description',
        align: 'left',
        rowHeight,
        headerHeight,
        width: 30, // percent
    },
    {
        label: 'Category',
        dataKey: 'category',
        align: 'left',
        rowHeight,
        headerHeight,
        width: 20, // percent
    },
    {
        label: '',
        dataKey: '2_buttons',
        align: 'right',
        rowHeight,
        headerHeight,
        width: 12, // percent
    },
];

export default function ExpenseList() {
    const openSettingDialog = useSelector((state) => state.exTrans.openSettingForm);
    const openFormDialog = useSelector((state) => state.exTrans.openDialog);
    const imcomeList = useSelector((state) => state.exs.list);
    const fetching = useSelector((state) => state.exs.loading);
    const totalRecords = useSelector((state) => state.exs.totalRecords);
    const categories = useSelector((state) => state.exCates.list);
    const searchByDateFrom = useSelector((state) => state.exs.lookup.dateFrom);
    const searchByDateTo = useSelector((state) => state.exs.lookup.dateTo);
    const searchByCategory = useSelector((state) => state.exs.lookup.category);
    const orderField = useSelector((state) => state.exs.sort.field);
    const orderDirection = useSelector((state) => state.exs.sort.direction);
    const fetchedTotalRecords = useSelector((state) => state.exs.fetchedTotalRecords);

    const dispatch = useDispatch();

    const loaderRef = useRef(null);
    const resolver = useRef(null);
    const [deletingExpenseId, setDeletingExpenseId] = useState(0);

    const columns = useMemo(() => {
        return templateCols.map((c) => {
            if (c.dataKey === orderField) {
                return {
                    ...c,
                    direction: orderDirection,
                };
            }
            return c;
        });
    }, [orderField, orderDirection]);

    /**
     * After fetched expense rows, call resolver to trigger table's render
     */
    useEffect(() => {
        if (fetching) {
            resolver.current();
        }
    }, [fetching]);

    useEffect(() => {
        if (!fetchedTotalRecords && loaderRef.current !== null) {
            loaderRef.current.resetLoadMoreRowsCache(true);
        }
        dispatch({ type: 'Saga: fetch expenses categories' });
    }, [fetchedTotalRecords, dispatch]);

    useEffect(() => {
        dispatch({ type: 'Saga: fetch expenses categories' });
    }, [dispatch]);

    const handleLoadMore = ({ startIndex, stopIndex }) => {
        dispatch({
            type: 'Saga: request more expense records',
            payload: { startIndex, stopIndex },
        });
        return new Promise((resolve) => {
            resolver.current = resolve;
        });
    };

    return (
        <>
            <BlockHeader title="Expenses Transactions" totalRecords={fetchedTotalRecords ? totalRecords : 0}>
                <ButtonGroup variant="text" disableElevation>
                    <Button
                        onClick={() => {
                            dispatch({ type: 'Reducer - exTrans: open form dialog' });
                        }}
                    >
                        <Plus />
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch({ type: 'Reducer - exTrans: open setting form' });
                        }}
                    >
                        <Setting />
                    </Button>
                </ButtonGroup>
            </BlockHeader>
            <VirtualTable
                loaderRef={loaderRef}
                totalRows={totalRecords}
                onLoadMore={handleLoadMore}
                rows={imcomeList}
                columns={columns}
                headerHeight={headerHeight}
                rowHeight={rowHeight}
                onDelete={({ rowData }) => {
                    setDeletingExpenseId(rowData.id);
                }}
                onEdit={({ rowData: vals }) => {
                    dispatch({ type: 'Reducer - exTrans: set amount of expense', payload: vals.amount });
                    dispatch({ type: 'Reducer - exTrans: set date of expense', payload: vals.date });
                    dispatch({ type: 'Reducer - exTrans: set description of expense', payload: vals.description });
                    dispatch({ type: 'Reducer - exTrans: set category of expense', payload: vals.category });
                    dispatch({ type: 'Reducer - exTrans: open form dialog' });
                }}
            />
            <SettingDialog
                categories={categories}
                category={searchByCategory}
                from={searchByDateFrom}
                to={searchByDateTo}
                orderField={orderField}
                orderDirection={orderDirection}
                open={openSettingDialog}
                onClose={() => {
                    dispatch({ type: 'Reducer - exTrans: close setting form' });
                }}
                onSubmit={(payload) => {
                    dispatch({
                        type: 'Saga: update sort and lookup of expenses',
                        payload,
                    });
                    dispatch({ type: 'Reducer - exTrans: close setting form' });
                }}
            />
            <FormDialog open={openFormDialog} />
            <ConfirmDialog
                title="Deleting Confirmation"
                text="You are deleting expense transaction. Do you want it?"
                open={deletingExpenseId > 0}
                onYes={() => {
                    dispatch({ type: 'Saga - exs: delete expense transation', payload: deletingExpenseId });
                    setDeletingExpenseId(0);
                }}
                onClose={() => {
                    setDeletingExpenseId(0);
                }}
            />
        </>
    );
}
