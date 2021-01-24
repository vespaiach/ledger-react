import { createReducer, handleApiError } from '../../utils/reducer';

const defaultState = {
    error: null,
    status: '',
    email: '',
};

export default createReducer(defaultState, {
    ...handleApiError('Reducer - recovery: set errors', 'Reducer - recovery: clear errors'),

    'Reducer - recovery: set status sent': (state) => ({ ...state, status: 'sent' }),

    'Reducer - recovery: reset': () => ({ error: null, status: '', email: '' }),

    'Reducer - recovery: set email': (state, payload) => ({ ...state, email: payload }),
});
