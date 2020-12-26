import axios from 'axios';
import { push } from 'connected-react-router';
import { take, call, put, takeLatest, all, takeEvery, spawn } from 'redux-saga/effects';

import { safeCall } from '../../../utils/saga';

export function* logout() {
    yield safeCall(call(axios.get, '/logout'));
}

export function* watchMeForceRelogin() {
    yield takeEvery('Saga: force relogin', function* () {
        yield spawn(logout);

        yield put(push('/login'));
    });
}

export function* watchLoginVerify() {
    while (true) {
        yield take('Saga: verify login');

        yield put({ type: 'Reducer - me: set loading on' });

        const [result, response] = yield safeCall(call(axios.get, '/me'));

        if (result) {
            yield all([
                put({ type: 'Reducer - me: set id', payload: response.data.id }),
                put({ type: 'Reducer - me: set email', payload: response.data.email }),
                put({ type: 'Reducer - me: set name', payload: response.data.name }),
                put({ type: 'Reducer - me: set loading off' }),
            ]);
        } else {
            yield put({ type: 'Reducer - me: set loading off' });
        }
    }
}

export function* watchMeLogin() {
    yield takeLatest('Saga: login', function* ({ payload: { email, password, remember } }) {
        yield put({ type: 'Reducer - me: set loading on' });
        debugger;

        const [result, response] = yield safeCall(call(axios.post, '/login', { email, password, remember }));

        yield put({ type: 'Reducer - me: set loading off' });

        if (result) {
            yield all([
                put({ type: 'Reducer - me: set id', payload: response.id }),
                put({ type: 'Reducer - me: set email', payload: response.email }),
                put({ type: 'Reducer - me: set name', payload: response.name }),
            ]);
            yield put(push('/portal'));
        }
    });
}
