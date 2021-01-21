import { createReducer, handleApiError } from '../../utils/reducer';

const defaultState = {
    categories: [],
    status: '',
    error: null,
};

export default createReducer(defaultState, {
    ...handleApiError('Reducer - inForm: set errors', 'Reducer - inForm: clear errors'),

    'Reducer - inForm: save income categories': (state, { payload: categories }) => ({
        ...state,
        categories,
    }),

    'Reducer - inForm: set status to done': (state) => ({
        ...state,
        status: 'done',
    }),

    'Reducer - inForm: set status to fail': (state) => ({
        ...state,
        status: 'fail',
    }),

    'Reducer - inForm: set status to start': (state) => ({
        ...state,
        status: 'start',
    }),
});
