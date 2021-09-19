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
  RequestTransactionsAction,
  setPageStatus,
  TransactionFilter,
  TransactionState,
  updatePage,
} from './action';

const Limit = 100;

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
function* requestTransactionRunner({
  payload: { startIndex, endIndex },
}: RequestTransactionsAction) {
  const transaction: TransactionState = yield select((state) => state.transaction);
  const filter = transaction.filter;

  /**
   * Request total pages first
   */
  if (!transaction.pages.length) {
    yield put(requestTotalPages());
  }

  const endPos = endIndex || Limit;
  const startPage = Math.floor(startIndex / Limit);
  const endPage = Math.floor(endPos / Limit) + (endPos % Limit === 0 ? 0 : 1);

  for (let i = startPage; i < endPage; i++) {
    if (typeof transaction.pages[i] !== 'boolean') {
      yield put(setPageStatus(i, false));

      const result: SagaReturn<{ transactions: Transaction[] }> = yield query(
        GetTransactionsDocument,
        {
          input: filter,
        }
      );

      if (result.error) {
        yield put(appGotError(result.error));
      } else {
        const data = result.data?.transactions || [];
        yield all([
          put(receiveTransactions(data, i * Limit)),
          put(updatePage(i)),
          put(setPageStatus(i, true)),
        ]);
      }
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

  const result: SagaReturn<{ getTotalPages: { totalPages: number; totalRecords: number } }> =
    yield query(GetTotalPagesDocument, {
      input: filter,
    });

  yield put(appLoading(false));

  if (result.error) {
    yield put(appGotError(result.error));
  } else {
    yield put(receiveTotalPages(result.data?.getTotalPages as Total));
  }
}
