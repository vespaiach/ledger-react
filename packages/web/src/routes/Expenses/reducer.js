const defaultState = {
    pages: {},
    fetching: false,
    currentPage: null,
    totalPages: null,
    from: null,
    to: null,
    category: null,
    categories: null,
    orderBy: {
        field: 'date',
        order: 'asc',
    },
};

export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case 'FETCHING_EXPENSES_TOTAL_PAGE':
        case 'FETCHING_EXPENSES':
            return { ...state, fetching: true };

        case 'UPDATE_EXPENSES_CURRENT_PAGE':
            return { ...state, currentPage: payload };

        case 'FETCHED_EXPENSES_SUCCESS':
            return {
                ...state,
                fetching: false,
                pages: Object.assign({}, state.pages, {
                    [payload.page]: payload.list,
                }),
            };

        case 'FETCHED_EXPENSES_TOTAL_PAGE_SUCCESS':
            return { ...state, fetching: false, totalPages: payload };

        case 'FETCHED_EXPENSES_TOTAL_PAGE_FAIL':
        case 'FETCHED_EXPENSES_FAIL':
            return { ...state, fetching: false };

        case 'UPDATE_EXPENSES_SORT_CONDITION':
            return {
                ...state,
                orderBy: payload,
                pages: {},
            };

        case 'UPDATE_EXPENSES_FILTER_CONDITION':
            return {
                ...state,
                ...payload,
                pages: {},
                totalPages: null,
            };

        case 'RESET_EXPENSES_FILTER_CONDITION':
            return {
                ...state,
                from: null,
                to: null,
                category: null,
                pages: {},
                totalPages: null,
            };

        case 'FETCHED_EXPENSES_CATEGORIES_SUCCESS':
            return {
                ...state,
                categories: payload.map((c) => c.name),
            };

        default:
            return state;
    }
}
