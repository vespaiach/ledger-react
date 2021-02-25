import { Action, AppBusyCode, AppMessageCode } from '../types.d';

export const BUSY = 'show app busy';
export const IDLE = 'show app idle';
export const SHOW_MESSAGE = 'show app message';
export const CLEAR_MESSAGE = 'clear app message';

export const appLoadingAction = (): Action<string, AppBusyCode> => ({
    type: BUSY,
    payload: AppBusyCode.Loading,
});

export const appSavingAction = (): Action<string, AppBusyCode> => ({
    type: BUSY,
    payload: AppBusyCode.Saving,
});

export const appIdleAction = (): Action<string, AppBusyCode> => ({
    type: IDLE,
    payload: AppBusyCode.Idle,
});

export const showMessageAction = (code: AppMessageCode): Action<string, AppMessageCode> => ({
    type: SHOW_MESSAGE,
    payload: code,
});

export const clearMessageAction = (): Action => ({
    type: CLEAR_MESSAGE,
});
