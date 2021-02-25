/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    useScrollTrigger,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Box,
    Badge,
    Fab,
    Fade,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import {
    AddRounded as AddRoundedIcon,
    ArrowDropDown as ArrowDropDownIcon,
    ExpandLessRounded as ExpandLessRoundedIcon,
} from '@material-ui/icons';

import TransactionList from './TransationList';
import { useCategories, useTransactions } from './hooks';
import TransactionForm from './TransactionForm';
import TransDetailDialog from './TransDetailDialog';
import DeletingDialog from './DeletingDialog';
import DatabaseSearchIcon from '../../components/Icons/DatabaseSearch';
import SortingIcon from '../../components/Icons/Sorting';
import FilterDialog from './FilterDialog';
import { SortingFunction, Transaction, AppRootState, Action } from '../../types';
import {
    transactionCreatingRequest,
    transactionDeletingRequest,
    transactionUpdatingRequest,
} from '../../actions/trans';

const useStyles = makeStyles((theme) => ({
    formTitleRoot: {
        margin: theme.spacing(3, 0, 2, 0),
    },
    padding: {
        height: 48,
        background: theme.palette.primary.dark,
    },
    pageHead: {
        zIndex: 1002,
        position: 'sticky',
        top: -60,
    },
    pageHeadTitle: {
        background: theme.palette.primary.dark,
        color: theme.palette.common.white,
        padding: theme.spacing(2),
    },
    pageSubMenu: {
        background: theme.palette.primary.dark,
        color: theme.palette.common.white,
        padding: theme.spacing(0, 2, 0, 2),
        display: 'flex',
        '& .MuiTypography-body1': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    grow: {
        flexGrow: 1,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabUp: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(9),
    },
}));

const listOfSorting: { val: SortingFunction; text: string }[] = [
    {
        val: (trans1: Transaction, trans2: Transaction) => {
            if (trans2.amount < trans1.amount) {
                return -1;
            } else if (trans2.amount > trans1.amount) {
                return 1;
            } else {
                return 0;
            }
        },
        text: 'Most amount of money',
    },
    {
        val: (trans1: Transaction, trans2: Transaction) => {
            if (trans2.date < trans1.date) {
                return -1;
            } else if (trans2.date > trans1.date) {
                return 1;
            } else {
                return 0;
            }
        },
        text: 'Most recent transactions',
    },
    {
        val: (trans1: Transaction, trans2: Transaction) => {
            if (trans2.date < trans1.date) {
                return 1;
            } else if (trans2.date > trans1.date) {
                return -1;
            } else {
                return 0;
            }
        },
        text: 'Date in ascending',
    },
    {
        val: (trans1: Transaction, trans2: Transaction) => {
            if (trans2.amount < trans1.amount) {
                return 1;
            } else if (trans2.amount > trans1.amount) {
                return -1;
            } else {
                return 0;
            }
        },
        text: 'Least of amount',
    },
];

export default function Transactions() {
    const classes = useStyles();
    const dispatch = useDispatch<
        (a: Action | Omit<Action, 'payload'>) => Action | Omit<Action, 'payload'>
    >();
    const trigger = useScrollTrigger({ threshold: 48 });
    const yearMenuState = usePopupState({ variant: 'popover', popupId: 'yearMenu' });
    const sortingMenuState = usePopupState({ variant: 'popover', popupId: 'sortingMenu' });

    const [judgingTransaction, setJudgingTransaction] = useState<{
        item?: Transaction;
        mode: 'delete' | 'edit' | 'add' | 'view';
    } | null>(null);
    const [showFilterDialog, setShowFilterDialog] = useState(false);

    /**
     * Get data from store
     */
    const transactions = useSelector<AppRootState, Transaction[]>(
        (state) => state.transaction.list
    );
    const year = useSelector<AppRootState, number>((state) => state.transaction.year);
    const years = useSelector<AppRootState, number[]>((state) => state.transaction.years);
    const dateFrom = useSelector<AppRootState, Date | null>(
        (state) => state.transactionFilter.dateFrom.value
    );
    const dateTo = useSelector<AppRootState, Date | null>(
        (state) => state.transactionFilter.dateTo.value
    );
    const amountFrom = useSelector<AppRootState, number | null>(
        (state) => state.transactionFilter.amountFrom.value
    );
    const amountTo = useSelector<AppRootState, number | null>(
        (state) => state.transactionFilter.amountTo.value
    );
    const showIncome = useSelector<AppRootState, boolean>(
        (state) => state.transactionFilter.income.value
    );
    const showExpense = useSelector<AppRootState, boolean>(
        (state) => state.transactionFilter.expense.value
    );
    const allowDateFilter = useSelector<AppRootState, boolean>(
        (state) => state.transactionFilter.enableDateFilter.value
    );
    const allowAmountFilter = useSelector<AppRootState, boolean>(
        (state) => state.transactionFilter.enableAmountFilter.value
    );
    const sortingFunction = useSelector<AppRootState, SortingFunction | null>(
        (state) => state.transaction.sortingFunction
    );

    /**
     * Transaction list after apply filtering and sorting.
     */
    const filteredTransactions = useTransactions({
        transactions,
        dateFrom,
        dateTo,
        amountFrom,
        amountTo,
        showIncome,
        showExpense,
        allowDateFilter,
        allowAmountFilter,
        sortingFunction,
    });
    const categories = useCategories(transactions);

    const selectYear = (year: number) => () => {
        yearMenuState.close();
        dispatch({ type: 'Reducer: set year', payload: year });
    };
    const selectSorting = (payload: SortingFunction) => () => {
        sortingMenuState.close();
        dispatch({
            type: 'Reducer: save sorting function',
            payload,
        });
    };

    /**
     * Load transactions by year
     */
    useEffect(() => {
        dispatch({ type: 'Saga: fetch transactions', payload: year });
    }, [year, dispatch]);

    let el = null;
    if (judgingTransaction) {
        if (judgingTransaction.mode === 'edit' && judgingTransaction.item) {
            el = (
                <Container maxWidth="sm">
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography
                                color="primary"
                                variant="h6"
                                component="h2"
                                classes={{ root: classes.formTitleRoot }}>
                                Edit Transaction
                            </Typography>
                            <TransactionForm
                                id={judgingTransaction.item.id}
                                amount={judgingTransaction.item.amount}
                                transactionType={judgingTransaction.item.transactionType}
                                date={judgingTransaction.item.date}
                                description={judgingTransaction.item.description}
                                category={judgingTransaction.item.category}
                                categories={categories}
                                onSubmit={(data) => {
                                    if (data.id) {
                                        dispatch(transactionUpdatingRequest(data));
                                    }
                                    setJudgingTransaction(null);
                                }}
                                onCancel={() => setJudgingTransaction(null)}
                            />
                        </Grid>
                    </Grid>
                </Container>
            );
        } else if (judgingTransaction.mode === 'add') {
            el = (
                <Container maxWidth="sm">
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography
                                color="primary"
                                variant="h6"
                                component="h2"
                                classes={{ root: classes.formTitleRoot }}>
                                Add Transaction
                            </Typography>
                            <TransactionForm
                                categories={categories}
                                onSubmit={(data) => {
                                    dispatch(transactionCreatingRequest(data));
                                    setJudgingTransaction(null);
                                }}
                                onCancel={() => setJudgingTransaction(null)}
                            />
                        </Grid>
                    </Grid>
                </Container>
            );
        }
    } else {
        el = (
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <TransactionList
                            data={filteredTransactions}
                            totalRows={filteredTransactions.length}
                            onEdit={(item) =>
                                setJudgingTransaction({
                                    item,
                                    mode: 'edit',
                                })
                            }
                            onDelete={(item) => {
                                setJudgingTransaction({
                                    item,
                                    mode: 'delete',
                                });
                            }}
                            onDetail={(item) => {
                                setJudgingTransaction({
                                    item,
                                    mode: 'view',
                                });
                            }}
                        />
                        <Fab
                            size="small"
                            color="secondary"
                            aria-label="add"
                            className={classes.fab}
                            onClick={() =>
                                setJudgingTransaction({
                                    mode: 'add',
                                })
                            }>
                            <AddRoundedIcon />
                        </Fab>
                        <Fade in={trigger}>
                            <Fab
                                aria-label="go to top"
                                className={classes.fabUp}
                                size="small"
                                onClick={() => {
                                    document.body.scrollTop = 0;
                                    document.documentElement.scrollTop = 0;
                                }}
                                variant="extended">
                                <ExpandLessRoundedIcon />
                                top
                            </Fab>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    return (
        <>
            <Box boxShadow={trigger ? 3 : 0} className={classes.pageHead}>
                <div className={classes.padding} />
                <div className={classes.pageHeadTitle}>
                    <Typography variant="h6" component="h1">
                        Transactions
                    </Typography>
                </div>
                <div className={classes.pageSubMenu}>
                    <Typography {...bindTrigger(yearMenuState)} role="menu">
                        <span>{year}</span>
                        <ArrowDropDownIcon />
                    </Typography>
                    <Menu {...bindMenu(yearMenuState)}>
                        {years.map((it) => (
                            <MenuItem key={it} selected={year === it} onClick={selectYear(it)}>
                                {it}
                            </MenuItem>
                        ))}
                    </Menu>
                    <div className={classes.grow} />
                    <IconButton
                        aria-label="sort transactions"
                        title="sort transactions"
                        {...bindTrigger(sortingMenuState)}
                        color="inherit">
                        <SortingIcon />
                    </IconButton>
                    <Menu {...bindMenu(sortingMenuState)}>
                        {listOfSorting.map((it) => (
                            <MenuItem
                                key={it.text}
                                selected={sortingFunction === it.val}
                                onClick={selectSorting(it.val)}>
                                {it.text}
                            </MenuItem>
                        ))}
                    </Menu>
                    <IconButton
                        aria-label="filter transactions"
                        title="filter transactions"
                        onClick={() => setShowFilterDialog(true)}
                        color="inherit">
                        <Badge
                            variant="dot"
                            invisible={
                                showIncome && showExpense && !allowAmountFilter && !allowDateFilter
                            }
                            color="secondary">
                            <DatabaseSearchIcon />
                        </Badge>
                    </IconButton>
                </div>
            </Box>
            {el}
            <DeletingDialog
                open={Boolean(judgingTransaction && judgingTransaction.mode === 'delete')}
                onClose={() => setJudgingTransaction(null)}
                onDelete={() => {
                    if (judgingTransaction && judgingTransaction.item) {
                        dispatch(transactionDeletingRequest(judgingTransaction.item.id));
                    }
                    setJudgingTransaction(null);
                }}
            />
            <TransDetailDialog
                transaction={judgingTransaction && judgingTransaction.item}
                onClose={() => setJudgingTransaction(null)}
                onEdit={(item) => {
                    setJudgingTransaction({ item, mode: 'edit' });
                }}
                onDelete={(item) => {
                    setJudgingTransaction({ item, mode: 'delete' });
                }}
            />
            <FilterDialog
                open={showFilterDialog}
                dateFrom={dateFrom}
                dateTo={dateTo}
                amountFrom={amountFrom}
                amountTo={amountTo}
                showIncome={showIncome}
                showExpense={showExpense}
                allowAmountFilter={allowAmountFilter}
                allowDateFilter={allowDateFilter}
                dispatch={dispatch}
                onReset={() => dispatch({ type: 'Reducer: reset transaction filter' })}
                onClose={() => {
                    setShowFilterDialog(false);
                }}
            />
        </>
    );
}
