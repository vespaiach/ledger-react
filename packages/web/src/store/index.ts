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
import { createBrowserHistory } from 'history';

import saga from './saga';
import localStore from './local';
import postgresRepository from '../repositories/postgres';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  onError: (e) => {
    console.error(e);
  },
});
const typedWindow = typeof window !== 'undefined' && (window as any);
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
sagaMiddleware.run(saga(postgresRepository));

export { history };
export default store;
