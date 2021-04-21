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
  RECEIVE_LIST_YEAR,
  SELECT_YEAR,
  SORT_TRANSACTION,
} from '../../actions/trans';
import { Action, SortingFunction, Transaction, TransactionState } from '../../types.d';
import { createReducer } from '../../utils/reducer';

const currentYear = new Date().getFullYear();
const defaultState: TransactionState = {
  list: [],
  sortingFunction: null,
  year: currentYear,
  years: [currentYear, currentYear - 1],
  refetchListYears: true,
};

export default createReducer<TransactionState>(defaultState, {
  [RECEIVE_LIST_YEAR]: (state: TransactionState, action: Action<string, number[]>) => {
    if (action.payload) {
      return {
        ...state,
        years: action.payload,
        refetchListYears: false,
      };
    }
    return state;
  },

  [SELECT_YEAR]: (state, { payload }: Action<string, number>) => ({
    ...state,
    year: payload,
  }),

  [RECEIVE_TRANSACTION]: (state: TransactionState, { payload }: Action<string, Transaction[]>) => {
    if (payload) {
      return {
        ...state,
        list: payload.map((tr) => ({
          ...tr,
          date: new Date(tr.date),
        })),
      };
    }
    return state;
  },

  [SORT_TRANSACTION]: (state, { payload }: Action<string, SortingFunction>) => {
    if (payload) {
      return {
        ...state,
        sortingFunction: payload,
      };
    }
    return state;
  },
});
