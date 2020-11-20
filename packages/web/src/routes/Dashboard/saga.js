import axios from 'axios';
import { call, put, take, all } from 'redux-saga/effects';

export function* getCategorySumByMonth({ year, type }) {
    try {
        const result = yield call(axios.get, '/statistics/sum', {
            params: { year, type },
        });
        yield put({
            type: 'Store: statistics - save categories amount by month',
            payload: { data: result.data, type },
        });
    } catch (e) {
        yield put({ type: 'Store: api request fail', payload: e });
    }
}

export function* getTotalAmountSumByMonth({ year, type }) {
    try {
        const result = yield call(axios.get, '/statistics/total', {
            params: { year, type },
        });
        yield put({
            type: 'Store: statistics - save total amount by month',
            payload: { data: result.data, type },
        });
    } catch (e) {
        yield put({ type: 'Store: api request fail', payload: e });
    }
}

/**
 * Get all statistics of expenses.
 * - Sum category by month
 * - Sum total amount by month
 */
export function* expensesStatisticsRequest() {
    while (true) {
        const { payload: year } = yield take(
            'Request: get expenses statistics'
        );

        yield put({ type: 'Store: statistics - fetching' });
        yield all([
            call(getCategorySumByMonth, { year, type: 'expenses' }),
            call(getTotalAmountSumByMonth, { year, type: 'expenses' }),
        ]);
        yield put({ type: 'Store: statistics - fetch done' });
    }
}

/**
 * Get statistics for dashboard.
 * - Sum category by month of expenses
 * - Sum category by month of incomes
 */
export function* dashboardStatisticsRequest() {
    while (true) {
        const { payload: year } = yield take(
            'Request: get statistics for dashboard'
        );
        yield put({ type: 'Store: statistics - fetching' });
        yield all([
            call(getCategorySumByMonth, { year, type: 'expenses' }),
            call(getCategorySumByMonth, { year, type: 'incomes' }),
            call(getTotalAmountSumByMonth, { year, type: 'expenses' }),
            call(getTotalAmountSumByMonth, { year, type: 'incomes' }),
        ]);
        yield put({ type: 'Store: statistics - fetch done' });
    }
}
