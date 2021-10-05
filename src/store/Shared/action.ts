import { Maybe } from 'graphql/jsutils/Maybe';

import { SharedActionType } from '../types';

export interface ShareState {
  error: Maybe<string>;
  loading: boolean;
}

export interface UpdateFieldAction<F extends keyof ShareState> {
  type: SharedActionType.UPDATE;
  payload: {
    field: string;
    value: ShareState[F];
  };
}

export interface ResetAction {
  type: SharedActionType.RESET;
}

export const updateField = <F extends keyof ShareState>(
  field: F,
  value: ShareState[F]
): UpdateFieldAction<F> => ({
  type: SharedActionType.UPDATE,
  payload: { field, value },
});

export const reset = (): ResetAction => ({
  type: SharedActionType.RESET,
});
