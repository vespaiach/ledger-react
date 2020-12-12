const defaultState = {
    pages: {},
    fetching: false,
    currentPage: null,
    totalPages: null,
    from: null,
    to: null,
    category: null,
    categories: null,
    savingExpenses: false,
    orderBy: {
        field: 'date',
        order: 'desc',
    },
    openCreatingDialog: false,
};

export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case 'Store: fetching expense list':
            return { ...state, fetching: true };

        case 'Store: expense list - fetch done':
            return { ...state, fetching: false };

        case 'Store: expense list - update current page':
            return { ...state, currentPage: payload };

        case 'Store: expense list - save list':
            return {
                ...state,
                pages: Object.assign({}, state.pages, {
                    [payload.page]: payload.list,
                }),
            };

        case 'Store: expense list - save total pages':
            return { ...state, fetching: false, totalPages: payload };

        case 'Store: expense list - update sort condition':
            return {
                ...state,
                orderBy: payload,
                pages: {},
            };

        case 'Store: editing expense - fetch ok':
            return {
                ...state,
                editing: payload,
            };

        case 'Store: editing expense - save done':
            return {
                ...state,
                savingExpenses: false,
            };

        case 'Store: editing expense - saving':
            return {
                ...state,
                savingExpenses: true,
            };

        case 'Store: expense list - mark as stale':
            return {
                ...state,
                pages: {},
                totalPages: null,
            };

        case 'Store: expense categories - fetch ok':
            return {
                ...state,
                categories: payload,
            };

        case 'Store: update expense\'s filtering conditions':
            return {
                ...state,
                from: 'from' in payload ? payload.from : state.from,
                to: 'to' in payload ? payload.to : state.to,
                category:
                    'category' in payload ? payload.category : state.category,
            };

        default:
            return state;
    }
}
