import axios from 'axios';
import { push } from 'connected-react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { call, put, select, take } from 'redux-saga/effects';

export function* getTotalPage() {
    try {
        const { from, to, category } = yield select((state) => state.expenses);
        const result = yield call(axios.get, '/expenses/count', {
            params: { from, to, cate: category },
        });
        yield put({
            type: 'Store: expense list - save total pages',
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
        yield put({ type: 'Store: expense list - fetching' });
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
            type: 'Store: expense list - save list',
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
        const { payload } = yield take(['Request: sort expense list']);
        yield put({
            type: 'Store: expense list - update sort condition',
            payload,
        });
        yield put({ type: 'Request: fetch expense list', payload: 1 });
    }
}

/**
 * To load expenses list, we need to fetch the total pages first.
 * Payload --> page number
 */
export function* fetchExpensesRequest() {
    while (true) {
        const { payload: page } = yield take('Request: fetch expense list');

        yield put({ type: 'Store: expense list - fetching' });

        let totalPages = yield select((state) => state.expenses.totalPages);

        // If there is no total page, get it first
        if (totalPages === null) {
            try {
                const { from, to, category } = yield select(
                    (state) => state.expenses
                );
                const result = yield call(axios.get, '/expenses/count', {
                    params: { from, to, cate: category },
                });
                totalPages = result.data.total;
                yield put({
                    type: 'Store: expense list - save total pages',
                    payload: totalPages,
                });
            } catch (e) {
                yield put({ type: 'Store: api request fail', payload: e });
            }
        }

        // Don't do anything, if requesting page doesn't exist
        if (totalPages !== null && page <= totalPages) {
            yield put({
                type: 'Store: expense list - update current page',
                payload: page,
            });

            const pages = yield select((state) => state.expenses.pages);

            // There is no page data in store, go and crab it from server
            if (!pages[page]) {
                try {
                    const { from, to, category, orderBy } = yield select(
                        (state) => state.expenses
                    );
                    const result = yield call(axios.get, '/expenses', {
                        params: {
                            from,
                            to,
                            cate: category,
                            by: `${orderBy.order === 'desc' ? '-' : ''}${
                                orderBy.field
                            }`,
                            pg: page,
                        },
                    });
                    yield put({
                        type: 'Store: expense list - save list',
                        payload: { list: result.data, page },
                    });
                } catch (e) {
                    yield put({ type: 'Store: api request fail', payload: e });
                }
            }

            yield put({ type: 'Store: expense list - fetch done' });
        }
    }
}

/**
 * Users submit a filtering request for expenses list.
 * Payload: {
 *  from    : Datetime
 *  to      : Datetime
 *  category: String
 * }
 */
export function* filterExpensesListRequest() {
    while (true) {
        const { payload } = yield take('Request: filter expense list');
        yield put({
            type: 'Store: expense list - save filtering condition',
            payload,
        });
        yield put({ type: 'Store: expense list - mark as stale' });
        yield put({ type: 'Request: fetch expense list', payload: 1 });
    }
}

/**
 * Users reset all filtering fields for expenses list.
 * All filtering fields will be set to null:
 * Payload: {
 *  from    : null
 *  to      : null
 *  category: null
 * }
 */
export function* clearExpensesListFilteringRequest() {
    while (true) {
        yield take(['Request: clear expense list fitering']);
        yield put({
            type: 'Store: expense list - save filtering condition',
            payload: { from: null, to: null, category: null },
        });
        yield put({ type: 'Store: expense list - mark as stale' });
        yield put({ type: 'Request: fetch expense list', payload: 1 });
    }
}

/**
 * Users want to edit an expenses record.
 * We need to load the being updating record before navigating users to editing page.
 * Payload --> record's id
 */
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

/**
 * Categories list is used for category dropdown on creating/editing page
 * or on filtering popout; it should be reloaded before time.
 */
export function* loadExpenseCategoriesRequest() {
    while (true) {
        yield take([
            'Request: edit expense',
            'Request: create expense',
            'Request: fetch expense list',
        ]);
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
