/**
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import { push } from 'connected-react-router';
import { call, put, take, takeEvery } from 'redux-saga/effects';

import { safeCall } from '../../utils/saga';
import http from './http';

/**
 * Watching for ping requests to check if user has logined.
 * If the response is ok (200 - with body = 'pong'), user's session is still valid
 */
export function* watchPingRequest() {
    yield takeEvery('Saga: ping server', function* () {
        yield put({ type: 'Reducer - app: set app loading on' });
        const response = yield safeCall(call(http.get, '/ping'));
        yield put({ type: 'Reducer - app: set app loading off' });
        if (response.ok) {
            yield put({ type: 'Reducer - app: authorized' });
        } else {
            yield put({ type: 'Reducer - app: unauthorized' });
        }
    });
}

export function* watchFetchRequest() {
    while (true) {
        const { payload: year } = yield take('Saga: fetch transactions');
        yield put({ type: 'Reducer - app: set app loading on' });
        const response = yield safeCall(call(http.get, '/ping'));
        yield put({ type: 'Reducer - app: set app loading off' });
    }
}
