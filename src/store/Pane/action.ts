import { Pane } from '../../types';
import { PaneActionType } from '../types';

export interface PushPaneAction {
  type: PaneActionType.PUSH;
  payload: Pane;
}

export interface PopPaneAction {
  type: PaneActionType.POP;
  payload: number;
}

export interface RemovePaneAction {
  type: PaneActionType.REMOVE;
  payload: number
}

export const pushPane = (pane: Pane): PushPaneAction => ({
  type: PaneActionType.PUSH,
  payload: pane,
});

export const removePane = (paneIndex: number): RemovePaneAction => ({
  type: PaneActionType.REMOVE,
  payload: paneIndex,
});

export const popPane = (paneIndex: number): PopPaneAction => ({
  type: PaneActionType.POP,
  payload: paneIndex
});
