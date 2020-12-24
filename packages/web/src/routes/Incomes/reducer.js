import { createReducer } from '../../utils/reducer';

const estimateRecord = 10000;

const defaultState = {
    list: new Array(estimateRecord),
    order: {
        field: 'date',
        direction: 'desc',
    },
    search: {
        dateFrom: null,
        dateTo: null,
        category: null,
    },
    categories: [],
    fetchedPages: {},
    totalRecords: estimateRecord,
    totalPages: Math.floor(estimateRecord / 20) + (estimateRecord % 20 === 0 ? 0 : 1),
    perPage: 20,
    fetchedTotalRecords: false,
    fetching: false,
    saving: false,
};

export default createReducer(defaultState, {
    'Reducer: save income records': (state, { payload: { list, page } }) => {
        const cloneList = state.list.slice();
        const startIndex = (page - 1) * state.perPage;
        for (let i = 0; i < list.length; i++) {
            cloneList[i + startIndex] = list[i];
        }

        return {
            ...state,
            list: cloneList,
            fetchedPages: Object.assign({}, state.fetchedPages, {
                [page]: true,
            }),
        };
    },

    'Reducer: save total records': (state, { payload: { totalRecords, totalPages, perPage } }) => {
        return {
            ...state,
            list: new Array(totalRecords),
            fetchedPages: [],
            totalRecords,
            totalPages,
            perPage,
            fetchedTotalRecords: true,
        };
    },

    'Reducer: set fetching on': (state) => ({ ...state, fetching: true }),

    'Reducer: set fetching off': (state) => ({ ...state, fetching: false }),

    'Reducer: set saving on': (state) => ({ ...state, saving: true }),

    'Reducer: set saving off': (state) => ({ ...state, saving: false }),

    'Reducer: reset list data': (state) => ({
        ...state,
        list: defaultState.list,
        order: defaultState.order,
        fetchedTotalRecords: false,
        fetchedPages: defaultState.fetchedPages,
        categories: defaultState.categories,
        totalRecords: defaultState.totalRecords,
    }),

    'Reducer: reset incomes list': (state) => ({
        ...state,
        list: defaultState.list,
    }),

    'Reducer: update incomes filtering': (state, { payload }) => ({
        ...state,
        ...payload,
    }),

    'Reducers: save incomes categories': (state, { payload }) => ({
        ...state,
        categories: payload,
    }),
});
