import { createReducer } from '../utils/reducer';

const defaultState = {
    loading: false,
    flashMessage: '',
    flashMessageSeverity: '',
    confirm: null,
    me: null,
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
});
