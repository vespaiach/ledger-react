import { select, call, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { safeCall } from '../../utils/saga';
import http from '../../utils/http';

export function* watchSaveExpensesRequest() {
    yield takeEvery('Saga: save expense transation', function* ({ payload }) {
        const { id, ...body } = payload;
        let url = '/expenses';
        let api = http.post;
        if (id) {
            url = `/expenses/${id}`;
            api = http.put;
        }

        yield put({ type: 'Reducer - app: set app loading on' });
        yield put({ type: 'Reducer - exForm: set saving status' });

        const response = yield safeCall(call(api, { ep: url, body }));

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield put({
                type: 'Reducer - app: set flash message',
                payload: {
                    severity: 'success',
                    message: id
                        ? 'Updated expense transaction successfully'
                        : 'Created expense transaction successfully',
                },
            });
            yield put({ type: 'Reducer - exs: clear list of expenses' });

            if (id) {
                yield put(push('/portal/expenses'));
            } else {
                // in adding mode, we need to clear the form and let users
                // continue to enter other transaction
                yield put({ type: 'Reducer - exForm: set done status' });
            }
        } else {
            yield put({ type: 'Reducer - exForm: set errors', payload: response });
            yield put({ type: 'Reducer - exForm: set status to fail' });
        }
    });
}

export function* watchFetchExpenseDetailRequest() {
    yield takeEvery('Saga: fetch expense detail', function* ({ payload: id }) {
        yield put({ type: 'Reducer - exForm: set loading status' });

        const expenseList = yield select((state) => state.ins.list);
        const index = expenseList.findIndex((inc) => inc && inc.id === id);
        if (index > -1) {
            yield put({ type: 'Reducer - exForm: set expense detail', payload: expenseList[index] });
            yield put({ type: 'Reducer - exForm: set ok status' });
        } else {
            const response = yield safeCall(call(http.get, { ep: `/expenses/${id}` }));
            if (response.ok) {
                yield put({ type: 'Reducer - exForm: set expense detail', payload: response.data });
                yield put({ type: 'Reducer - exForm: set ok status' });
            } else {
                yield put({ type: 'Reducer - exForm: set fail status' });
            }
        }
    });
}

export function* watchAddExpenseRequest() {
    yield takeEvery('Saga: add expense transation', function* () {
        yield put({ type: 'Reducer - exForm: reset' });
        yield put(push('/portal/expenses/new'));
    });
}

export function* watchEditExpenseRequest() {
    yield takeEvery('Saga: edit expense transation', function* ({ payload: id }) {
        yield put({ type: 'Reducer - exForm: reset' });
        yield put(push(`/portal/expenses/${id}`));
    });
}
