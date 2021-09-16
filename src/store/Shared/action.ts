import { Maybe } from 'graphql/jsutils/Maybe';

import { SharedActionType } from '../types';

export interface ShareState {
  error: Maybe<string>;
  fetching: boolean;
}

export interface AppLoadingAction {
  type: SharedActionType.LOADING;
  payload: boolean;
}

export interface AppErrorAction {
  type: SharedActionType.ERROR;
  payload: string;
}

export const appGotError = (error: string): AppErrorAction => ({
  type: SharedActionType.ERROR,
  payload: error,
});

export const appLoading = (loading: boolean): AppLoadingAction => ({
  type: SharedActionType.LOADING,
  payload: loading,
});
