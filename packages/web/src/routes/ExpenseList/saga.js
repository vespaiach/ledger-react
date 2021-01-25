import { select, all, debounce, put, call, takeEvery } from 'redux-saga/effects';
import { safeCall, buildParams } from '../../utils/saga';
import http from '../../utils/http';

function* fetchMoreExpenses(page) {
    const { sort, search } = yield select((state) => state.exs);

    const response = yield safeCall(
        call(http.get, { ep: '/expenses', params: buildParams(search, sort, page) })
    );

    if (response.ok) {
        yield put({
            type: 'Reducer - exs: save expense records',
            payload: {
                list: response.data,
                page,
            },
        });
    }
}

function* fetchTotalRecords() {
    if (yield select((state) => state.exs.fetchedTotalRecords)) {
        return;
    }

    const search = yield select((state) => state.exs.search);

    const response = yield safeCall(
        call(http.get, { ep: '/expenses/count', params: buildParams(search, null, null) })
    );

    if (response.ok) {
        yield put({
            type: 'Reducer - exs: save total records',
            payload: {
                totalRecords: response.data.total,
                totalPage: response.data.pages,
                perPage: response.data.perPage,
            },
        });
        return response.data.totalRecords;
    }

    return 0;
}

/**
 * Check in state to see which pages are fetched because we don't need to re-fetch them.
 */
function* getListofPageToFetch(startRecordIndex, endRecordIndex) {
    const { perPage, fetchedPages } = yield select((state) => state.exs);

    let startPage = Math.floor((startRecordIndex + 1) / perPage);
    if ((startRecordIndex + 1) % perPage !== 0) {
        startPage += 1;
    }

    let endPage = Math.floor((endRecordIndex + 1) / perPage);
    if ((endRecordIndex + 1) % perPage !== 0) {
        endPage += 1;
    }

    const pageToFetch = [];
    for (let i = startPage; i <= endPage; i++) {
        if (!fetchedPages[i]) {
            pageToFetch.push(i);
        }
    }

    return pageToFetch;
}

export function* watchFetchExpenseListRequest() {
    yield debounce(500, 'Saga: request more expense records', function* ({ payload }) {
        yield put({ type: 'Reducer - exs: set fetching on' });

        yield fetchTotalRecords();

        const pageToFetch = yield getListofPageToFetch(payload.startIndex, payload.stopIndex);

        if (pageToFetch.length) {
            yield all(pageToFetch.map((pg) => fetchMoreExpenses(pg)));
        }

        yield put({ type: 'Reducer - exs: set fetching off' });
    });
}

export function* watchDeleteExpenseRequest() {
    yield takeEvery('Saga: remove expense transation', function* ({ payload: id }) {
        yield put({ type: 'Reducer - app: clear confirm' });
        yield put({ type: 'Reducer - app: set app loading on' });

        const response = yield safeCall(call(http.del, { ep: `/expenses/${id}` }));

        yield put({ type: 'Reducer - app: set app loading off' });

        if (response.ok) {
            yield put({ type: 'Reducer - exs: clear list of expenses' });
        }
    });
}
