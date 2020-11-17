import axios from 'axios';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

export function* getExpensesCategories() {
    try {
        const result = yield call(axios.get, '/expenses_categories');
        yield put({
            type: 'FETCHED_EXPENSES_CATEGORIES_SUCCESS',
            payload: result.data,
        });
    } catch (e) {
        yield put({ type: 'API_REQUEST_FAIL', payload: e });
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
        yield put({ type: 'API_REQUEST_FAIL', payload: e });
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
        yield put({ type: 'API_REQUEST_FAIL', payload: e });
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
        let totalPage = yield select((state) => state.expenses.totalPage);
        // If there is no total page, call api to get it first
        if (totalPage === null) {
            totalPage = yield call(getTotalPage);
        }

        // Don't do anything, if requested page doesn't exist
        if (page <= totalPage) {
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
