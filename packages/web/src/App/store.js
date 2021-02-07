import { createReducer } from '../utils/reducer';

const defaultState = {
    appLoading: false,
    showSignIn: false,

    flashMessage: '',
    flashMessageSeverity: '',

    signinLoading: false,
    authorized: false,

    errorMessage: '',
    errorSeverity: '',
};

export default createReducer(defaultState, {
    'Reducer - app: set app loading on': (state) => ({ ...state, appLoading: true }),
    'Reducer - app: set app loading off': (state) => ({ ...state, appLoading: false }),

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

    'Reducer - app: authorized': (state) => ({ ...state, authorized: true }),
    'Reducer - app: clear login info': (state) => ({ ...state, me: null }),

    'Reducer - app: clear error': (state) => ({ ...state, errorMessage: '', errorSeverity: '' }),
    'Reducer - app: set error': (state, { payload: { message, severity } }) => ({
        ...state,
        errorMessage: message,
        errorSeverity: severity,
    }),

    'Reducer: close sign in dialog': (state) => ({ ...state, showSignIn: false }),
    'Reducer: open sign in dialog': (state) => ({ ...state, showSignIn: true }),
});
