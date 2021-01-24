import { call, put, take } from 'redux-saga/effects';

import { safeCall } from '../../utils/saga';
import http from '../../utils/http';

export function* watchSubmitRecoveryForm() {
    while (true) {
        const {
            payload: { email },
        } = yield take('Saga: submit recovery form');

        yield put({ type: 'Reducer - app: set app loading on' });

        const response = yield safeCall(call(http.post, { ep: '/recovery', body: { email } }));

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield put({ type: 'Reducer - recovery: set done' });
        } else {
            yield put({ type: 'Reducer - recovery: set errors', payload: response });
        }
    }
}

export function* watchFetchRecoveryInfo() {
    while (true) {
        const { payload: token } = yield take('Saga: get recovery info');

        yield put({ type: 'Reducer - app: set app loading on' });

        const response = yield safeCall(call(http.get, { ep: `/recovery/${token}` }));

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield put({ type: 'Reducer - recovery: set email', payload: response.data.email });
        } else {
            yield put({ type: 'Reducer - recovery: set errors', payload: response });
        }
    }
}
