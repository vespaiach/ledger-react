/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import update from 'immutability-helper';

import { BUSY, CLEAR_MESSAGE, IDLE, SHOW_MESSAGE } from '../actions/system';
import {
  RECEIVE_LIST_CATEGORY,
  RECEIVE_LIST_TRANSACTION,
  RECEIVE_LIST_YEAR,
  SELECT_YEAR,
  ENABLE_AMOUNT_FILTER,
  DISABLE_AMOUNT_FILTER,
  ENABLE_DATE_FILTER,
  DISABLE_DATE_FILTER,
  FILTER_EXPENSE,
  NOT_FILTER_EXPENSE,
  FILTER_INCOME,
  NOT_FILTER_INCOME,
  FILTER_DATE_FROM,
  FILTER_DATE_TO,
  FILTER_AMOUNT_FROM,
  FILTER_AMOUNT_TO,
  RESET_FILTER_VALUES,
  SORT_TRANSACTION,
} from '../actions/trans';

import {
  Action,
  AppBusyCode,
  AppMessageCode,
  Category,
  SortingFunction,
  Transaction,
  WholeAppState,
} from '../types';
import { createReducer } from '../utils/reducer';

const defaultState: WholeAppState = {
  messageCode: null,
  busyCode: AppBusyCode.Idle,
  categories: null,
  transaction: {
    list: [],
    sortingFunction: null,
    year: new Date().getFullYear(),
    years: null,
    filtering: {
      income: { origin: true, value: true },
      expense: { origin: true, value: true },
      dateFrom: { origin: null, value: null },
      dateTo: { origin: null, value: null },
      amountFrom: { origin: null, value: null },
      amountTo: { origin: null, value: null },
      enableAmountFilter: { origin: false, value: false },
      enableDateFilter: { origin: false, value: false },
    },
  },
};

export default createReducer<WholeAppState>(defaultState, {
  [SHOW_MESSAGE]: (state, { payload }: Action<AppMessageCode>) =>
    update(state, {
      messageCode: { $set: payload },
    }),

  [CLEAR_MESSAGE]: (state) =>
    update(state, {
      messageCode: { $set: null },
    }),

  [BUSY]: (state, { payload }: Action<AppBusyCode>) =>
    update(state, {
      busyCode: { $set: payload },
    }),

  [IDLE]: (state) =>
    update(state, {
      busyCode: { $set: AppBusyCode.Idle },
    }),

  [RECEIVE_LIST_YEAR]: (state: WholeAppState, { payload }: Action<number[]>) =>
    update(state, {
      transaction: {
        years: { $set: payload },
      },
    }),

  [RECEIVE_LIST_CATEGORY]: (state: WholeAppState, { payload }: Action<Category[]>) =>
    update(state, {
      categories: { $set: payload },
    }),

  [RECEIVE_LIST_TRANSACTION]: (state: WholeAppState, { payload }: Action<Transaction[]>) =>
    update(state, {
      transaction: {
        list: {
          $set: payload.map((tr) => ({
            ...tr,
            date: new Date(tr.date),
          })),
        },
      },
    }),

  [SORT_TRANSACTION]: (state: WholeAppState, { payload }: Action<SortingFunction>) =>
    update(state, {
      transaction: {
        sortingFunction: { $set: payload },
      },
    }),

  [SELECT_YEAR]: (state: WholeAppState, { payload }: Action<number>) =>
    update(state, {
      transaction: {
        year: { $set: payload },
      },
    }),

  [ENABLE_DATE_FILTER]: (state: WholeAppState) =>
    update(state, {
      transaction: {
        filtering: {
          enableDateFilter: {
            value: { $set: true },
          },
        },
      },
    }),

  [DISABLE_DATE_FILTER]: (state) =>
    update(state, {
      transaction: {
        filtering: {
          enableDateFilter: {
            value: { $set: false },
          },
        },
      },
    }),

  [ENABLE_AMOUNT_FILTER]: (state) =>
    update(state, {
      transaction: {
        filtering: {
          enableAmountFilter: {
            value: { $set: true },
          },
        },
      },
    }),

  [DISABLE_AMOUNT_FILTER]: (state) =>
    update(state, {
      transaction: {
        filtering: {
          enableAmountFilter: {
            value: { $set: false },
          },
        },
      },
    }),

  [FILTER_INCOME]: (state) =>
    update(state, {
      transaction: {
        filtering: {
          income: {
            value: { $set: true },
          },
        },
      },
    }),

  [NOT_FILTER_INCOME]: (state) =>
    update(state, {
      transaction: {
        filtering: {
          income: {
            value: { $set: false },
          },
        },
      },
    }),

  [FILTER_EXPENSE]: (state) =>
    update(state, {
      transaction: {
        filtering: {
          expense: {
            value: { $set: true },
          },
        },
      },
    }),

  [NOT_FILTER_EXPENSE]: (state) =>
    update(state, {
      transaction: {
        filtering: {
          expense: {
            value: { $set: false },
          },
        },
      },
    }),

  [FILTER_DATE_FROM]: (state: WholeAppState, { payload }: Action<Date>) =>
    update(state, {
      transaction: {
        filtering: {
          dateFrom: {
            value: { $set: payload },
          },
        },
      },
    }),

  [FILTER_DATE_TO]: (state: WholeAppState, { payload }: Action<Date>) =>
    update(state, {
      transaction: {
        filtering: {
          dateTo: {
            value: { $set: payload },
          },
        },
      },
    }),

  [FILTER_AMOUNT_FROM]: (state: WholeAppState, { payload }: Action<number>) =>
    update(state, {
      transaction: {
        filtering: {
          amountFrom: {
            value: { $set: payload },
          },
        },
      },
    }),

  [FILTER_AMOUNT_TO]: (state: WholeAppState, { payload }: Action<number>) =>
    update(state, {
      transaction: {
        filtering: {
          amountTo: {
            value: { $set: payload },
          },
        },
      },
    }),

  [RESET_FILTER_VALUES]: (state: WholeAppState) =>
    update(state, {
      transaction: {
        filtering: {
          income: { value: { $set: state.transaction.filtering.income.origin } },
          expense: { value: { $set: state.transaction.filtering.expense.origin } },
          dateFrom: { value: { $set: state.transaction.filtering.dateFrom.origin } },
          dateTo: { value: { $set: state.transaction.filtering.dateTo.origin } },
          amountFrom: { value: { $set: state.transaction.filtering.amountFrom.origin } },
          amountTo: { value: { $set: state.transaction.filtering.amountTo.origin } },
          enableAmountFilter: {
            value: { $set: state.transaction.filtering.enableAmountFilter.origin },
          },
          enableDateFilter: {
            value: { $set: state.transaction.filtering.enableDateFilter.origin },
          },
        },
      },
    }),
});
