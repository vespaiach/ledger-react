/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { call, put, take, takeEvery } from 'redux-saga/effects';

import { safeCall } from '../utils/saga';
import { setToken } from '../utils/token';
import { signout, ping, fetchTransactions, syncTransactions, signin } from './remote';

/**
 * Ping server to see if user's session is still valid
 */
export function* pingRequest() {
    yield put({ type: 'Reducer - app: set app loading on' });
    const response = yield safeCall(call(ping));
    yield put({ type: 'Reducer - app: set app loading off' });

    if (response.ok) {
        yield put({ type: 'Reducer - app: authorized' });
    } else {
        yield put({ type: 'Reducer - app: unauthorized' });
    }
}

/**
 * Fetch a batch of transaction records by year
 */
export function* fetchTransactionRequest(year) {
    yield put({ type: 'Reducer - trans: set fetch loading on' });
    const response = yield safeCall(call(fetchTransactions, year));
    yield put({ type: 'Reducer - trans: set fetch loading off' });

    if (response.ok) {
        yield put({
            type: 'Reducer - trans: update status',
            payload: 'loaded',
        });
        yield put({
            type: 'Reducer - trans: store transactions',
            payload: response.data,
        });
    } else {
        yield put({
            type: 'Reducer - trans: update status',
            payload: 'fail',
        });
        yield put({
            type: 'Reducer - app: set flash message',
            payload: {
                severity: 'error',
                message: `${response.data.message} (${response.data.code})`,
            },
        });
    }
}

/**
 *
 * Create and update transactions in a batch
 *
 * @param {*} data
 * [
 *      {
 *          id: number | null,
 *          amount: number
 *          date: date in iso format
 *          description: string
 *          transactionType: in | ex
 *      }
 *      ...
 * ]
 *
 */
export function* syncTransactionRequest(data) {
    yield put({ type: 'Reducer - trans: set sync loading on' });
    const response = yield safeCall(call(syncTransactions, data));
    yield put({ type: 'Reducer - trans: set sync loading off' });

    if (response.ok) {
        yield put({
            type: 'Reducer - trans: update transactions',
            payload: response.data,
        });
        yield put({
            type: 'Reducer - app: set flash message',
            payload: {
                severity: 'success',
                message: `Synchronized succefully`,
            },
        });
    } else {
        yield put({
            type: 'Reducer - app: set flash message',
            payload: {
                severity: 'error',
                message: `${response.data.message} (${response.data.code})`,
            },
        });
    }
}

/**
 *
 * Signin request.
 *  - success: save token to localstorage and return true
 *  - fail   : show error flash message and return false
 *
 * @param {*} data
 * {
 *      email: string,
 *      password: string,
 *      remember: boolean
 * }
 */
export function* signinRequest(data) {
    yield put({ type: 'Reducer - app: set signin loading on' });
    const response = yield safeCall(call(signin, data));
    yield put({ type: 'Reducer - app: set signin loading off' });

    if (response.ok) {
        const result = yield call(setToken, response.data.token);
        if (result) {
            return true;
        } else {
            yield put({
                type: 'Reducer - app: set flash message',
                payload: {
                    severity: 'error',
                    message: "Couldn't save token to local storage",
                },
            });
            return false;
        }
    } else {
        yield put({
            type: 'Reducer - app: set flash message',
            payload: {
                severity: 'error',
                message: `${response.data.message} (${response.data.code})`,
            },
        });
        return false;
    }
}

/**
 * Sign out request
 */
export function* signoutRequest() {
    yield safeCall(call(signout));
    yield put({ type: 'Reducer - app: unauthorized' });
}

export function* watchPingRequest() {
    yield takeEvery('Saga: ping server', pingRequest);
}

export function* watchFetchRequest() {
    while (true) {
        const { payload: year } = yield take('Saga: fetch transactions');
        yield fetchTransactionRequest(year);
    }
}

export function* watchSyncRequest() {
    while (true) {
        const { payload } = yield take('Saga: sync transactions');
        yield syncTransactionRequest(payload);
    }
}

export function* watchSigninRequest() {
    while (true) {
        const { payload } = yield take('Saga: signin');
        yield signinRequest(payload);
    }
}

export function* watchSignoutRequest() {
    while (true) {
        yield take('Saga: signout');
        yield signinRequest();
    }
}
