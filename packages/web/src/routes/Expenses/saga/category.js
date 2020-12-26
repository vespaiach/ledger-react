import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { safeCall } from '../../../utils/saga';

export function* watchFetchExpenseCategories() {
    yield takeLatest('Saga: fetch expenses categories', function* () {
        const [result, response] = yield safeCall(call(axios.get, '/expenses_categories'));

        if (result) {
            yield put({
                type: 'Reducer - exCates: save list of categories',
                payload: response.data,
            });
        }
    });
}
