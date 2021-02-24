import { Action } from '../types.d';

export const SIGNIN = 'sign in';
export const SIGNOUT = 'sign out';
export const REQUIRE_SIGNIN = 'request user to sign in to continue';
export const CLOSE_SIGNIN = 'close sign in dialog';

/**
 * Pass an action into previsousAction argument, if we need to resume it after user's sign in.
 */
export const userSignin = (
    email: string,
    password: string
): Action<string, { email: string; password: string }> => ({
    type: SIGNIN,
    payload: { email, password },
});

/**
 * Show signin dialog.
 */
export const requireSignin = (
    previousAction: Action | undefined
): Action<string, Action | undefined> => ({
    type: REQUIRE_SIGNIN,
    payload: previousAction,
});

export const userSignout = (): Omit<Action, 'payload'> => ({
    type: SIGNOUT,
});
