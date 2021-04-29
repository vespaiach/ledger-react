import { Action, AppBusyCode, AppMessageCode } from '../types';

export const BUSY = 'show app busy';
export const IDLE = 'show app idle';
export const SHOW_MESSAGE = 'show app message';
export const CLEAR_MESSAGE = 'clear app message';

export const appLoadingAction = (): Action<AppBusyCode> => ({
  type: BUSY,
  payload: AppBusyCode.Loading,
});

export const appSavingAction = (): Action<AppBusyCode> => ({
  type: BUSY,
  payload: AppBusyCode.Saving,
});

export const appIdleAction = (): Action<AppBusyCode> => ({
  type: IDLE,
  payload: AppBusyCode.Idle,
});

export const showMessageAction = (code: AppMessageCode): Action<AppMessageCode> => ({
  type: SHOW_MESSAGE,
  payload: code,
});

export const clearMessageAction = (): Action => ({
  type: CLEAR_MESSAGE,
});
