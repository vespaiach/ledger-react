import axios from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';
import { safeCall } from '../../../utils/saga';

export function* watchSaveExpensesRequest() {
    yield takeEvery('Saga - ex: save expense transation', function* ({ payload }) {
        const { id, ...data } = payload;
        let url = '/expenses';
        let api = axios.post;
        if (id) {
            url = `/expenses/${id}`;
            api = axios.put;
        }

        yield put({ type: 'Reducer - exTrans: set saving on' });
        const [result] = yield safeCall(call(api, url, { ...data }));
        yield put({ type: 'Reducer - exTrans: set saving off' });

        if (result) {
            yield put({ type: 'Reducer - exTrans: close form dialog' });
            yield put({ type: 'Reducer - exTrans: clear all expense data' });
            yield put({
                type: 'Reducer - app: set flash message',
                payload: { severity: 'success', message: 'Save the transaction successfully' },
            });
            yield put({ type: 'Reducer - exs: clear list of expenses' });
        }
    });
}
