import update from 'immutability-helper';

import { Pane } from '../../types';
import { LedgerAction, PaneActionType } from '../types';

export type PaneState = Pane[];

const intialState: PaneState = [];

export function paneReducer(state: PaneState = intialState, action: LedgerAction) {
  switch (action.type) {
    case PaneActionType.PUSH:
      return update(state, { $push: [action.payload] });

    case PaneActionType.POP:
      return update(state, { $splice: [[state.length - 1, 1]] });

    default:
      return state;
  }
}
