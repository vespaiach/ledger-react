const defaultState = {
    fetching: false,
    expenses: {
        categories: [],
        months: {},
    },
    incomes: {
        categories: [],
        months: {},
    },
};

export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case 'Store: statistics - fetching':
            return { ...state, fetching: true };

        case 'Store: statistics - fetch done':
            return { ...state, fetching: false };

        case 'Store: statistics - save categories amount by month':
            return {
                ...state,
                [payload.type]: {
                    ...state[payload.type],
                    categories: payload.data,
                },
            };

        case 'Store: statistics - save total amount by month':
            return {
                ...state,
                [payload.type]: {
                    ...state[payload.type],
                    months: payload.data,
                },
            };

        default:
            return state;
    }
}
