/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { REQUIRE_SIGNIN, CLOSE_SIGNIN } from '../../actions/auth';
import { BUSY, CLEAR_MESSAGE, IDLE, SHOW_MESSAGE } from '../../actions/system';
import { Action, AppBusyCode, AppMessageCode, WholeAppState } from '../../types.d';
import { createReducer } from '../../utils/reducer';

const defaultState: WholeAppState = {
    retainedAction: null,
    showSigninDialog: false,
    messageCode: null,
    busyCode: AppBusyCode.Idle,
};

export default createReducer<WholeAppState>(defaultState, {
    [REQUIRE_SIGNIN]: (state, { payload }: Action<string, Action | undefined>) => ({
        ...state,
        showSigninDialog: true,
        retainedAction: payload || null,
    }),

    [CLOSE_SIGNIN]: (state) => ({
        ...state,
        showSigninDialog: false,
        retainedAction: null,
    }),

    [SHOW_MESSAGE]: (state, { payload }: Action<string, AppMessageCode>) => {
        if (payload) {
            return {
                ...state,
                messageCode: payload,
            };
        }
        return state;
    },

    [CLEAR_MESSAGE]: (state) => ({
        ...state,
        messageCode: null,
    }),

    [BUSY]: (state, { payload }: Action<string, AppBusyCode>) => {
        if (payload) {
            return {
                ...state,
                busyCode: payload,
            };
        }
        return state;
    },

    [IDLE]: (state) => ({
        ...state,
        busyCode: AppBusyCode.Idle,
    }),
});
