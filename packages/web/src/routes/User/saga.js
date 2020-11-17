import axios from 'axios';
import { push } from 'connected-react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { fork, call, put, take, takeEvery } from 'redux-saga/effects';

function* login(email, password) {
    try {
        yield put({ type: 'FETCHING_LOGIN' });
        const result = yield call(axios.post, '/login', { email, password });
        yield put({ type: 'FETCHED_LOGIN_SUCCESS', payload: result.data });
    } catch (e) {
        yield put({ type: 'FETCHED_LOGIN_FAIL' });
        yield put({ type: 'API_REQUEST_FAIL', payload: e });
    }
}

function* logout() {
    try {
        yield call(axios.get, '/logout');
    } catch (e) {
        console.error(e);
    }
}

export function* loginFlow() {
    while (true) {
        const { payload } = yield take('REQUEST_LOGIN');
        yield fork(login, payload.email, payload.password);

        yield take(['REQUEST_LOGOUT', 'FETCHED_LOGIN_FAIL']);
        yield put(push('/login'));
        yield fork(logout);
    }
}

function* fetchMe() {
    try {
        yield put(showLoading());
        const result = yield call(axios.get, '/me');
        yield put({ type: 'FETCHED_ME_SUCCESS', payload: result.data });
    } catch (e) {
        yield put(push('/login'));
    } finally {
        yield put(hideLoading());
    }
}

export function* fetchMeFlow() {
    yield takeEvery('VERIFY_LOGIN', fetchMe);
}
