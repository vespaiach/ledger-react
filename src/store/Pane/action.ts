import { Pane } from '../../types';
import { PaneActionType } from '../types';

export interface PushPaneAction {
  type: PaneActionType.PUSH;
  payload: Pane;
}

export interface PopPaneAction {
  type: PaneActionType.POP;
}

export const pushPane = (pane: Pane): PushPaneAction => ({
  type: PaneActionType.PUSH,
  payload: pane,
});

export const popPane = (): PopPaneAction => ({
  type: PaneActionType.POP,
});
