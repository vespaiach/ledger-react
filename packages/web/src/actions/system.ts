import { Action, AppMessageSeverity } from '../types.d';

export const SHOW_MESSAGE = 'show app message';
export const CLEAR_MESSAGE = 'clear app message';

export const loadingDisplay = (
    message: string
): Action<string, { message: string; severity: AppMessageSeverity }> => ({
    type: SHOW_MESSAGE,
    payload: { message, severity: AppMessageSeverity.Loading },
});

export const errorDisplay = (
    message: string
): Action<string, { message: string; severity: AppMessageSeverity }> => ({
    type: SHOW_MESSAGE,
    payload: { message, severity: AppMessageSeverity.Error },
});

export const successDisplay = (
    message: string
): Action<string, { message: string; severity: AppMessageSeverity }> => ({
    type: SHOW_MESSAGE,
    payload: { message, severity: AppMessageSeverity.Success },
});

export const informationDisplay = (
    message: string
): Action<string, { message: string; severity: AppMessageSeverity }> => ({
    type: SHOW_MESSAGE,
    payload: { message, severity: AppMessageSeverity.Information },
});

export const messageClear = (): Omit<Action, 'payload'> => ({
    type: CLEAR_MESSAGE,
});
