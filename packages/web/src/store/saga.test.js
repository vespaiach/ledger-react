import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import {
    fetchTransactionRequest,
    pingRequest,
    signinRequest,
    signoutRequest,
    syncTransactionRequest,
} from './saga';
import { fetchTransactions, ping, signin, signout, syncTransactions } from './remote';

describe('Test ping requests:', () => {
    test('ping server - return 200', () =>
        expectSaga(pingRequest)
            .provide([[matchers.call.fn(ping), { ok: true, data: 'pong' }]])
            .put({ type: 'Reducer - app: set app loading on' })
            .put({ type: 'Reducer - app: set app loading off' })
            .put({ type: 'Reducer - app: authorized' })
            .run());

    test('ping server - return !== 200', () =>
        expectSaga(pingRequest)
            .provide([[matchers.call.fn(ping), { ok: false }]])
            .put({ type: 'Reducer - app: set app loading on' })
            .put({ type: 'Reducer - app: set app loading off' })
            .put({ type: 'Reducer - app: unauthorized' })
            .run());
});

describe('Test fetch transaction requests:', () => {
    const year = 2020;
    test('fetch transactions - return 200', () =>
        expectSaga(fetchTransactionRequest, year)
            .provide([[matchers.call.fn(fetchTransactions, year), { ok: true, data: [{ id: 1 }] }]])
            .put({ type: 'Reducer - trans: set fetch loading on' })
            .put({ type: 'Reducer - trans: set fetch loading off' })
            .put({
                type: 'Reducer - trans: update status',
                payload: 'loaded',
            })
            .put({
                type: 'Reducer - trans: store transactions',
                payload: [{ id: 1 }],
            })
            .run());

    test('fetch transactions - return !== 200', () =>
        expectSaga(fetchTransactionRequest, year)
            .provide([
                [
                    matchers.call.fn(fetchTransactions, year),
                    {
                        ok: false,
                        data: {
                            code: 'E_SERVER_FAIL',
                            message: 'Server encounted error',
                        },
                    },
                ],
            ])
            .put({ type: 'Reducer - trans: set fetch loading on' })
            .put({ type: 'Reducer - trans: set fetch loading off' })
            .put({
                type: 'Reducer - trans: update status',
                payload: 'fail',
            })
            .put({
                type: 'Reducer - app: set flash message',
                payload: {
                    severity: 'error',
                    message: 'Server encounted error (E_SERVER_FAIL)',
                },
            })
            .run());
});

describe('Test synchronize transaction requests:', () => {
    const data = [{ id: 1, amount: 1 }, { amount: 1 }];
    const response = [
        { id: 1, amount: 1, status: 'updated' },
        { id: 2, amount: 1, status: 'created' },
    ];

    test('sync transactions - return 200', () =>
        expectSaga(syncTransactionRequest, data)
            .provide([[matchers.call.fn(syncTransactions, data), { ok: true, data: response }]])
            .put({ type: 'Reducer - trans: set sync loading on' })
            .put({ type: 'Reducer - trans: set sync loading off' })
            .put({
                type: 'Reducer - app: set flash message',
                payload: {
                    severity: 'success',
                    message: `Synchronized succefully`,
                },
            })
            .put({
                type: 'Reducer - trans: update transactions',
                payload: response,
            })
            .run());

    test('sync transactions - return !== 200', () =>
        expectSaga(syncTransactionRequest, data)
            .provide([
                [
                    matchers.call.fn(syncTransactions, data),
                    {
                        ok: false,
                        data: {
                            code: 'E_SYNC_FAIL',
                            message: 'Something went wrong when synchronizing data',
                        },
                    },
                ],
            ])
            .put({ type: 'Reducer - trans: set sync loading on' })
            .put({ type: 'Reducer - trans: set sync loading off' })
            .put({
                type: 'Reducer - app: set flash message',
                payload: {
                    severity: 'error',
                    message: 'Something went wrong when synchronizing data (E_SYNC_FAIL)',
                },
            })
            .run());
});

describe('Test sign in requests:', () => {
    const data = { email: 'email', password: 'password' };

    test('sign in - return 200', () =>
        expectSaga(signinRequest, data)
            .provide([[matchers.call.fn(signin, data), { ok: true }]])
            .put({ type: 'Reducer - app: set signin loading on' })
            .put({ type: 'Reducer - app: set signin loading off' })
            .put({ type: 'Reducer - app: authorized' })
            .run());

    test('sign in - return !== 200', () =>
        expectSaga(signinRequest, data)
            .provide([
                [
                    matchers.call.fn(signin, data),
                    {
                        ok: false,
                        data: {
                            code: 'E_UNAUTHORIZED',
                            message: 'Login error',
                        },
                    },
                ],
            ])
            .put({ type: 'Reducer - app: set signin loading on' })
            .put({ type: 'Reducer - app: set signin loading off' })
            .put({ type: 'Reducer - app: unauthorized' })
            .put({
                type: 'Reducer - app: set flash message',
                payload: {
                    severity: 'error',
                    message: 'Login error (E_UNAUTHORIZED)',
                },
            })
            .run());
});

describe('Test sign out requests:', () => {
    test('sign out', () =>
        expectSaga(signoutRequest)
            .provide([[matchers.call.fn(signout), { ok: true }]])
            .put({ type: 'Reducer - app: unauthorized' })
            .run());
});
