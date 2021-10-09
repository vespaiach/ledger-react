import { FilterActionType, TransactionFilter, UpdateFilterAction } from '../../types';

export const updateFilter = (
  field: keyof TransactionFilter,
  value: TransactionFilter[keyof TransactionFilter]
): UpdateFilterAction => ({
  type: FilterActionType.UPDATE,
  payload: { field, value },
});
