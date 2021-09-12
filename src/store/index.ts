import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createTransform, persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

const reducers = combineReducers({});
const sagaMiddleWare = createSagaMiddleware();

function* rootSaga() {
  yield all(
    [
      ...Object.values(appNotificationSagas),
      ...Object.values(cardSagas),
      ...Object.values(configSagas),
      ...Object.values(discoverySagas),
      ...Object.values(eventSagas),
      ...Object.values(eventsSagas),
      ...Object.values(friendsSagas),
      ...Object.values(friendshipSagas),
      ...Object.values(notificationsSagas),
      ...Object.values(paymentSagas),
      ...Object.values(rsvpSagas),
      ...Object.values(sessionSagas),
      ...Object.values(storeSagas),
      ...Object.values(eventsAcceptedSagas),
      ...Object.values(userSagas),
    ].map(fork)
  );
}

function store() {
  const composeEnhancers =
    (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleWare)));

  sagaMiddleWare.run(rootSaga);
  return { store };
}

export default store();
