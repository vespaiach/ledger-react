/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { all, select, call, put, take, fork } from 'redux-saga/effects';
import {
  appLoadingAction,
  appSavingAction,
  appIdleAction,
  showMessageAction,
} from '../actions/system';
import {
  transactionList,
  transactionRequestAction,
  yearList,
  categoryList,
  REQUEST_LIST_TRANSACTION,
  REQUEST_CREATE_TRANSACTION,
  REQUEST_UPDATE_TRANSACTION,
  REQUEST_DELETE_TRANSACTION,
  REQUEST_LIST_CATEGORY,
  REQUEST_LIST_YEAR,
} from '../actions/trans';
import {
  Action,
  Transaction,
  RemoteRepository,
  AppMessageCode,
  WholeAppState,
  YieldReturn,
} from '../types';

/**
 * Fetch a list of transaction records by year
 */
export function* fetchTransactionRequest(repo: RemoteRepository, year: number) {
  yield fork(fetchYearListRequest, repo);

  try {
    yield put(appLoadingAction());
    const response: YieldReturn<ReturnType<typeof repo.getTransactions>> = yield call(
      repo.getTransactions,
      {
        year,
      }
    );

    if (response.ok) {
      yield put(transactionList(response.data));
      yield put(appIdleAction());
    }
  } catch (e) {
    console.error(e);
    yield put(showMessageAction(AppMessageCode.NetworkError));
  }
}

/**
 * Fetch a list of years
 */
export function* fetchYearListRequest(repo: RemoteRepository) {
  try {
    const response: YieldReturn<ReturnType<typeof repo.getYears>> = yield call(repo.getYears);
    if (response.ok) {
      yield put(yearList(response.data));
    }
  } catch (e) {
    console.error(e);
    yield put(showMessageAction(AppMessageCode.NetworkError));
  }
}

/**
 * Fetch a list of categories
 */
export function* fetchCategoryListRequest(repo: RemoteRepository) {
  try {
    const response: YieldReturn<ReturnType<typeof repo.getCategories>> = yield call(
      repo.getCategories
    );
    if (response.ok) {
      yield put(categoryList(response.data));
    }
  } catch (e) {
    console.error(e);
    yield put(showMessageAction(AppMessageCode.NetworkError));
  }
}

/**
 * Create a transactions
 */
export function* createTransactionRequest(repo: RemoteRepository, data: Omit<Transaction, 'id'>) {
  yield put(appSavingAction());
  const response: YieldReturn<ReturnType<typeof repo.createTransaction>> = yield call(
    repo.createTransaction,
    data
  );
  yield put(appIdleAction());

  if (response.ok) {
    const year: YieldReturn<number> = yield select<(state: WholeAppState) => number>(
      (state) => state.transaction.year
    );
    yield put(transactionRequestAction(year));
  }
}

/**
 * Update a transaction
 */
export function* updateTransactionRequest(repo: RemoteRepository, data: Transaction) {
  yield put(appSavingAction());
  const response: YieldReturn<ReturnType<typeof repo.updateTransaction>> = yield call(
    repo.updateTransaction,
    data
  );
  yield put(appIdleAction());

  if (response.ok) {
    const year: YieldReturn<number> = yield select<(state: WholeAppState) => number>(
      (state) => state.transaction.year
    );
    yield put(transactionRequestAction(year));
  }
}

/**
 * Delete a transaction
 */
export function* deleteTransactionRequest(repo: RemoteRepository, data: number) {
  yield put(appSavingAction());
  const response: YieldReturn<ReturnType<typeof repo.deleteTransaction>> = yield call(
    repo.deleteTransaction,
    data
  );
  yield put(appIdleAction());

  if (response.ok) {
    const year: YieldReturn<number> = yield select<(state: WholeAppState) => number>(
      (state) => state.transaction.year
    );
    yield put(transactionRequestAction(year));
  }
}

/**
 * Watch for transaction fetching request.
 */
export function watchFetchRequest(repository: RemoteRepository) {
  return function* () {
    while (true) {
      const { payload }: Action<number> = yield take(REQUEST_LIST_TRANSACTION);
      if (payload) {
        yield fetchTransactionRequest(repository, payload);
      }
    }
  };
}

/**
 * Watch for transaction creating request.
 */
export function watchCreatingRequest(repository: RemoteRepository) {
  return function* () {
    while (true) {
      const { payload } = yield take(REQUEST_CREATE_TRANSACTION);
      yield createTransactionRequest(repository, payload);
    }
  };
}

/**
 * Watch for transaction updating request.
 */
export function watchUpdatingRequest(repository: RemoteRepository) {
  return function* () {
    while (true) {
      const { payload } = yield take(REQUEST_UPDATE_TRANSACTION);
      yield updateTransactionRequest(repository, payload);
    }
  };
}

/**
 * Watch for transaction deleting request.
 */
export function watchDeletingRequest(repository: RemoteRepository) {
  return function* () {
    while (true) {
      const { payload } = yield take(REQUEST_DELETE_TRANSACTION);
      yield deleteTransactionRequest(repository, payload);
    }
  };
}

/**
 * Watch for years list request.
 */
export function watchYearRequest(repository: RemoteRepository) {
  return function* () {
    while (true) {
      yield take(REQUEST_LIST_YEAR);
      yield fetchYearListRequest(repository);
    }
  };
}

/**
 * Watch for years list request.
 */
export function watchCategoryRequest(repository: RemoteRepository) {
  return function* () {
    while (true) {
      yield take(REQUEST_LIST_CATEGORY);
      yield fetchCategoryListRequest(repository);
    }
  };
}

export default function rootSaga(repository: RemoteRepository) {
  return function* () {
    yield all(
      [
        watchFetchRequest(repository),
        watchCreatingRequest(repository),
        watchUpdatingRequest(repository),
        watchDeletingRequest(repository),
        watchYearRequest(repository),
        watchCategoryRequest(repository),
      ].map(fork)
    );
  };
}
