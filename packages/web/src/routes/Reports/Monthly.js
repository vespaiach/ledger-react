/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { Box, Container, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons/';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import { Link } from 'react-router-dom';

import Chart from './Chart';
import TransactionTable from './Table';
import { getMonthName } from '../../utils/format';
import BarChartIcon from '../../components/Icons/BarChart';
import LineChartIcon from '../../components/Icons/LineChart';
import { useMonthlyReport } from './hooks';

const useStyles = makeStyles((theme) => ({
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
    pageContainer: {
        marginTop: theme.spacing(4),
    },
}));

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function Report() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const monthPopupState = usePopupState({ variant: 'popover', popupId: 'monthMenu' });
    const yearPopupState = usePopupState({ variant: 'popover', popupId: 'yearMenu' });

    const listOfYear = useSelector((state) => state.transaction.listOfYear);
    const transactions = useSelector((state) => state.transaction.list);
    const [month, setMonth] = useState(() => {
        return new Date().getMonth();
    });
    const [year, setYear] = useState(() => {
        return new Date().getFullYear();
    });
    const data = useMonthlyReport({ transactions, year, month });

    useEffect(() => {
        dispatch({ type: 'Saga: fetch transactions', payload: year });
    }, [dispatch, year]);

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
                    <Typography {...bindTrigger(monthPopupState)} role="menu">
                        <span>{getMonthName(month)}</span>
                        <ArrowDropDownIcon />
                    </Typography>
                    <Menu {...bindMenu(monthPopupState)}>
                        {months.map((m) => (
                            <MenuItem
                                key={m}
                                selected={month === m}
                                onClick={() => {
                                    setMonth(m);
                                    monthPopupState.close();
                                }}>
                                {getMonthName(m)}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Typography {...bindTrigger(yearPopupState)} role="menu">
                        <span>{year}</span>
                        <ArrowDropDownIcon />
                    </Typography>
                    <Menu {...bindMenu(yearPopupState)}>
                        {listOfYear.map((y) => (
                            <MenuItem
                                key={y}
                                selected={year === y}
                                onClick={() => {
                                    setYear(y);
                                    yearPopupState.close();
                                }}>
                                {y}
                            </MenuItem>
                        ))}
                    </Menu>
                    <div className={classes.grow} />
                    <IconButton
                        aria-label="monthly reports"
                        title="monthly reports"
                        component={Link}
                        to="/reports/monthly"
                        color="inherit">
                        <BarChartIcon />
                    </IconButton>
                    <IconButton
                        aria-label="annually reports"
                        title="annually reports"
                        component={Link}
                        to="/reports/yearly"
                        color="inherit">
                        <LineChartIcon />
                    </IconButton>
                </div>
            </Box>
            <Container classes={{ root: classes.pageContainer }}>
                <Grid container spacing={3} alignItems="stretch">
                    <Grid item xs={12} sm={12} md={4}>
                        <Chart
                            height={280}
                            incomeTotal={data.income.total}
                            expenseTotal={data.expense.total}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TransactionTable
                            className={classes.incomeTableRoot}
                            caption={
                                data.income.list.length > 0
                                    ? 'Total income by categories'
                                    : 'No income transaction in this month'
                            }
                            transactions={data.income.list}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TransactionTable
                            caption={
                                data.expense.list.length > 0
                                    ? 'Total expense by categories'
                                    : 'No expense transaction in this month'
                            }
                            transactions={data.expense.list}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
