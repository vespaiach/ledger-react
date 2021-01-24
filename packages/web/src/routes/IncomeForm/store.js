import { createReducer, handleApiError } from '../../utils/reducer';

const defaultState = {
    categories: [],
    status: '',
    error: null,
    id: null,
    category: '',
    date: null,
    amount: '',
    description: '',
};

export default createReducer(defaultState, {
    ...handleApiError('Reducer - inForm: set errors', 'Reducer - inForm: clear errors'),

    'Reducer - inForm: set loading status': (state) => ({ ...state, status: 'loading' }),
    'Reducer - inForm: set saving status': (state) => ({ ...state, status: 'saving' }),
    'Reducer - inForm: set fail status': (state) => ({ ...state, status: 'fail' }),
    'Reducer - inForm: set ok status': (state) => ({ ...state, status: 'ok' }),
    'Reducer - inForm: set done status': (state) => ({ ...state, status: 'done' }),

    'Reducer - inForm: save income categories': (state, { payload: categories }) => ({
        ...state,
        categories,
    }),

    'Reducer - inForm: set income detail': (state, { payload }) => ({
        ...state,
        id: payload.id,
        date: payload.date,
        amount: payload.amount,
        category: payload.category,
        description: payload.description,
    }),

    'Reducer - inForm: reset': (state) => ({
        ...state,
        status: '',
        error: defaultState.error,
        id: defaultState.id,
        date: defaultState.date,
        amount: defaultState.amount,
        category: defaultState.category,
        description: defaultState.description,
    }),
});
