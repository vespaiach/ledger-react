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
import useTransactions from './hooks';
import DialogPanel from '../../components/DialogPanel';

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

const currentYear = new Date().getFullYear();

export default function Transactions({ year = currentYear }) {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const rawTransactions = useSelector((state) => state.transaction.list);
    const dateFrom = useSelector((state) => state.transaction.filter.dateFrom);
    const dateTo = useSelector((state) => state.transaction.filter.dateTo);
    const amountFrom = useSelector((state) => state.transaction.filter.amountFrom);
    const amountTo = useSelector((state) => state.transaction.filter.amountTo);
    const type = useSelector((state) => state.transaction.filter.type);

    /**
     * Transaction list after apply filtering
     */
    const filteredTransactions = useTransactions({
        data: rawTransactions,
        dateFrom,
        dateTo,
        amountFrom,
        amountTo,
        type,
    });

    /**
     * Load transactions by year
     */
    useEffect(() => {
        dispatch({ type: 'Saga: fetch transactions', payload: year });
    }, [year, dispatch]);

    // const handleDelete = (payload) =>
    //     dispatch({
    //         type: 'Reducer - app: confirm',
    //         payload: {
    //             title: 'Delete Transaction',
    //             message: 'You are removing the transaction and this is a non-undoable action ',
    //             type: 'delete',
    //             payload: {
    //                 type: 'Saga: remove expense transation',
    //                 payload,
    //             },
    //         },
    //     });

    // const handleEdit = (payload) =>
    //     dispatch({
    //         type: 'Saga: edit expense transation',
    //         payload,
    //     });

    return <TransactionList data={filteredTransactions} totalRows={filteredTransactions.length} />;
}
