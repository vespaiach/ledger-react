import { push } from 'connected-react-router';
import { call, put, take } from 'redux-saga/effects';

import { safeCall } from '../../utils/saga';
import http from '../../utils/http';

export function* watchSubmitSignupForm() {
    while (true) {
        const {
            payload: { email, password, name },
        } = yield take('Saga: submit signup form');

        yield put({ type: 'Reducer - app: set app loading on' });

        const response = yield safeCall(
            call(http.post, { ep: '/signup', body: { name, email, password } })
        );

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield put(push('/signin'));
            yield put({
                type: 'Reducer - app: set flash message',
                payload: { message: 'Your account is ready. Please signin!', severity: 'success' },
            });
        } else {
            yield put({ type: 'Reducer - signup: set errors', payload: response });
        }
    }
}
