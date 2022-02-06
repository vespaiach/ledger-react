import update from 'immutability-helper';
import { Reason } from '../../graphql/graphql.generated';

import { LedgerAction, ReasonActionType } from '../types';

export interface ReasonState {
  data: Reason[];
}

const initialState: ReasonState = {
  data: [],
};

export function reasonReducer(state: ReasonState = initialState, action: LedgerAction) {
  switch (action.type) {
    case ReasonActionType.RECEIVE:
      return update(state, {
        data: { $set: action.payload },
      });
    default:
      return state;
  }
}
