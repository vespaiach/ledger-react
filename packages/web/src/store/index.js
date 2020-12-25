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
import {
    watchFetchMoreIncomesRequest,
    watchFetchIncomeCategories,
    watchIncomesFilteringRequest,
    watchSaveIncomesRequest,
    watchIncomeTranctionDeletion,
} from '../routes/Incomes/saga';

import { expensesStatisticsRequest, dashboardStatisticsRequest } from '../routes/Dashboard/saga';

import commonReducer from './commonReducer';
import userReducer from '../routes/User/reducer';
import expenseReducer from '../routes/Expenses/reducer';
import statisticsReducer from '../routes/Dashboard/reducer';
import listOfIncomesReducer from '../routes/Incomes/reducer/listOfIns';
import incomeTransactionReducer from '../routes/Incomes/reducer/inTransaction';
import incomeCategoryReducer from '../routes/Incomes/reducer/listOfInCates';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
    onError: (e, s) => {
        debugger;
    },
});
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
        app: commonReducer,
        loadingBar: loadingBarReducer,
        expenses: expenseReducer,
        router: connectRouter(history),
        statistics: statisticsReducer,
        ins: listOfIncomesReducer,
        inTrans: incomeTransactionReducer,
        inCates: incomeCategoryReducer,
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
            expensesStatisticsRequest,
            dashboardStatisticsRequest,
            watchFetchMoreIncomesRequest,
            watchFetchIncomeCategories,
            watchIncomesFilteringRequest,
            watchSaveIncomesRequest,
            watchIncomeTranctionDeletion,
        ].map(fork)
    );
};
sagaMiddleware.run(saga);

export { history };
export default store;
