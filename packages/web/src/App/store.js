import { createReducer } from '../utils/reducer';

const defaultState = {
    loading: false,
    flashMessage: '',
    flashMessageSeverity: '',
    confirm: null,
    me: null,
    inSort: {
        byAmount: '',
        byDate: '-',
    },
    exSort: {
        byAmount: '',
        byDate: '-',
    },
    inSearch: {
        byDate: '',
        byAmount: '',
        byCategory: '',
    },
    exSearch: {
        byDate: '',
        byAmount: '',
        byCategory: '',
    },
};

export default createReducer(defaultState, {
    'Reducer - app: set app loading on': (state) => ({ ...state, loading: true }),
    'Reducer - app: set app loading off': (state) => ({ ...state, loading: false }),

    'Reducer - app: set flash message': (state, { payload: { message, severity = 'info' } }) => ({
        ...state,
        flashMessage: message,
        flashMessageSeverity: severity,
    }),
    'Reducer - app: clear flash message': (state) => ({
        ...state,
        flashMessage: '',
        flashMessageSeverity: '',
    }),

    'Reducer - app: set me': (state, { payload: me }) => ({ ...state, me }),

    'Reducer - app: confirm': (state, { payload: confirm }) => ({ ...state, confirm }),
    'Reducer - app: clear confirm': (state) => ({ ...state, confirm: null }),

    'Reducer - app: reset insort': (state) => ({ ...state, inSort: { ...defaultState.inSort } }),
    'Reducer - app: apply insort': (state, { payload }) => ({
        ...state,
        inSort: { date: payload.byDate, amount: payload.byAmount },
    }),

    'Reducer - app: reset insearch': (state) => ({
        ...state,
        inSearch: { ...defaultState.inSearch },
    }),
    'Reducer - app: apply insearch': (state, { payload }) => ({
        ...state,
        inSearch: { date: payload.byDate, amount: payload.byAmount },
    }),

    'Reducer - app: reset exsort': (state) => ({ ...state, exSort: { ...defaultState.exSort } }),
    'Reducer - app: apply exsort': (state, { payload }) => ({
        ...state,
        exSort: { date: payload.byDate, amount: payload.byAmount },
    }),

    'Reducer - app: reset exsearch': (state) => ({
        ...state,
        exSearch: { ...defaultState.exSearch },
    }),
    'Reducer - app: apply exsearch': (state, { payload }) => ({
        ...state,
        exSearch: { date: payload.byDate, amount: payload.byAmount },
    }),
});
