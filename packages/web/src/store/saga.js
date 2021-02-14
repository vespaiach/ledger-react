/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { select, call, put, take } from 'redux-saga/effects';

import { safeCall } from '../utils/saga';
import { clearToken, setToken } from '../utils/token';
import { signout, fetchTransactions, syncTransactions, signin } from './remote';

/**
 * Check if server return 401:
 *  - show login dialog
 *  - save current action to allow resuming after login
 */
export function* handleApiError(response, currentAction) {
    if (response.status === 401) {
        yield put({ type: 'Reducer: show sign in dialog', payload: currentAction });
    } else {
        yield put({
            type: 'Reducer: show app error',
            payload: `${response.data.message}`,
        });
    }
}

/**
 * Fetch a batch of transaction records by year
 */
export function* fetchTransactionRequest(year) {
    yield put({ type: 'Reducer: show app loading' });
    const response = yield safeCall(call(fetchTransactions, year));
    yield put({ type: 'Reducer: hide app loading' });

    if (response.ok) {
        yield put({
            type: 'Reducer: store transactions',
            payload: response.data,
        });
    } else {
        yield handleApiError(response, { type: 'Saga: fetch transactions', payload: year });
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
    const response = yield safeCall(call(syncTransactions, data));

    if (response.ok) {
        yield put({
            type: 'Reducer: update transactions',
            payload: response.data,
        });
    } else {
        yield handleApiError(response, { type: 'Saga: sync transactions', payload: data });
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
    yield put({ type: 'Reducer: show signin loading' });
    const response = yield safeCall(call(signin, data));
    yield put({ type: 'Reducer: hide signin loading' });

    if (response.ok) {
        const result = yield call(setToken, response.data.token);
        if (result) {
            const lastAction = yield select((state) => state.common.lastAction);
            if (lastAction) {
                yield put({ type: lastAction.type, payload: lastAction.payload });
            }
            yield put({ type: 'Reducer: close sign in dialog' });
            return true;
        } else {
            yield put({
                type: 'Reducer: show app error',
                payload: "Couldn't store token to local storage",
            });
            return false;
        }
    } else {
        yield put({
            type: 'Reducer: show app error',
            payload: `${response.data.message}`,
        });
        return false;
    }
}

/**
 * Sign out request
 */
export function* signoutRequest() {
    yield safeCall(call(signout));
    yield put({
        type: 'Reducer: show app success',
        payload: 'You have been signed out!',
    });
    return yield call(() => Promise.resolve(clearToken() || true));
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
        yield take('Saga: sign out');
        yield signoutRequest();
    }
}
