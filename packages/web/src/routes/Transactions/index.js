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
import {
    AddRounded as AddRoundedIcon,
    ArrowDropDown as ArrowDropDownIcon,
    ExpandLessRounded as ExpandLessRoundedIcon,
} from '@material-ui/icons';

import TransactionList from '../../components/TransationList';
import { useCategories, useTransactions } from './hooks';
import TransactionForm from '../../components/TransactionForm';
import TransDetails from './TransDetails';
import DeletingDialog from './DeletingDialog';
import DatabaseSearchIcon from '../../components/Icons/DatabaseSearch';
import SortingIcon from '../../components/Icons/Sorting';
import FilterDialog from './FilterDialog';

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

const listOfSorting = [
    {
        val: (trans1, trans2) => {
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
        val: (trans1, trans2) => {
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
        val: (trans1, trans2) => {
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
        val: (trans1, trans2) => {
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
    const dispatch = useDispatch();
    const trigger = useScrollTrigger({ threshold: 48 });

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [detail, setDetail] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [showFilterDialog, setShowFilterDialog] = useState(false);

    const rawTransactions = useSelector((state) => state.transaction.list);
    const year = useSelector((state) => state.transaction.year);
    const listOfYear = useSelector((state) => state.transaction.listOfYear);
    const filter = useSelector((state) => state.transaction.filter);
    const sortingFn = useSelector((state) => state.transaction.sortingFn);

    /**
     * Transaction list after apply filtering
     */
    const filteredTransactions = useTransactions({
        data: rawTransactions,
        filter,
        sortingFn,
    });
    const categories = useCategories({ data: rawTransactions });
    const selectYear = (year) => () => {
        setMenuAnchorEl(null);
        dispatch({ type: 'Reducer: set year', payload: year });
    };
    const selectSorting = (payload) => () => {
        setSortAnchorEl(null);
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
    if (editing) {
        el = (
            <>
                <Typography
                    color="primary"
                    variant="h6"
                    component="h2"
                    classes={{ root: classes.formTitleRoot }}>
                    {editing.id ? 'Edit Transaction' : 'Add Transaction'}
                </Typography>
                <TransactionForm
                    id={editing.id}
                    amount={editing.amount}
                    transactionType={editing.transactionType}
                    date={editing.date}
                    description={editing.description}
                    category={editing.category}
                    categories={categories}
                    onSubmit={(data) => {
                        dispatch({
                            type: 'Saga: sync transactions',
                            payload: data,
                        });
                        setEditing(null);
                    }}
                    onCancel={() => setEditing(null)}
                />
            </>
        );
    } else {
        el = (
            <>
                <TransactionList
                    data={filteredTransactions}
                    totalRows={filteredTransactions.length}
                    onEdit={(item) => {
                        setEditing(item);
                    }}
                    onDelete={(item) => {
                        setDeleting(item);
                    }}
                    onDetail={(item) => {
                        setDetail(item);
                    }}
                />
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    className={classes.fab}
                    onClick={() => setEditing({})}>
                    <AddRoundedIcon />
                </Fab>
            </>
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
                    <Typography onClick={(evt) => setMenuAnchorEl(evt.currentTarget)} role="menu">
                        <span>{year}</span>
                        <ArrowDropDownIcon />
                    </Typography>
                    <Menu
                        anchorEl={menuAnchorEl}
                        keepMounted
                        open={Boolean(menuAnchorEl)}
                        onClose={() => setMenuAnchorEl(null)}>
                        {listOfYear.map((it) => (
                            <MenuItem key={it} selected={year === it} onClick={selectYear(it)}>
                                {it}
                            </MenuItem>
                        ))}
                    </Menu>
                    <div className={classes.grow} />
                    <IconButton
                        aria-label="sort transactions"
                        title="sort transactions"
                        onClick={(evt) => setSortAnchorEl(evt.currentTarget)}
                        color="inherit">
                        <SortingIcon />
                    </IconButton>
                    <Menu
                        anchorEl={sortAnchorEl}
                        keepMounted
                        open={Boolean(sortAnchorEl)}
                        onClose={() => setSortAnchorEl(null)}>
                        {listOfSorting.map((it) => (
                            <MenuItem
                                key={it.val}
                                selected={sortingFn === it.val}
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
                                filter.income &&
                                filter.expense &&
                                !filter.enableAmountFilter &&
                                !filter.enableDateFilter
                            }
                            color="secondary">
                            <DatabaseSearchIcon />
                        </Badge>
                    </IconButton>
                </div>
            </Box>
            <Container>
                <Grid container>
                    <Grid item xs={12} classes={{ root: classes.gridRowRoot }}>
                        {el}
                        <DeletingDialog
                            open={Boolean(deleting)}
                            onClose={() => setDeleting(null)}
                            onDelete={() => {
                                dispatch({
                                    type: 'Saga: delete transactions',
                                    payload: deleting.id,
                                });
                                setDeleting(null);
                            }}
                        />
                        <TransDetails
                            detail={detail}
                            onClose={() => setDetail(null)}
                            onEdit={(item) => {
                                setDetail(null);
                                setEditing(item);
                            }}
                            onDelete={(item) => {
                                setDetail(null);
                                setDeleting(item);
                            }}
                        />
                        <FilterDialog
                            open={showFilterDialog}
                            filter={filter}
                            dispatch={dispatch}
                            onReset={() => dispatch({ type: 'Reducer: reset transaction filter' })}
                            onClose={() => {
                                setShowFilterDialog(false);
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
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
        </>
    );
}
