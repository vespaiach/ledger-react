import { useEffect, useRef, useState } from 'react';
import { ButtonGroup, Button, useTheme, useMediaQuery } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Setting from '../../components/Icons/Setting';
import Plus from '../../components/Icons/Plus';
import BlockHeader from '../../components/BlockHeader';
import VirtualTable from '../../components/VirtualTable';
import SettingDialog from '../../components/SettingDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import FormDialog from './Form';
import { desktopColDefs, mobileColDefs } from '../../utils/columnDefs';
import useColumnDefs from '../../hooks/useColumnDefs';

const headerHeight = 60;
const rowHeight = 60;

export default function IncomeList() {
    const openSettingDialog = useSelector((state) => state.inTrans.openSettingForm);
    const openFormDialog = useSelector((state) => state.inTrans.openDialog);
    const imcomeList = useSelector((state) => state.ins.list);
    const fetching = useSelector((state) => state.ins.loading);
    const totalRecords = useSelector((state) => state.ins.totalRecords);
    const categories = useSelector((state) => state.inCates.list);
    const searchByDateFrom = useSelector((state) => state.ins.lookup.dateFrom);
    const searchByDateTo = useSelector((state) => state.ins.lookup.dateTo);
    const searchByCategory = useSelector((state) => state.ins.lookup.category);
    const orderField = useSelector((state) => state.ins.sort.field);
    const orderDirection = useSelector((state) => state.ins.sort.direction);
    const fetchedTotalRecords = useSelector((state) => state.ins.fetchedTotalRecords);

    const dispatch = useDispatch();

    const loaderRef = useRef(null);
    const resolver = useRef(null);
    const [deletingIncomeId, setDeletingIncomeId] = useState(0);

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const columns = useColumnDefs(desktopColDefs, mobileColDefs, mobile, orderDirection, orderDirection);

    /**
     * After fetched income rows, call resolver to trigger table's render
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
        dispatch({ type: 'Saga: fetch incomes categories' });
    }, [fetchedTotalRecords, dispatch]);

    useEffect(() => {
        dispatch({ type: 'Saga: fetch incomes categories' });
    }, [dispatch]);

    const handleLoadMore = ({ startIndex, stopIndex }) => {
        dispatch({
            type: 'Saga: request more income records',
            payload: { startIndex, stopIndex },
        });
        return new Promise((resolve) => {
            resolver.current = resolve;
        });
    };

    return (
        <>
            <BlockHeader title="Incomes" totalRecords={fetchedTotalRecords ? totalRecords : 0}>
                <ButtonGroup variant="text" disableElevation>
                    <Button
                        onClick={() => {
                            dispatch({ type: 'Reducer - inTrans: open form dialog' });
                        }}
                    >
                        <Plus />
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch({ type: 'Reducer - inTrans: open setting form' });
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
                    setDeletingIncomeId(rowData.id);
                }}
                onEdit={({ rowData: vals }) => {
                    dispatch({ type: 'Reducer - inTrans: set amount of income', payload: vals.amount });
                    dispatch({ type: 'Reducer - inTrans: set date of income', payload: vals.date });
                    dispatch({ type: 'Reducer - inTrans: set description of income', payload: vals.description });
                    dispatch({ type: 'Reducer - inTrans: set category of income', payload: vals.category });
                    dispatch({ type: 'Reducer - inTrans: open form dialog' });
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
                fullScreen={mobile}
                onClose={() => {
                    dispatch({ type: 'Reducer - inTrans: close setting form' });
                }}
                onSubmit={(payload) => {
                    dispatch({
                        type: 'Saga: update sort and lookup of incomes',
                        payload,
                    });
                    dispatch({ type: 'Reducer - inTrans: close setting form' });
                }}
            />
            <FormDialog open={openFormDialog} fullScreen={mobile} />
            <ConfirmDialog
                fullScreen={mobile}
                title="Deleting Confirmation"
                text="You are deleting income transaction. Do you want it?"
                open={deletingIncomeId > 0}
                onYes={() => {
                    dispatch({ type: 'Saga - ins: delete income transation', payload: deletingIncomeId });
                    setDeletingIncomeId(0);
                }}
                onClose={() => {
                    setDeletingIncomeId(0);
                }}
            />
        </>
    );
}
