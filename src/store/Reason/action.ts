import { Action } from 'redux';
import { Maybe, Reason } from '../../graphql.generated';
import { LedgerAction, ReasonActionType } from '../actionTypes';

export const requestReasonAction = (): LedgerAction => ({ type: ReasonActionType.REQUEST });

export const receiveReasonAction = (payload: Maybe<Reason[]>): LedgerAction => ({
  type: ReasonActionType.RECEIVE,
  payload,
});
