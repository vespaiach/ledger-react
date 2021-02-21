/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import {
    watchFetchRequest,
    watchSyncRequest,
    watchSigninRequest,
    watchSignoutRequest,
    watchDeleteRequest,
    watchYearRequest,
} from './saga';
import localStore from './local';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
    onError: (e) => {
        console.error(e);
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

const store = createStore(localStore, composeEnhancers(applyMiddleware(sagaMiddleware)));

const saga = function* rootSaga() {
    yield all(
        [
            watchFetchRequest,
            watchSyncRequest,
            watchSigninRequest,
            watchSignoutRequest,
            watchDeleteRequest,
            watchYearRequest,
        ].map(fork)
    );
};
sagaMiddleware.run(saga);

export { history };
export default store;
