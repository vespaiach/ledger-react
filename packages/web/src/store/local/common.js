/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { createReducer } from '../../utils/reducer';

const defaultState = {
    loading: false,

    showSignIn: false,
    lastAction: null,
    signinLoading: false,

    error: '',
};

export default createReducer(defaultState, {
    'Reducer: show signin loading': (state) => ({ ...state, signinLoading: true }),

    'Reducer: hide signin loading': (state) => ({ ...state, signinLoading: false }),

    'Reducer: show app loading': (state) => ({
        ...state,
        loading: true,
    }),

    'Reducer: hide app loading': (state) => ({
        ...state,
        loading: false,
    }),

    'Reducer: show sign in dialog': (state, { payload: lastAction }) => ({
        ...state,
        showSignIn: true,
        lastAction,
    }),

    'Reducer: close sign in dialog': (state) => ({
        ...state,
        showSignIn: false,
        lastAction: null,
    }),

    'Reducer: show app error': (state, { payload: error }) => ({
        ...state,
        error,
    }),

    'Reducer: hide app error': (state) => ({
        ...state,
        error: '',
    }),
});
