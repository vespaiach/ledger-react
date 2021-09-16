import update from 'immutability-helper';

import { LedgerAction, SharedActionType } from '../types';
import { ShareState } from './action';

const initialState: ShareState = {
  fetching: false,
  error: null,
};

export function reducer(state: ShareState = initialState, action: LedgerAction) {
  switch (action.type) {
    case SharedActionType.ERROR:
      return update(state, {
        error: { $set: action.payload },
      });
    case SharedActionType.LOADING:
      return update(state, {
        fetching: { $set: action.payload },
      });
    default:
      return state;
  }
}
