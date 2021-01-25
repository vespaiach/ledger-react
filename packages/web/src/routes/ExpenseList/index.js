import { makeStyles } from '@material-ui/core/styles';
import { useRef, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    KeyboardArrowUpRounded as KeyboardArrowUpRoundedIcon,
    AddRounded as AddRoundedIcon,
} from '@material-ui/icons';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import TransactionList from '../../components/TransationList';
import TransactionDialog from '../../components/TransactionDialog';
import NoResult from '../../components/NoResult';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: 'fixed',
        bottom: 16,
        right: 24,
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
}));

export default function ExpenseList() {
    const history = useHistory();
    const classes = useStyles();
    const expenseList = useSelector((state) => state.exs.list);
    const fetching = useSelector((state) => state.exs.loading);
    const totalRecords = useSelector((state) => state.exs.totalRecords);
    const fetchedTotalRecords = useSelector((state) => state.exs.fetchedTotalRecords);
    const search = useSelector((state) => state.exs.search);
    const hasFilter = useMemo(() => Object.values(search).filter((s) => !!s).length > 0, [search]);

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [transactionDetail, setTransactionDetail] = useState(null);

    const loaderRef = useRef(null);
    const resolver = useRef(null);

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
    }, [fetchedTotalRecords]);

    const handleLoadMore = ({ startIndex, stopIndex }) => {
        dispatch({
            type: 'Saga: request more expense records',
            payload: { startIndex, stopIndex },
        });
        return new Promise((resolve) => {
            resolver.current = resolve;
        });
    };

    const handleDelete = (payload) =>
        dispatch({
            type: 'Reducer - app: confirm',
            payload: {
                title: 'Delete Transaction',
                message: 'You are removing the transaction and this is a non-undoable action ',
                type: 'delete',
                payload: {
                    type: 'Saga: remove expense transation',
                    payload,
                },
            },
        });

    const handleEdit = (payload) =>
        dispatch({
            type: 'Saga: edit expense transation',
            payload,
        });

    let el = null;
    if (totalRecords > 0) {
        el = (
            <TransactionList
                loaderRef={loaderRef}
                data={expenseList}
                totalRows={totalRecords}
                onLoadMore={handleLoadMore}
                onDelete={(index) => {
                    handleDelete(expenseList[index].id);
                }}
                onEdit={(index) => {
                    handleEdit(expenseList[index].id);
                }}
                onDetail={(index) => setTransactionDetail(expenseList[index])}
            />
        );
    } else {
        el = (
            <NoResult
                hasFilter={hasFilter}
                onClear={() => {
                    dispatch({ type: 'Reducer - exs: reset expense searching' });
                    dispatch({ type: 'Reducer - exs: clear list of expenses' });
                }}
                onAdd={() => history.push('/portal/expenses/new')}
            />
        );
    }

    return (
        <>
            {el}
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                FabProps={{
                    color: 'secondary',
                }}
                direction="left">
                <SpeedDialAction
                    icon={<KeyboardArrowUpRoundedIcon />}
                    tooltipTitle="go to top"
                    onClick={() => {
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                        setOpen(false);
                    }}
                />
                <SpeedDialAction
                    icon={<AddRoundedIcon />}
                    tooltipTitle="add expense transaction"
                    onClick={() => {
                        setOpen(false);
                        dispatch({ type: 'Saga: add expense transation' });
                    }}
                />
            </SpeedDial>
            <TransactionDialog
                open={transactionDetail !== null}
                transactionDetail={transactionDetail}
                onClose={() => setTransactionDetail(null)}
                onDelete={(id) => {
                    handleDelete(id);
                }}
                onEdit={(id) => {
                    handleEdit(id);
                }}
            />
        </>
    );
}
