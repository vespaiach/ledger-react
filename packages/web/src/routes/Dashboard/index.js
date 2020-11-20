import {
    Grid,
    Typography,
    useMediaQuery,
    TableContainer,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import currency from 'currency.js';

import TotalList from './TotalList';
import MonthsTable from './MonthsTable';
import MasterPage from '../../components/MasterPage';

const filterByMonth = (month) => (acc, it) => {
    if (it.month === month) {
        acc.push({ category: it.category, total: currency(it.total).format() });
    }
    return acc;
};
const sumByMonth = (month) => (acc, it) => {
    if (it.month === month) {
        acc += it.total;
    }
    return acc;
};

export default function Dashboard() {
    const mobileSize = useMediaQuery('(max-width:768px)');
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

    useEffect(() => {
        dispatch({
            type: 'Request: get statistics for dashboard',
            payload: year,
        });
    }, [dispatch, year]);

    return (
        <MasterPage>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TableContainer>
                        <Typography>
                            Expenses (${totalExpensesInMonth})
                        </Typography>
                        <TotalList rows={sumExpenseByCategoriesInMonth} />
                    </TableContainer>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TableContainer>
                        <Typography>
                            Incomes (${totalIncomesInMonth})
                        </Typography>
                        <TotalList rows={sumIncomeByCategoriesInMonth} />
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <MonthsTable
                        expenses={statisticExpensesMonths}
                        incomes={statisticIncomesMonths}
                        direction={mobileSize ? 'vertical' : 'horizontal'}
                    />
                </Grid>
            </Grid>
        </MasterPage>
    );
}
