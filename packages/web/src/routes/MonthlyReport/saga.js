import { put, call, takeEvery, select } from 'redux-saga/effects';

import { safeCall } from '../../utils/saga';
import http from '../../utils/http';

function* fetchLatestMonthRequest() {
    const response = yield safeCall(call(http.get, { ep: `/statistics/latest_month` }));
    if (response.ok) {
        yield put({
            type: 'Reducer - monthly: save the latest month',
            payload: response.data,
        });
    }
}

export function* watchFetchMonthlySumCategoriesRequest() {
    yield takeEvery(
        'Saga: get monthly sum of categories',
        function* ({ payload: { month, year } }) {
            yield put({ type: 'Reducer - monthly: set status loading' });

            const months = yield select((state) => state.monthly.months);
            if (!months) {
                yield fetchLatestMonthRequest();
            }

            const incomes = yield select((state) => state.monthly.incomes);
            const expenses = yield select((state) => state.monthly.expenses);
            const key = `${year}-${month}`;

            if (!incomes[key] || !expenses[key]) {
                const response = yield safeCall(
                    call(http.get, { ep: `/statistics/sum`, params: { year, month } })
                );

                if (response.ok) {
                    yield put({
                        type: 'Reducer - monthly: save month statistics',
                        payload: { data: response.data, year, month },
                    });
                }
            }

            yield put({ type: 'Reducer - monthly: set status loaded' });
        }
    );
}
