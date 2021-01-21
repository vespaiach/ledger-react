import { all, call, put, takeLatest } from 'redux-saga/effects';

import { safeCall } from '../utils/saga';
import { push } from 'connected-react-router';

import http from '../utils/http';

export function* watchFetchMeRequest() {
    yield takeLatest('Saga: fetch my account', function* () {
        yield put({ type: 'Reducer - app: set app loading on' });

        const response = yield safeCall(call(http.get, { ep: '/me' }));

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield all([put({ type: 'Reducer - app: set me', payload: response.data })]);
        } else {
            yield put(push('/signin'));
        }
    });
}
