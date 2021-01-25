import { parseISO } from 'date-fns';
import { createReducer } from '../../utils/reducer';

const estimateRecord = 1000;
const defaultPerPage = 20;

const defaultState = {
    list: new Array(estimateRecord),
    sort: {
        byAmount: '',
        byDate: '-',
    },
    search: {
        byAmountFrom: '',
        byAmountTo: '',
        byDateFrom: null,
        byDateTo: null,
        byCategory: '',
    },
    totalRecords: estimateRecord,
    totalPages:
        Math.floor(estimateRecord / defaultPerPage) +
        (estimateRecord % defaultPerPage === 0 ? 0 : 1),
    perPage: defaultPerPage,
    fetchedPages: {},
    fetchedTotalRecords: false,
    fetching: false,
};

export default createReducer(defaultState, {
    'Reducer - exs: save expense records': (state, { payload: { list, page } }) => {
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

    'Reducer - exs: save total records': (
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

    'Reducer - exs: update expenses filtering': (state, { payload }) => ({
        ...state,
        ...payload,
    }),

    'Reducer - exs: update date from lookup': (state, { payload }) => ({
        ...state,
        lookup: {
            ...state.lookup,
            dateFrom: payload,
        },
    }),

    'Reducer - exs: update date to lookup': (state, { payload }) => ({
        ...state,
        lookup: {
            ...state.lookup,
            dateTo: payload,
        },
    }),

    'Reducer - exs: update category lookup': (state, { payload }) => ({
        ...state,
        lookup: {
            ...state.lookup,
            category: payload,
        },
    }),

    'Reducer - exs: update sorting': (state, { payload }) => ({
        ...state,
        sort: {
            field: payload.field,
            direction: payload.direction,
        },
    }),

    'Reducer - exs: reset data to default': () => ({ ...defaultState }),

    'Reducer - exs: clear list of expenses': (state) => ({
        ...state,
        list: defaultState.list,
        fetchedTotalRecords: false,
        fetchedPages: defaultState.fetchedPages,
        totalRecords: defaultState.totalRecords,
    }),

    'Reducer - exs: set fetching on': (state) => ({ ...state, fetching: true }),
    'Reducer - exs: set fetching off': (state) => ({ ...state, fetching: false }),

    'Reducer - exs: reset expense sorting': (state) => ({
        ...state,
        sort: { ...defaultState.sort },
    }),
    'Reducer - exs: apply expense sorting': (state, { payload }) => ({
        ...state,
        sort: { byAmount: payload.byAmount, byDate: payload.byDate },
    }),

    'Reducer - exs: reset expense searching': (state) => ({
        ...state,
        search: { ...defaultState.search },
    }),
    'Reducer - exs: apply expense searching': (state, { payload }) => ({
        ...state,
        search: {
            byAmountTo: payload.byAmountTo,
            byAmountFrom: payload.byAmountFrom,
            byDateFrom: payload.byDateFrom,
            byDateTo: payload.byDateTo,
            byCategory: payload.byCategory,
        },
    }),
});
