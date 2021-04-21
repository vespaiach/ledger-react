import { Action } from '../types.d';

export const SIGNIN = 'sign in';
export const SIGNOUT = 'sign out';
export const REQUIRE_SIGNIN = 'request user to sign in to continue';
export const CLOSE_SIGNIN = 'close sign in dialog';

/**
 * Close sign in dialog.
 */
export const closeSigninAction = (): Action => ({
  type: CLOSE_SIGNIN,
});

/**
 * Pass an action into previsousAction argument, if we need to resume it after user's sign in.
 */
export const userSigninAction = (
  email: string,
  password: string
): Action<string, { email: string; password: string }> => ({
  type: SIGNIN,
  payload: { email, password },
});

/**
 * Show signin dialog.
 */
export const requireSigninAction = (
  previousAction: Action | undefined
): Action<string, Action | undefined> => ({
  type: REQUIRE_SIGNIN,
  payload: previousAction,
});

export const userSignoutAction = (): Action => ({
  type: SIGNOUT,
});
