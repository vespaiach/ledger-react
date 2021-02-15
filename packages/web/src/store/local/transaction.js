/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { createReducer } from '../../utils/reducer';

const currentYear = new Date().getFullYear();
const listOfYear = [2021, 2020, 2019, 2018];
const defaultState = {
    list: [],
    filter: {
        income: true,
        expense: true,
        dateFrom: null,
        dateTo: null,
        amountFrom: null,
        amountTo: null,
        enableAmountFilter: false,
        enableDateFilter: false,
    },

    /**
     * After fetching transactions, these initial filtering values will be calculated
     */
    initialFilterValues: null,

    /**
     * A sorting function will be scored
     */
    sortingFn: null,

    year: currentYear,
    listOfYear,
};

export default createReducer(defaultState, {
    'Reducer: set year': (state, { payload: year }) => ({ ...state, year }),

    'Reducer: save sorting function': (state, { payload }) => {
        return {
            ...state,
            sortingFn: payload,
        };
    },

    /**
     * Store transaction data and pre-filled the initial filtering value
     */
    'Reducer: store transactions': (state, { payload }) => {
        let maxAmount = 0;
        let minAmount = Number.MAX_SAFE_INTEGER;
        let minDate = new Date(state.year, 11, 31, 23, 59, 59);
        let maxDate = new Date(state.year, 0, 1);

        const list = payload.map((it) => {
            const amount = parseFloat(it.amount);
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

            return {
                ...it,
                date,
                amount,
            };
        });

        const initialFilterValues = {
            income: true,
            expense: true,
            dateFrom: minDate,
            dateTo: maxDate,
            amountTo: Math.ceil(maxAmount),
            amountFrom: Math.floor(minAmount),
            enableAmountFilter: false,
            enableDateFilter: false,
        };

        return {
            ...state,
            filter: {
                ...initialFilterValues,
            },
            initialFilterValues,
            list,
        };
    },

    'Reducer: set filter transactions by date on': (state) => ({
        ...state,
        filter: {
            ...state.filter,
            enableDateFilter: true,
        },
    }),

    'Reducer: set filter transactions by date off': (state) => ({
        ...state,
        filter: {
            ...state.filter,
            enableDateFilter: false,
        },
    }),

    'Reducer: set filter transactions by amount on': (state) => ({
        ...state,
        filter: {
            ...state.filter,
            enableAmountFilter: true,
        },
    }),

    'Reducer: set filter transactions by amount off': (state) => ({
        ...state,
        filter: {
            ...state.filter,
            enableAmountFilter: false,
        },
    }),

    'Reducer: filter transactions by income type': (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            income: payload,
        },
    }),

    'Reducer: filter transactions by expense type': (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            expense: payload,
        },
    }),

    'Reducer: filter transactions by dateFrom': (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            dateFrom: payload,
        },
    }),

    'Reducer: filter transactions by dateTo': (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            dateTo: payload,
        },
    }),

    'Reducer: filter transactions by amountFrom': (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            amountFrom: payload,
        },
    }),

    'Reducer: filter transactions by amountTo': (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            amountTo: payload,
        },
    }),

    'Reducer: reset transaction filter': (state) => {
        if (state.initialFilterValues) {
            return {
                ...state,
                filter: {
                    ...state.initialFilterValues,
                },
            };
        }
        return {
            ...state,
            filter: {
                ...defaultState.filter,
            },
        };
    },
});
