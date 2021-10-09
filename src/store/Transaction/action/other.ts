import { OtherActionType, UpdateOtherFieldsAction } from '../../types';

export const clearResetting = (): UpdateOtherFieldsAction => ({
  type: OtherActionType.UPDATE,
  payload: { resetting: { $set: false } },
});
