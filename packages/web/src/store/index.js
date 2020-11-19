import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from 'history';

import { loginFlow, fetchMeFlow } from '../routes/User/saga';
import {
    fetchExpensesRequest,
    sortExpensesRequest,
    editExpenseRequest,
    saveExpenseRequest,
    loadExpenseCategoriesRequest,
    filterExpensesListRequest,
    clearExpensesListFilteringRequest,
} from '../routes/Expenses/saga';

import commonReducer from './commonReducer';
import userReducer from '../routes/User/reducer';
import expenseReducer from '../routes/Expenses/reducer';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const typedWindow = typeof window !== 'undefined' && window;
const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        typeof typedWindow !== 'undefined' &&
        typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25,
        })) ||
    compose;

const store = createStore(
    combineReducers({
        user: userReducer,
        common: commonReducer,
        loadingBar: loadingBarReducer,
        expenses: expenseReducer,
        router: connectRouter(history),
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

const saga = function* rootSaga() {
    yield all(
        [
            loginFlow,
            fetchMeFlow,
            fetchExpensesRequest,
            sortExpensesRequest,
            editExpenseRequest,
            saveExpenseRequest,
            loadExpenseCategoriesRequest,
            filterExpensesListRequest,
            clearExpensesListFilteringRequest,
        ].map(fork)
    );
};
sagaMiddleware.run(saga);

export { history };
export default store;
