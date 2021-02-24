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
    [RECEIVE_LIST_YEAR]: (state: TransactionState, action: Action<string, number[]>) => ({
        ...state,
        years: action.payload,
        refetchListYears: false,
    }),

    [SELECT_YEAR]: (state, { payload }: Action<string, number>) => ({
        ...state,
        year: payload,
    }),

    [RECEIVE_TRANSACTION]: (state: TransactionState, action: Action<string, Transaction[]>) => {
        return {
            ...state,
            list: action.payload,
        };
    },

    [SORT_TRANSACTION]: (state, action: Action<string, SortingFunction>) => ({
        ...state,
        sortingFunction: action.payload,
    }),
});
