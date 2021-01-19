import { push } from 'connected-react-router';
import { call, put, take } from 'redux-saga/effects';

import { safeCall } from '../../utils/saga';
import http from '../../utils/http';

export function* watchSubmitSigninForm() {
    while (true) {
        const {
            payload: { email, password },
        } = yield take('Saga: submit signin form');

        yield put({ type: 'Reducer - app: set app loading on' });

        const response = yield safeCall(
            call(http.post, { ep: '/signin', body: { email, password } })
        );

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield put(push('/portal'));
        } else {
            yield put({ type: 'Reducer - signin: set errors', payload: response });
        }
    }
}
