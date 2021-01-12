import {
    Grid,
    Typography,
    useMediaQuery,
    TableContainer,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";

import InMonthTable from "./InMonthTable.js";
import MonthsTable from "./MonthsTable";
import ChartInMonth from "./ChartInMonth";
import { getMonthName } from "../../utils/format";

const filterByMonth = (month) => (acc, it) => {
    if (it.month === month) {
        acc.push({ category: it.category, total: it.total });
    }
    return acc;
};
const sumByMonth = (month) => (acc, it) => {
    if (it.month === month) {
        acc += parseFloat(it.total);
    }
    return acc;
};

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        marginTop: theme.spacing(1),
    },
}));

export default function Dashboard() {
    const expenseInMonthRef = useRef(null);
    const incomeInMonthRef = useRef(null);
    const [chartHeight, setChartHeight] = useState(0);
    const classes = useStyles();
    const mobileSize = useMediaQuery("(max-width:768px)");
    const dispatch = useDispatch();

    const dt = new Date();
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;

    const statisticExpensesCategories = useSelector(
        (state) => state.statistics.expenses.categories
    );
    const statisticIncomesCategories = useSelector(
        (state) => state.statistics.incomes.categories
    );
    const statisticExpensesMonths = useSelector(
        (state) => state.statistics.expenses.months
    );
    const statisticIncomesMonths = useSelector(
        (state) => state.statistics.incomes.months
    );

    const sumExpenseByCategoriesInMonth = useMemo(
        () => statisticExpensesCategories.reduce(filterByMonth(month), []),
        [month, statisticExpensesCategories]
    );
    const totalExpensesInMonth = useMemo(
        () => statisticExpensesCategories.reduce(sumByMonth(month), 0),
        [month, statisticExpensesCategories]
    );
    const sumIncomeByCategoriesInMonth = useMemo(
        () => statisticIncomesCategories.reduce(filterByMonth(month), []),
        [month, statisticIncomesCategories]
    );
    const totalIncomesInMonth = useMemo(
        () => statisticIncomesCategories.reduce(sumByMonth(month), 0),
        [month, statisticIncomesCategories]
    );

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        setChartHeight(
            expenseInMonthRef.current.offsetHeight >
                incomeInMonthRef.current.offsetHeight
                ? expenseInMonthRef.current.offsetHeight
                : incomeInMonthRef.current.offsetHeight
        );
    });

    useEffect(() => {
        dispatch({
            type: "Request: get statistics for dashboard",
            payload: year,
        });
    }, [dispatch, year]);

    return (
        <Grid container spacing={4} classes={{ root: classes.gridRoot }}>
            <Grid item xs={12}>
                <Typography variant='h4' color='primary'>
                    Balance in {getMonthName(month)}
                </Typography>
            </Grid>
            <Grid item sm={12} md={4}>
                <ChartInMonth
                    expenses={totalExpensesInMonth}
                    incomes={totalIncomesInMonth}
                    height={chartHeight}
                    month={month}
                />
            </Grid>
            <Grid item sm={12} md={4}>
                <TableContainer>
                    <InMonthTable
                        rows={sumExpenseByCategoriesInMonth}
                        title='Expenses'
                        tableRef={expenseInMonthRef}
                    />
                </TableContainer>
            </Grid>
            <Grid item sm={12} md={4}>
                <TableContainer>
                    <InMonthTable
                        rows={sumIncomeByCategoriesInMonth}
                        title='Income'
                        tableRef={incomeInMonthRef}
                    />
                </TableContainer>
            </Grid>

            <Grid item xs={12}>
                <MonthsTable
                    expenses={statisticExpensesMonths}
                    incomes={statisticIncomesMonths}
                    direction={mobileSize ? "vertical" : "horizontal"}
                />
            </Grid>
        </Grid>
    );
}
