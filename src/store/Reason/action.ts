import { Reason } from '../../graphql.generated';
import { ReasonActionType } from '../types';

export interface RequestReasonsAction {
  type: ReasonActionType.REQUEST;
}

export interface ReceiveReasonsAction {
  type: ReasonActionType.RECEIVE;
  payload: Reason[];
}

export const requestReasons = (): RequestReasonsAction => ({
  type: ReasonActionType.REQUEST,
});

export const receiveReasons = (reasons: Reason[]): ReceiveReasonsAction => ({
  type: ReasonActionType.RECEIVE,
  payload: reasons,
});
