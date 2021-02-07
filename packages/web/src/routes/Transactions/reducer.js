export const defaultTransactionFilter = {
    type: null,
    dateFrom: null,
    dateTo: null,
    amountFrom: null,
    amountTo: null,
};

const reducer = {
    'Reducer: store transactions': (state, { payload }) => {
        return {
            ...state,
            transactions: payload,
        };
    },

    'Reducer: filter by transaction type': (state, { payload }) => ({
        ...state,
        filter: {
            ...state.filter,
            type: payload,
        },
    }),

    'Reducer: filter by transaction date': (state, { payload: { from, to } }) => ({
        ...state,
        filter: {
            ...state.filter,
            dateFrom: from,
            dateTo: to,
        },
    }),

    'Reducer: filter by transaction amount': (state, { payload: { from, to } }) => ({
        ...state,
        filter: {
            ...state.filter,
            amountFrom: from,
            amountTo: to,
        },
    }),

    'Reducer: reset filter': (state) => ({
        ...state,
        filter: {
            ...defaultTransactionFilter,
        },
    }),
};

export default reducer;
