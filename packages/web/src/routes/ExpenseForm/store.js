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
    ...handleApiError('Reducer - exForm: set errors', 'Reducer - exForm: clear errors'),

    'Reducer - exForm: set loading status': (state) => ({ ...state, status: 'loading' }),
    'Reducer - exForm: set saving status': (state) => ({ ...state, status: 'saving' }),
    'Reducer - exForm: set fail status': (state) => ({ ...state, status: 'fail' }),
    'Reducer - exForm: set ok status': (state) => ({ ...state, status: 'ok' }),
    'Reducer - exForm: set done status': (state) => ({ ...state, status: 'done' }),

    'Reducer - exForm: save expense categories': (state, { payload: categories }) => ({
        ...state,
        categories,
    }),

    'Reducer - exForm: set expense detail': (state, { payload }) => ({
        ...state,
        id: payload.id,
        date: payload.date,
        amount: payload.amount,
        category: payload.category,
        description: payload.description,
    }),

    'Reducer - exForm: reset': (state) => ({
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
