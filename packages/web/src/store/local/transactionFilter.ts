/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import {
  RECEIVE_TRANSACTION,
  ENABLE_AMOUNT_FILTER,
  DISABLE_AMOUNT_FILTER,
  ENABLE_DATE_FILTER,
  DISABLE_DATE_FILTER,
  FILTER_AMOUNT_FROM,
  FILTER_AMOUNT_TO,
  FILTER_DATE_FROM,
  FILTER_DATE_TO,
  FILTER_EXPENSE,
  NOT_FILTER_EXPENSE,
  FILTER_INCOME,
  NOT_FILTER_INCOME,
  RESET_FILTER_VALUES,
} from '../../actions/trans';
import { Transaction, Action, TransactionFilterState } from '../../types.d';
import { createReducer } from '../../utils/reducer';

const defaultState: TransactionFilterState = {
  income: { origin: true, value: true },
  expense: { origin: true, value: true },
  dateFrom: { origin: null, value: null },
  dateTo: { origin: null, value: null },
  amountFrom: { origin: null, value: null },
  amountTo: { origin: null, value: null },
  enableAmountFilter: { origin: false, value: false },
  enableDateFilter: { origin: false, value: false },
};

export default createReducer<TransactionFilterState>(defaultState, {
  /**
   * Fill the initial filtering value
   */
  [RECEIVE_TRANSACTION]: (
    state: TransactionFilterState,
    { payload }: Action<string, Transaction[]>
  ) => {
    if (!payload || payload.length === 0) {
      return state;
    }

    const year = new Date(payload[0].date).getFullYear();
    let maxAmount = 0;
    let minAmount = Number.MAX_SAFE_INTEGER;
    let minDate = new Date(year, 11, 31, 23, 59, 59);
    let maxDate = new Date(year, 0, 1);

    payload.forEach((it) => {
      const amount = it.amount;
      const date = new Date(it.date);

      if (maxAmount < amount) {
        maxAmount = amount;
      }
      if (minAmount > amount) {
        minAmount = amount;
      }
      if (minDate > date) {
        minDate = date;
      }
      if (maxDate < date) {
        maxDate = date;
      }
    });

    return {
      ...state,
      dateFrom: { origin: minDate, value: minDate },
      dateTo: { origin: maxDate, value: maxDate },
      amountFrom: { origin: Math.ceil(minAmount), value: Math.ceil(minAmount) },
      amountTo: { origin: Math.ceil(maxAmount), value: Math.ceil(maxAmount) },
    };
  },

  [ENABLE_DATE_FILTER]: (state) => ({
    ...state,
    enableDateFilter: {
      origin: state.enableDateFilter.origin,
      value: true,
    },
  }),

  [DISABLE_DATE_FILTER]: (state) => ({
    ...state,
    enableDateFilter: {
      origin: state.enableDateFilter.origin,
      value: false,
    },
  }),

  [ENABLE_AMOUNT_FILTER]: (state) => ({
    ...state,
    enableAmountFilter: {
      origin: state.enableAmountFilter.origin,
      value: true,
    },
  }),

  [DISABLE_AMOUNT_FILTER]: (state) => ({
    ...state,
    enableAmountFilter: {
      origin: state.enableAmountFilter.origin,
      value: false,
    },
  }),

  [FILTER_INCOME]: (state) => ({
    ...state,
    income: {
      origin: state.income.origin,
      value: true,
    },
  }),

  [NOT_FILTER_INCOME]: (state) => ({
    ...state,
    income: {
      origin: state.income.origin,
      value: false,
    },
  }),

  [FILTER_EXPENSE]: (state) => ({
    ...state,
    expense: {
      origin: state.expense.origin,
      value: true,
    },
  }),

  [NOT_FILTER_EXPENSE]: (state) => ({
    ...state,
    expense: {
      origin: state.expense.origin,
      value: false,
    },
  }),

  [FILTER_DATE_FROM]: (state, { payload }: Action<string, Date>) => {
    if (payload) {
      return {
        ...state,
        dateFrom: {
          origin: state.dateFrom.origin,
          value: payload,
        },
      };
    }
    return state;
  },

  [FILTER_DATE_TO]: (state, { payload }: Action<string, Date>) => {
    if (payload) {
      return {
        ...state,
        dateTo: {
          origin: state.dateTo.origin,
          value: payload,
        },
      };
    }
    return state;
  },

  [FILTER_AMOUNT_FROM]: (state, { payload }: Action<string, number>) => {
    if (payload) {
      return {
        ...state,
        amountFrom: {
          origin: state.amountFrom.origin,
          value: payload,
        },
      };
    }
    return state;
  },

  [FILTER_AMOUNT_TO]: (state, { payload }: Action<string, number>) => {
    if (payload) {
      return {
        ...state,
        amountTo: {
          origin: state.amountTo.origin,
          value: payload,
        },
      };
    }
    return state;
  },

  [RESET_FILTER_VALUES]: (state) => {
    return {
      income: { origin: state.income.origin, value: state.expense.origin },
      expense: { origin: state.expense.origin, value: state.expense.origin },
      dateFrom: { origin: state.dateFrom.origin, value: state.dateFrom.origin },
      dateTo: { origin: state.dateTo.origin, value: state.dateTo.origin },
      amountFrom: { origin: state.amountFrom.origin, value: state.amountFrom.origin },
      amountTo: { origin: state.amountTo.origin, value: state.amountTo.origin },
      enableAmountFilter: {
        origin: state.enableAmountFilter.origin,
        value: state.enableAmountFilter.origin,
      },
      enableDateFilter: {
        origin: state.enableDateFilter.origin,
        value: state.enableDateFilter.origin,
      },
    };
  },
});
