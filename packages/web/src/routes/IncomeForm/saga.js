import { select, call, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

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
        yield put({ type: 'Reducer - inForm: set saving status' });

        const response = yield safeCall(call(api, { ep: url, body }));

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield put({
                type: 'Reducer - app: set flash message',
                payload: {
                    severity: 'success',
                    message: id
                        ? 'Updated income transaction successfully'
                        : 'Created income transaction successfully',
                },
            });
            yield put({ type: 'Reducer - ins: clear list of incomes' });

            if (id) {
                yield put(push('/portal/incomes'));
            } else {
                // in adding mode, we need to clear the form and let users
                // continue to enter other transaction
                yield put({ type: 'Reducer - inForm: set done status' });
            }
        } else {
            yield put({ type: 'Reducer - inForm: set errors', payload: response });
            yield put({ type: 'Reducer - inForm: set status to fail' });
        }
    });
}

export function* watchFetchIncomeDetailRequest() {
    yield takeEvery('Saga: fetch income detail', function* ({ payload: id }) {
        yield put({ type: 'Reducer - inForm: set loading status' });

        const incomeList = yield select((state) => state.ins.list);
        const index = incomeList.findIndex((inc) => inc && inc.id === id);
        if (index > -1) {
            yield put({ type: 'Reducer - inForm: set income detail', payload: incomeList[index] });
            yield put({ type: 'Reducer - inForm: set ok status' });
        } else {
            const response = yield safeCall(call(http.get, { ep: `/incomes/${id}` }));
            if (response.ok) {
                yield put({ type: 'Reducer - inForm: set income detail', payload: response.data });
                yield put({ type: 'Reducer - inForm: set ok status' });
            } else {
                yield put({ type: 'Reducer - inForm: set fail status' });
            }
        }
    });
}

export function* watchAddIncomeRequest() {
    yield takeEvery('Saga: add income transation', function* () {
        yield put({ type: 'Reducer - inForm: reset' });
        yield put(push('/portal/incomes/new'));
    });
}

export function* watchEditIncomeRequest() {
    yield takeEvery('Saga: edit income transation', function* ({ payload: id }) {
        yield put({ type: 'Reducer - inForm: reset' });
        yield put(push(`/portal/incomes/${id}`));
    });
}
