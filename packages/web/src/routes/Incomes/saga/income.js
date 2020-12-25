import axios from 'axios';
import { takeLatest, select, all, debounce, put, call, takeEvery } from 'redux-saga/effects';
import { safeCall } from '../../../utils/saga';

function* fetchMoreIncomes(page) {
    const { sort, lookup } = yield select((state) => state.ins);

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

    const [result, response] = yield safeCall(call(axios.get, '/incomes', { params }));
    if (result) {
        yield put({
            type: 'Reducer - ins: save income records',
            payload: {
                list: response.data,
                page,
            },
        });
    }
}

function* fetchTotalRecords() {
    if (yield select((state) => state.ins.fetchedTotalRecords)) {
        return;
    }

    const { lookup } = yield select((state) => state.ins);
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

    const [result, response] = yield safeCall(call(axios.get, '/incomes/count', { params }));

    if (result) {
        yield put({
            type: 'Reducer - ins: save total records',
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
    const { perPage, fetchedPages } = yield select((state) => state.ins);

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

export function* watchFetchMoreIncomesRequest() {
    yield debounce(500, 'Saga: request more income records', function* ({ payload }) {
        yield put({ type: 'Reducer - ins: set fetching on' });

        yield fetchTotalRecords();

        const pageToFetch = yield getListofPageToFetch(payload.startIndex, payload.stopIndex);

        if (pageToFetch.length) {
            yield all(pageToFetch.map((pg) => fetchMoreIncomes(pg)));
        }

        yield put({ type: 'Reducer - ins: set loading off' });
    });
}

export function* watchIncomesFilteringRequest() {
    yield takeLatest('Saga: update sort and lookup', function* ({ payload: { lookup, sort } }) {
        const effects = [];
        if (lookup) {
            if (lookup.dateFrom) {
                effects.push(put({ type: 'Reducer - ins: update date from lookup', payload: lookup.dateFrom }));
            }
            if (lookup.dateTo) {
                effects.push(put({ type: 'Reducer - ins: update date to lookup', payload: lookup.dateTo }));
            }
            if (lookup.category) {
                effects.push(put({ type: 'Reducer - ins: update category lookup', payload: lookup.category }));
            }
        }

        if (sort) {
            effects.push(put({ type: 'Reducer - ins: update sorting', payload: sort }));
        }

        yield all(effects);

        yield put({ type: 'Reducer - ins: clear list of incomes' });

        const totalRecords = yield fetchTotalRecords();
        if (totalRecords > 0) {
            yield put({ type: 'Reducer - ins: set fetching on' });

            yield fetchMoreIncomes(1);

            yield put({ type: 'Reducer - ins: set loading off' });
        }
    });
}

export function* watchIncomeTranctionDeletion() {
    yield takeEvery('Saga - ins: delete income transation', function* ({ payload: deletingId }) {
        const result = yield safeCall(call(axios.delete, `/incomes/${deletingId}`));
        if (result) {
            yield put({
                type: 'Reducer - app: set flash message',
                payload: { severity: 'success', message: 'Deleted the transaction successfully' },
            });
            yield put({ type: 'Reducer - ins: clear list of incomes' });
        }
    });
}
