import axios from 'axios';
import { push } from 'connected-react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

export function* getExpensesCategories() {
    try {
        const result = yield call(axios.get, '/expenses_categories');
        yield put({
            type: 'FETCHED_EXPENSES_CATEGORIES_SUCCESS',
            payload: result.data,
        });
    } catch (e) {
        yield put({ type: 'Store: api request fail', payload: e });
    }
}

export function* getTotalPage() {
    try {
        const { from, to, category } = yield select((state) => state.expenses);
        yield put({ type: 'FETCHING_EXPENSES_TOTAL_PAGE' });
        const result = yield call(axios.get, '/expenses/count', {
            params: { from, to, cate: category },
        });
        yield put({
            type: 'FETCHED_EXPENSES_TOTAL_PAGE_SUCCESS',
            payload: result.data.total,
        });
        return result.data.total;
    } catch (e) {
        yield put({
            type: 'FETCHED_EXPENSES_TOTAL_PAGE_FAIL',
        });
        yield put({ type: 'Store: api request fail', payload: e });
    }
}

export function* getExpenses(pg) {
    try {
        const { from, to, category, orderBy } = yield select(
            (state) => state.expenses
        );
        yield put({ type: 'FETCHING_EXPENSES' });
        const result = yield call(axios.get, '/expenses', {
            params: {
                from,
                to,
                cate: category,
                by: `${orderBy.order === 'desc' ? '-' : ''}${orderBy.field}`,
                pg,
            },
        });
        yield put({
            type: 'FETCHED_EXPENSES_SUCCESS',
            payload: { list: result.data, page: pg },
        });
    } catch (e) {
        yield put({
            type: 'FETCHED_EXPENSES_FAIL',
        });
        yield put({ type: 'Store: api request fail', payload: e });
    }
}

export function* sortExpensesRequest() {
    while (true) {
        const { payload } = yield take(['REQUEST_SORT_EXPENSES']);
        yield put({ type: 'UPDATE_EXPENSES_SORT_CONDITION', payload });
        yield put({ type: 'REQUEST_EXPENSES', payload: 1 });
    }
}

export function* resetExpensesFilterRequest() {
    while (true) {
        yield take(['REQUEST_RESET_EXPENSES_FILTER']);
        yield put({ type: 'RESET_EXPENSES_FILTER_CONDITION' });
        yield put({ type: 'REQUEST_EXPENSES', payload: 1 });
    }
}

export function* updateExpensesFilterRequest() {
    while (true) {
        const { payload } = yield take(['REQUEST_UPDATE_EXPENSES_FILTER']);
        yield put({ type: 'UPDATE_EXPENSES_FILTER_CONDITION', payload });
        yield put({ type: 'REQUEST_EXPENSES', payload: 1 });
    }
}

export function* fetchExpensesRequest() {
    while (true) {
        const { payload: page } = yield take('REQUEST_EXPENSES');
        yield put({ type: 'UPDATE_EXPENSES_CURRENT_PAGE', payload: page });
        let totalPages = yield select((state) => state.expenses.totalPages);
        // If there is no total page, call api to get it first
        if (totalPages === null) {
            totalPages = yield call(getTotalPage);
        }

        // Don't do anything, if requested page doesn't exist
        if (page <= totalPages) {
            const pages = yield select((state) => state.expenses.pages);

            // Fetch page data
            if (!pages[page]) {
                yield call(getExpenses, page);
            }
        }
    }
}

export function* fetchExpensesCategoriesRequest() {
    yield takeLatest('REQUEST_UPDATE_EXPENSES_FILTER', getExpensesCategories);
}

export function* editExpenseRequest() {
    while (true) {
        const { payload: id } = yield take('Request: edit expense');

        try {
            yield put(showLoading());
            const result = yield call(axios.get, `/expenses/${id}`);
            yield put({
                type: 'Store: editing expense - fetch ok',
                payload: result.data,
            });
            const pathname = yield select(
                (state) => state.router.location.pathname
            );
            if (!/^\/expenses\/\d+/i.test(pathname)) {
                yield put(push(`/expenses/${id}`));
            }
        } catch (e) {
            yield put({ type: 'Store: api request fail', payload: e });
        } finally {
            yield put(hideLoading());
        }
    }
}

export function* loadExpenseCategoriesRequest() {
    while (true) {
        yield take(['Request: edit expense', 'Request: create expense']);
        const categories = yield select((state) => state.expenses.categories);

        try {
            if (!categories) {
                const result = yield call(axios.get, '/expenses_categories');
                yield put({
                    type: 'Store: expense categories - fetch ok',
                    payload: result.data,
                });
            }
        } catch (e) {
            // Don't need to do anything in this case
            console.log(e);
        }
    }
}

export function* saveExpenseRequest() {
    while (true) {
        const {
            payload: { id, amount, description, category, date },
            afterSuccess,
        } = yield take('Request: editing expense - save');

        try {
            yield put({ type: 'Store: editing expense - saving' });
            yield call(
                id ? axios.put : axios.post,
                id ? `/expenses/${id}` : '/expenses',
                {
                    amount,
                    description,
                    date,
                    category,
                }
            );
            yield put({ type: 'Store: expense list - mark as stale' });
            if (afterSuccess) {
                afterSuccess();
            }
        } catch (e) {
            yield put({ type: 'Store: api request fail', payload: e });
        } finally {
            yield put({ type: 'Store: editing expense - save done' });
        }
    }
}
