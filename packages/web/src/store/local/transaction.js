/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { createReducer } from '../../utils/reducer';

const defaultState = {
    list: [],
    filter: {
        type: null,
        dateFrom: null,
        dateTo: null,
        amountFrom: null,
        amountTo: null,
    },
};

export default createReducer(defaultState, {
    'Reducer: store transactions': (state, { payload }) => {
        return {
            ...state,
            list: payload.map((it) => ({
                ...it,
                date: new Date(it.date),
                amount: parseFloat(it.amount),
            })),
        };
    },

    'Reducer: filter transactions by type': (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            type: payload,
        },
    }),

    'Reducer: filter transactions by date': (state, { payload: { from, to } }) => ({
        ...state,
        filter: {
            ...state.filter,
            dateFrom: from,
            dateTo: to,
        },
    }),

    'Reducer: filter transactions by amount': (state, { payload: { from, to } }) => ({
        ...state,
        filter: {
            ...state.filter,
            amountFrom: from,
            amountTo: to,
        },
    }),

    'Reducer: reset transaction filter': (state) => ({
        ...state,
        filter: {
            ...defaultState.filter,
        },
    }),
});
