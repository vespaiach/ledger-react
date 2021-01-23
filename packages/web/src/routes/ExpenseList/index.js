import { makeStyles } from '@material-ui/core/styles';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    KeyboardArrowUpRounded as KeyboardArrowUpRoundedIcon,
    AddRounded as AddRoundedIcon,
} from '@material-ui/icons';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import TransactionList from '../../components/TransationList';

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

export default function IncomeList() {
    const classes = useStyles();
    const incomeList = useSelector((state) => state.exs.list);
    const fetching = useSelector((state) => state.exs.loading);
    const totalRecords = useSelector((state) => state.exs.totalRecords);
    const fetchedTotalRecords = useSelector((state) => state.exs.fetchedTotalRecords);

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

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

    return (
        <>
            <TransactionList
                loaderRef={loaderRef}
                data={incomeList}
                totalRows={totalRecords}
                onLoadMore={handleLoadMore}
                onDelete={(index) =>
                    dispatch({
                        type: 'Reducer - app: confirm',
                        payload: {
                            title: 'Delete Transaction',
                            message:
                                'You are removing the transaction and this is a non-undoable action ',
                            type: 'delete',
                            payload: {
                                type: 'Saga: remove expense transation',
                                payload: incomeList[index].id,
                            },
                        },
                    })
                }
                onEdit={(index) => {
                    dispatch({
                        type: 'Saga: edit expense transation',
                        payload: incomeList[index].id,
                    });
                }}
            />
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
        </>
    );
}
