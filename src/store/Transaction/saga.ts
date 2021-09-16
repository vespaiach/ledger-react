import { takeEvery, put, select } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';

import {
  Transaction,
  GetTransactionsDocument,
  GetTotalPagesDocument,
} from '../../graphql.generated';
import { appLoading, appGotError } from '../Shared/action';
import { SagaReturn, TransactionActionType } from '../types';
import { query } from '../utils';
import {
  receiveTotalPages,
  receiveTransactions,
  requestTotalPages,
  TransactionFilter,
  TransactionState,
  updatePage,
} from './action';

export function* requestTransactionListSaga() {
  yield takeEvery(TransactionActionType.REQUEST, requestTransactionRunner);
}

export function* requestTransactionTotalPagesSaga() {
  yield takeEvery(TransactionActionType.PAGES, requestTotalPagesRunner);
}

/**
 * Base on filtering data in redux state:
 *  1. Check if we got total pages or have to request one
 *  2. Use offset/limit to calculate page that need to load
 *  3. Check if that page is loaded or have to request it
 *    3.a. Update transaction list and page list
 */
async function* requestTransactionRunner() {
  const transaction: TransactionState = yield select((state) => state.transaction);
  const filter = transaction.filter;

  /**
   * Request total pages first
   */
  if (!transaction.pages) {
    yield put(requestTotalPages());
  }

  const page =
    Math.floor(filter.offset / filter.limit) + (filter.offset % filter.limit === 0 ? 0 : 1) - 1;

  if (!transaction.pages?.[page]) {
    const result: SagaReturn<Transaction[]> = yield query<Transaction[]>(GetTransactionsDocument, {
      input: filter,
    });

    if (result.error) {
      yield put(appGotError(result.error));
    } else {
      yield all([
        put(receiveTransactions(result.data ?? [], filter.offset, filter.limit)),
        put(updatePage(page)),
      ]);
    }
  }
}

function* requestTotalPagesRunner() {
  const filter: TransactionFilter = yield select((state) => state.transaction.filter);

  yield put(appLoading(true));

  interface Total {
    totalPages: number;
    totalRecords: number;
  }

  const result: SagaReturn<Total> = yield query(GetTotalPagesDocument, {
    input: filter,
  });

  yield put(appLoading(false));

  if (result.error) {
    yield put(appGotError(result.error));
  } else {
    yield put(receiveTotalPages(<Total>result.data));
  }
}
