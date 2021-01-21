import { parseISO } from 'date-fns';
import { createReducer } from '../../utils/reducer';

const estimateRecord = 1000;
const defaultPerPage = 20;

const defaultState = {
    list: new Array(estimateRecord),
    sort: {
        field: 'date',
        direction: 'desc',
    },
    lookup: {
        dateFrom: null,
        dateTo: null,
        category: '',
    },
    totalRecords: estimateRecord,
    totalPages:
        Math.floor(estimateRecord / defaultPerPage) +
        (estimateRecord % defaultPerPage === 0 ? 0 : 1),
    perPage: defaultPerPage,
    fetchedPages: {},
    fetchedTotalRecords: false,
    loading: false,
};

export default createReducer(defaultState, {
    'Reducer - ins: save income records': (state, { payload: { list, page } }) => {
        const cloneList = state.list.slice();
        const startIndex = (page - 1) * state.perPage;
        for (let i = 0; i < list.length; i++) {
            list[i].date = parseISO(list[i].date);
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

    'Reducer - ins: save total records': (
        state,
        { payload: { totalRecords, totalPages, perPage } }
    ) => {
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

    'Reducer - ins: update incomes filtering': (state, { payload }) => ({
        ...state,
        ...payload,
    }),

    'Reducer - ins: update date from lookup': (state, { payload }) => ({
        ...state,
        lookup: {
            ...state.lookup,
            dateFrom: payload,
        },
    }),

    'Reducer - ins: update date to lookup': (state, { payload }) => ({
        ...state,
        lookup: {
            ...state.lookup,
            dateTo: payload,
        },
    }),

    'Reducer - ins: update category lookup': (state, { payload }) => ({
        ...state,
        lookup: {
            ...state.lookup,
            category: payload,
        },
    }),

    'Reducer - ins: update sorting': (state, { payload }) => ({
        ...state,
        sort: {
            field: payload.field,
            direction: payload.direction,
        },
    }),

    'Reducer - ins: set loading off': (state) => ({ ...state, fetching: false }),

    'Reducer - ins: set fetching on': (state) => ({ ...state, fetching: true }),

    'Reducer - ins: reset data to default': (state) => ({
        ...defaultState,
    }),

    'Reducer - ins: clear list of incomes': (state) => ({
        ...state,
        list: defaultState.list,
        fetchedTotalRecords: false,
        fetchedPages: defaultState.fetchedPages,
        totalRecords: defaultState.totalRecords,
    }),
});
