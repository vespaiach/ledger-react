import axios from 'axios';
import { takeLatest, select, all, debounce, put, call, takeEvery } from 'redux-saga/effects';
import { safeCall } from '../../../utils/saga';

function* fetchMoreIncomes(page) {
    const { sort, lookup } = yield select((state) => state.exs);

    const params = {
        pg: page,
        by: `${sort.direction === 'desc' ? '-' : ''}${sort.field}`,
        perPage: 100,
    };
    if (lookup.dateFrom) {
        params.from = lookup.dateFrom;
    }
    if (lookup.dateTo) {
        params.to = lookup.dateTo;
    }
    if (lookup.category) {
        params.cate = lookup.category;
    }

    const [result, response] = yield safeCall(call(axios.get, '/expenses', { params }));
    if (result) {
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

    const { lookup } = yield select((state) => state.exs);
    const params = {};
    if (lookup.dateFrom) {
        params.from = lookup.dateFrom;
    }
    if (lookup.dateTo) {
        params.to = lookup.dateTo;
    }
    if (lookup.category) {
        params.cate = lookup.category;
    }

    const [result, response] = yield safeCall(call(axios.get, '/expenses/count', { params }));

    if (result) {
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

export function* watchFetchMoreExpensesRequest() {
    yield debounce(500, 'Saga: request more expense records', function* ({ payload }) {
        yield put({ type: 'Reducer - exs: set fetching on' });

        yield fetchTotalRecords();

        const pageToFetch = yield getListofPageToFetch(payload.startIndex, payload.stopIndex);

        if (pageToFetch.length) {
            yield all(pageToFetch.map((pg) => fetchMoreIncomes(pg)));
        }

        yield put({ type: 'Reducer - exs: set loading off' });
    });
}

export function* watchExpensesFilteringRequest() {
    yield takeLatest('Saga: update sort and lookup of expenses', function* ({ payload: { lookup, sort } }) {
        const effects = [];
        if (lookup) {
            if (lookup.dateFrom) {
                effects.push(put({ type: 'Reducer - exs: update date from lookup', payload: lookup.dateFrom }));
            }
            if (lookup.dateTo) {
                effects.push(put({ type: 'Reducer - exs: update date to lookup', payload: lookup.dateTo }));
            }
            if (lookup.category) {
                effects.push(put({ type: 'Reducer - exs: update category lookup', payload: lookup.category }));
            }
        }

        if (sort) {
            effects.push(put({ type: 'Reducer - exs: update sorting', payload: sort }));
        }

        yield all(effects);

        yield put({ type: 'Reducer - exs: clear list of expenses' });
    });
}

export function* watchExpenseTranctionDeletion() {
    yield takeEvery('Saga - exs: delete expense transation', function* ({ payload: deletingId }) {
        const result = yield safeCall(call(axios.delete, `/expenses/${deletingId}`));
        if (result) {
            yield put({
                type: 'Reducer - app: set flash message',
                payload: { severity: 'success', message: 'Deleted the transaction successfully' },
            });
            yield put({ type: 'Reducer - exs: clear list of expenses' });
        }
    });
}
