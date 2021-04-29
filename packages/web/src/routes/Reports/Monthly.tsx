/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Chart from './Chart';
import TransactionTable from './Table';
import { useMonthlyReport } from './hooks';
import { Transaction } from '../../types';

interface ReportProps {
  transactions: Transaction[];
  year: number;
  month: number;
}

export default function Report({ transactions, year, month }: ReportProps) {
  const dispatch = useDispatch();
  const data = useMonthlyReport({ transactions, year, month });

  useEffect(() => {
    dispatch({ type: 'Saga: fetch transactions', payload: year });
  }, [dispatch, year]);

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid item xs={12} sm={12} md={4}>
        <Chart height={280} incomeTotal={data.income.total} expenseTotal={data.expense.total} />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TransactionTable
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
  );
}
