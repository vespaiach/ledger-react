import { takeEvery, put, select } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';

import { TransactionState } from './index';
import {
  Transaction,
  GetTransactionsDocument,
  GetTotalPagesDocument,
  MutateTransactionDocument,
} from '../../graphql.generated';
import { appLoading, appGotError } from '../Shared/action';
import { PageActionType, SagaReturn, TransactionActionType } from '../types';
import { mutate, query } from '../utils';
import {
  receiveOneTransaction,
  receiveTotalPages,
  receiveTransactions,
  requestTotalPages,
  RequestTransactionsAction,
  resetTransactionData,
  SaveTransactionAction,
  TransactionFilter,
  updatePage,
} from './action';

const Limit = 50;

export function* requestTransactionsSaga() {
  yield takeEvery(TransactionActionType.REQUEST, requestTransactionsRunner);
}

export function* saveTransactionSaga() {
  yield takeEvery(TransactionActionType.SAVE, saveTransactionRunner);
}

export function* requestPagesSaga() {
  yield takeEvery(PageActionType.REQUEST, requestTotalPagesRunner);
}

/**
 * Base on filtering data in redux state:
 *  1. Check if we got total pages or have to request one
 *  2. Use offset/limit to calculate page that need to load
 *  3. Check if that page is loaded or have to request it
 *    3.a. Update transaction list and page list
 */
function* requestTransactionsRunner({ payload: { startIndex, endIndex } }: RequestTransactionsAction) {
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
      yield put(updatePage(i, false));

      const result: SagaReturn<{ transactions: Transaction[] }> = yield query(GetTransactionsDocument, {
        transactionsInput: { ...filter, offset: startPage * Limit, limit: Limit },
      });

      if (result.error) {
        yield put(appGotError(result.error));
      } else {
        const data = result.data?.transactions || [];
        yield all([put(receiveTransactions(data, i * Limit)), put(updatePage(i, true))]);
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

  const result: SagaReturn<{ getTotalPages: Total }> = yield query(GetTotalPagesDocument, {
    input: filter,
  });

  yield put(appLoading(false));

  if (result.error) {
    yield put(appGotError(result.error));
  } else {
    yield put(receiveTotalPages(result.data?.getTotalPages as Total));
  }
}

function* saveTransactionRunner(action: SaveTransactionAction) {
  const { payload } = action;
  yield put(appLoading(true));

  const updatingMode = Boolean(action.payload.id);
  const id = payload.id ?? null;
  const date = payload.date ? payload.date.toISOString() : null;
  const amount = payload.amount ? parseFloat(String(payload.amount)) : null;
  const reason = payload.reason ?? null;
  const description = payload.description ?? null;

  const result: SagaReturn<{ mutateTransaction: Transaction }> = yield mutate(MutateTransactionDocument, {
    input: {
      id,
      date,
      amount,
      reason,
      description,
    },
  });

  yield put(appLoading(false));

  if (result.error) {
    yield put(appGotError(result.error));
  } else {
    if (updatingMode) {
      yield put(receiveOneTransaction(result.data?.mutateTransaction as Transaction));
    } else {
      yield put(resetTransactionData());
    }
  }
}
