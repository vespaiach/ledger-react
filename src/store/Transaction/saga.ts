import { takeEvery, put, select, call } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';

import { TransactionState } from './index';
import {
  Transaction,
  GetTransactionsDocument,
  GetTotalPagesDocument,
  MutateTransactionDocument,
  DeleteTransactionDocument,
} from '../../graphql.generated';
import { updateField } from '../Shared/action';
import { PageActionType, SagaReturn, TransactionActionType } from '../types';
import { mutate, query } from '../utils';
import {
  DeleteTransactionAction,
  receiveOneTransaction,
  receiveTotalPages,
  receiveTransactions,
  requestTotalPages,
  requestTransactions,
  RequestTransactionsAction,
  resetTransactionData,
  SaveTransactionAction,
  TransactionFilter,
  updatePage,
} from './action';
import { popPane } from '../Pane/action';

const Limit = 50;
let lastStartIndex: number = 0;
let lastEndIndex: number | undefined;

export function* requestTransactionsSaga() {
  yield takeEvery(TransactionActionType.REQUEST, requestTransactionsRunner);
}

export function* saveTransactionSaga() {
  yield takeEvery(TransactionActionType.SAVE, saveTransactionRunner);
}

export function* deleteTransactionSaga() {
  yield takeEvery(TransactionActionType.DELETE, deleteTransactionRunner);
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
  yield put(updateField('loading', true));

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
    const pages: (number | null)[] = yield select((state) => state.transaction.pages);
    if (pages[i] === null) {
      yield put(updatePage(i, false));

      const result: SagaReturn<{ transactions: Transaction[] }> = yield call(query, GetTransactionsDocument, {
        transactionsInput: { ...filter, offset: startPage * Limit, limit: Limit },
      });

      if (result.error) {
        yield put(updateField('error', result.error));
      } else {
        const data = result.data?.transactions || [];
        yield all([put(receiveTransactions(data, i * Limit)), put(updatePage(i, true))]);
      }
    }
  }

  lastStartIndex = startIndex;
  lastEndIndex = endIndex;
  yield put(updateField('loading', false));
}

function* requestTotalPagesRunner() {
  const filter: TransactionFilter = yield select((state) => state.transaction.filter);

  interface Total {
    totalPages: number;
    totalRecords: number;
  }

  const result: SagaReturn<{ getTotalPages: Total }> = yield query(GetTotalPagesDocument, {
    input: filter,
  });

  if (result.error) {
    yield put(updateField('error', result.error));
  } else {
    yield put(receiveTotalPages(result.data?.getTotalPages as Total));
  }
}

function* saveTransactionRunner(action: SaveTransactionAction) {
  const {
    payload: { transactionInput, paneIndex },
  } = action;
  yield put(updateField('loading', true));

  const updatingMode = Boolean(transactionInput.id);
  const id = transactionInput.id ?? null;
  const date = transactionInput.date ? transactionInput.date.toISOString() : null;
  const amount = transactionInput.amount ? parseFloat(String(transactionInput.amount)) : null;
  const reason = transactionInput.reason ?? null;
  const description = transactionInput.description ?? null;

  const result: SagaReturn<{ mutateTransaction: Transaction }> = yield mutate(MutateTransactionDocument, {
    input: {
      id,
      date,
      amount,
      reason,
      description,
    },
  });

  yield put(updateField('loading', false));

  if (result.error) {
    yield put(updateField('error', result.error));
  } else {
    if (updatingMode) {
      yield all([
        put(receiveOneTransaction(result.data?.mutateTransaction as Transaction)),
        put(popPane(paneIndex)),
      ]);
    } else {
      yield put(resetTransactionData());
    }
  }
}

function* deleteTransactionRunner(action: DeleteTransactionAction) {
  yield put(updateField('loading', true));

  const result: SagaReturn<{ deleteTransaction: boolean }> = yield mutate(DeleteTransactionDocument, {
    id: action.payload.transactionId,
  });

  yield put(updateField('loading', false));

  if (result.error) {
    yield put(updateField('error', result.error));
  } else {
    yield put(resetTransactionData());
    yield all([
      put(requestTransactions(lastStartIndex, lastEndIndex)),
      put(popPane(action.payload.paneIndex)),
    ]);
  }
}
