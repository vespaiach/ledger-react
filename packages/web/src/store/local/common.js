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
    processing: '',

    showSignIn: false,
    lastAction: null,
    signinLoading: false,

    error: '',
    success: '',
};

export default createReducer(defaultState, {
    'Reducer: show signin loading': (state) => ({ ...state, signinLoading: true }),

    'Reducer: hide signin loading': (state) => ({ ...state, signinLoading: false }),

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

    'Reducer: show app success': (state, { payload: success }) => ({
        ...state,
        success,
    }),

    'Reducer: hide app success': (state) => ({
        ...state,
        success: '',
    }),

    'Reducer: show app synchronizing': (state) => ({
        ...state,
        processing: 'sync',
    }),

    'Reducer: show app loading': (state) => ({
        ...state,
        processing: 'load',
    }),

    'Reducer: clear app process': (state) => ({
        ...state,
        processing: '',
    }),
});
