import { call, takeEvery, put } from 'redux-saga/effects';

import { safeCall } from '../../utils/saga';
import http from '../../utils/http';

export function* watchSaveIncomesRequest() {
    yield takeEvery('Saga: save income transation', function* ({ payload }) {
        const { id, ...body } = payload;
        let url = '/incomes';
        let api = http.post;
        if (id) {
            url = `/incomes/${id}`;
            api = http.put;
        }

        yield put({ type: 'Reducer - app: set app loading on' });
        yield put({ type: 'Reducer - inForm: set status to start' });

        const response = yield safeCall(call(api, { ep: url, body }));

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield put({ type: 'Reducer - inForm: set status to done' });
            yield put({
                type: 'Reducer - app: set flash message',
                payload: {
                    severity: 'success',
                    message: 'Created income transaction successfully',
                },
            });
            yield put({ type: 'Reducer - ins: clear list of incomes' });
        } else {
            yield put({ type: 'Reducer - inForm: set errors', payload: response });
            yield put({ type: 'Reducer - inForm: set status to fail' });
        }
    });
}
