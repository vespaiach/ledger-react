import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { safeCall } from '../../../utils/saga';

export function* watchFetchIncomeCategories() {
    yield takeLatest('Saga: fetch incomes categories', function* () {
        const [result, response] = yield safeCall(call(axios.get, '/incomes_categories'));

        if (result) {
            yield put({
                type: 'Reducer - inCates: save list of categories',
                payload: response.data,
            });
        }
    });
}
