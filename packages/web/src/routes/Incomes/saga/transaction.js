import axios from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';
import { safeCall } from '../../../utils/saga';

export function* watchSaveIncomesRequest() {
    yield takeEvery('Saga - in: save income transation', function* ({ payload }) {
        const { id, ...data } = payload;
        let url = '/incomes';
        let api = axios.post;
        if (id) {
            url = `/incomes/${id}`;
            api = axios.put;
        }

        yield put({ type: 'Reducer - inTrans: set saving on' });
        const [result] = yield safeCall(call(api, url, { ...data }));
        yield put({ type: 'Reducer - inTrans: set saving off' });

        if (result) {
            yield put({ type: 'Reducer - inTrans: close form dialog' });
            yield put({ type: 'Reducer - inTrans: clear all income data' });
            yield put({
                type: 'Reducer - app: set flash message',
                payload: { severity: 'success', message: 'Save the transaction successfully' },
            });
            yield put({ type: 'Reducer - ins: clear list of incomes' });
        }
    });
}
