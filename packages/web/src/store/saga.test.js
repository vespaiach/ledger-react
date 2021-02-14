import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import {
    fetchTransactionRequest,
    signinRequest,
    signoutRequest,
    syncTransactionRequest,
} from './saga';
import { fetchTransactions, signin, syncTransactions } from './remote';
import { clearToken, setToken } from '../utils/token';

describe('Test fetch transaction requests:', () => {
    const year = 2020;
    test('fetch transactions - return 200', () =>
        expectSaga(fetchTransactionRequest, year)
            .provide([[matchers.call.fn(fetchTransactions, year), { ok: true, data: [{ id: 1 }] }]])
            .put({ type: 'Reducer: show app loading' })
            .put({ type: 'Reducer: clear app process' })
            .put({
                type: 'Reducer: store transactions',
                payload: [{ id: 1 }],
            })
            .run());

    test('fetch transactions - return 401', () =>
        expectSaga(fetchTransactionRequest, year)
            .provide([
                [
                    matchers.call.fn(fetchTransactions, year),
                    {
                        ok: false,
                        status: 401,
                    },
                ],
            ])
            .put({ type: 'Reducer: show app loading' })
            .put({ type: 'Reducer: clear app process' })
            .put({
                type: 'Reducer: show sign in dialog',
                payload: {
                    type: 'Saga: fetch transactions',
                    payload: year,
                },
            })
            .run());

    test('fetch transactions - return other error', () =>
        expectSaga(fetchTransactionRequest, year)
            .provide([
                [
                    matchers.call.fn(fetchTransactions, year),
                    {
                        ok: false,
                        status: 400,
                        data: {
                            code: 'E',
                            message: 'validation',
                        },
                    },
                ],
            ])
            .put({ type: 'Reducer: show app loading' })
            .put({ type: 'Reducer: clear app process' })
            .put({
                type: 'Reducer: show app error',
                payload: 'validation',
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
            .put({
                type: 'Reducer: update transactions',
                payload: response,
            })
            .run());

    test('sync transactions - return 401', () =>
        expectSaga(syncTransactionRequest, data)
            .provide([
                [
                    matchers.call.fn(syncTransactions, data),
                    {
                        ok: false,
                        status: 401,
                    },
                ],
            ])
            .put({
                type: 'Reducer: show sign in dialog',
                payload: {
                    type: 'Saga: sync transactions',
                    payload: data,
                },
            })
            .run());

    test('sync transactions - return other error', () =>
        expectSaga(syncTransactionRequest, data)
            .provide([
                [
                    matchers.call.fn(syncTransactions, data),
                    {
                        ok: false,
                        status: 400,
                        data: {
                            code: 'E_SYNC_FAIL',
                            message: 'Something went wrong when synchronizing data',
                        },
                    },
                ],
            ])
            .put({
                type: 'Reducer: show app error',
                payload: 'Something went wrong when synchronizing data',
            })
            .run());
});

describe('Test sign in requests:', () => {
    const data = { email: 'email', password: 'password' };

    test('sign in - return 200 - save localstorage ok', () =>
        expectSaga(signinRequest, data)
            .withState({ common: { lastAction: { type: 'action', payload: 'payload' } } })
            .provide([
                [matchers.call.fn(signin, data), { ok: true, data: { token: 'token' } }],
                [matchers.call.fn(setToken, 'token'), true],
            ])
            .put({ type: 'Reducer: show signin loading' })
            .put({ type: 'Reducer: hide signin loading' })
            .put({ type: 'Reducer: close sign in dialog' })
            .returns(true)
            .run());

    test('sign in - return 200 - save localstorage ok - with last action', () =>
        expectSaga(signinRequest, data)
            .withState({ common: { lastAction: { type: 'action', payload: 'payload' } } })
            .provide([
                [matchers.call.fn(signin, data), { ok: true, data: { token: 'token' } }],
                [matchers.call.fn(setToken, 'token'), true],
            ])
            .put({ type: 'Reducer: show signin loading' })
            .put({ type: 'Reducer: hide signin loading' })
            .put({ type: 'action', payload: 'payload' })
            .put({ type: 'Reducer: close sign in dialog' })
            .returns(true)
            .run());

    test('sign in - return 200 - save localstorage fail', () =>
        expectSaga(signinRequest, data)
            .provide([
                [matchers.call.fn(signin, data), { ok: true, data: { token: 'token' } }],
                [matchers.call.fn(setToken, 'token'), false],
            ])
            .put({ type: 'Reducer: show signin loading' })
            .put({ type: 'Reducer: hide signin loading' })
            .put({
                type: 'Reducer: show app error',
                payload: "Couldn't store token to local storage",
            })
            .returns(false)
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
            .put({ type: 'Reducer: show signin loading' })
            .put({ type: 'Reducer: hide signin loading' })
            .put({
                type: 'Reducer: show app error',
                payload: 'Login error',
            })
            .returns(false)
            .run());
});

describe('Test sign out requests:', () => {
    test('sign out', () =>
        expectSaga(signoutRequest)
            .provide([[matchers.call.fn(clearToken), false]])
            .put({
                type: 'Reducer: show app success',
                payload: 'You have been signed out!',
            })
            .returns(true)
            .run());
});
