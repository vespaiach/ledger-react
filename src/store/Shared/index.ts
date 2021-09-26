import { SharedActionType } from '../types';
import { ShareState, UpdateFieldAction } from './action';

const initialState: ShareState = {
  loading: false,
  error: null,
};

export function sharedReducer(state: ShareState = initialState, action: UpdateFieldAction<keyof ShareState>) {
  switch (action.type) {
    case SharedActionType.UPDATE:
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
}
