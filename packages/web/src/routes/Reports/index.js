import { Box, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ArrowDropDown as ArrowDropDownIcon,
    DateRangeRounded as DateRangeRoundedIcon,
} from '@material-ui/icons/';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import Chart from './Chart';
import TransactionTable from './Table';
import PageTitle from '../../components/PageTitle';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthName } from '../../utils/format';
import MonthMenu from './MonthMenu';
import SkeletonPage from './SkeletonPage';

const emptyArray = [];

const useStyles = makeStyles((theme) => ({
    incomeTableRoot: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
        },
    },
    btnMonthRoot: {
        marginTop: -3,
    },
    typoTitle: {
        flexGrow: 1,
    },
}));

export default function Report() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [btnMonthRef, setBtnMonthRef] = useState(null);
    const [yearMonth, setYearMonth] = useState(() => {
        const dt = new Date();
        const year = dt.getFullYear();
        const month = dt.getMonth() + 1;
        return { year, month };
    });
    const popupState = usePopupState({ variant: 'popover', popupId: 'settingMenu' });

    useEffect(() => {
        dispatch({ type: 'Saga: get monthly sum of categories', payload: yearMonth });
    }, [dispatch, yearMonth]);

    const status = useSelector((state) => state.monthly.status);
    const months = useSelector((state) => state.monthly.months);
    const incomes = useSelector((state) => state.monthly.incomes);
    const expenses = useSelector((state) => state.monthly.expenses);

    const incomeTransactions = incomes[`${yearMonth.year}-${yearMonth.month}`] || emptyArray;
    const expenseTransactions = expenses[`${yearMonth.year}-${yearMonth.month}`] || emptyArray;

    const incomeTotal = useMemo(() => incomeTransactions.reduce((acc, i) => (acc += i.total), 0), [
        incomeTransactions,
    ]);
    const expenseTotal = useMemo(
        () => expenseTransactions.reduce((acc, e) => (acc += e.total), 0),
        [expenseTransactions]
    );

    let el = null;
    if (status === '' || status === 'loading') {
        el = <SkeletonPage />;
    } else {
        el = (
            <>
                <MonthMenu
                    open={Boolean(btnMonthRef)}
                    months={months}
                    anchorEl={btnMonthRef}
                    onClose={() => setBtnMonthRef(null)}
                    onSelect={(dt) => {
                        setYearMonth({ year: dt.year, month: dt.month });
                        setBtnMonthRef(null);
                    }}
                />
                <Grid container spacing={3} alignItems="stretch">
                    <Grid item xs={12} sm={12} md={4}>
                        <Chart height={280} incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TransactionTable
                            className={classes.incomeTableRoot}
                            caption={
                                incomeTransactions.length > 0
                                    ? 'Total income by categories'
                                    : 'No income transaction in this month'
                            }
                            transactions={incomeTransactions}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TransactionTable
                            caption={
                                expenseTransactions.length > 0
                                    ? 'Total expense by categories'
                                    : 'No expense transaction in this month'
                            }
                            transactions={expenseTransactions}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }

    return (
        <>
            <Box boxShadow={3} className={classes.pageHead}>
                <div className={classes.padding} />
                <div className={classes.pageHeadTitle}>
                    <Typography variant="h6" component="h1">
                        Monthly Reports
                    </Typography>
                </div>
                <div className={classes.pageSubMenu}>
                    <Typography {...bindTrigger(popupState)} role="menu">
                        <span>{`${yearMonth.month}, ${yearMonth.year}`}</span>
                        <ArrowDropDownIcon />
                    </Typography>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem
                            selected={report === 'monthly'}
                            onClick={() => {
                                setReport('monthly');
                                popupState.close();
                            }}>
                            Monthly
                        </MenuItem>
                        <MenuItem
                            selected={report === 'monthly'}
                            onClick={() => {
                                setReport('annually');
                                popupState.close();
                            }}>
                            Annually
                        </MenuItem>
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
            {el}
        </>
    );
}
