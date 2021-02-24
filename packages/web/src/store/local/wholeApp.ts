/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { REQUIRE_SIGNIN, CLOSE_SIGNIN } from '../../actions/auth';
import { CLEAR_MESSAGE, SHOW_MESSAGE } from '../../actions/system';
import { Action, AppMessageSeverity, WholeAppState } from '../../types.d';
import { createReducer } from '../../utils/reducer';

const defaultState: WholeAppState = {
    retainedAction: null,
    showSigninDialog: false,
    message: null,
    messageSeverity: null,
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

    [SHOW_MESSAGE]: (state, { payload }) => ({
        ...state,
        message: payload,
        messageSeverity: AppMessageSeverity.Error,
    }),

    [CLEAR_MESSAGE]: (state) => ({
        ...state,
        message: null,
        messageSeverity: null,
    }),
});
