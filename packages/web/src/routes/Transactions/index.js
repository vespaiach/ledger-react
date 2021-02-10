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
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';

import TransactionList from '../../components/TransationList';
import { useCategories, useTransactions } from './hooks';
import TransactionForm from '../../components/TransactionForm';
import TransDetails from './TransDetails';
import DeletingDialog from './DeletingDialog';
import DatabaseSearchIcon from '../../components/Icons/DatabaseSearch';
import SortingIcon from '../../components/Icons/Sorting';

const useStyles = makeStyles((theme) => ({
    formTitleRoot: {
        margin: theme.spacing(2, 0, 1, 0),
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
}));

const currentYear = new Date().getFullYear();

export default function Transactions() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const trigger = useScrollTrigger({ threshold: 48 });

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [detail, setDetail] = useState(null);
    const [year, setYear] = useState(currentYear);

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
    const categories = useCategories({ data: rawTransactions });
    const selectYear = (year) => () => {
        setMenuAnchorEl(null);
        setYear(year);
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
                    date={editing.date}
                    description={editing.description}
                    category={editing.category}
                    categories={categories}
                    onSubmit={(data) =>
                        dispatch({ type: 'Saga: sync transactions', payload: data })
                    }
                    onCancel={() => setEditing(null)}
                />
            </>
        );
    } else {
        el = (
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
                        <MenuItem onClick={selectYear(2021)}>2021</MenuItem>
                        <MenuItem onClick={selectYear(2020)}>2020</MenuItem>
                        <MenuItem onClick={selectYear(2019)}>2019</MenuItem>
                        <MenuItem onClick={selectYear(2018)}>2018</MenuItem>
                    </Menu>
                    <div className={classes.grow} />
                    <IconButton
                        aria-label="sort transactions"
                        title="sort transactions"
                        color="inherit">
                        <SortingIcon />
                    </IconButton>
                    <IconButton
                        aria-label="search transactions"
                        title="search transactions"
                        color="inherit">
                        <DatabaseSearchIcon />
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
                            onDelete={() =>
                                dispatch({ type: 'Saga: sync transactions', payload: deleting.id })
                            }
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
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
