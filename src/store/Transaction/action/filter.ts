import { Maybe } from '../../../graphql.generated';
import { FilterActionType } from '../../types';

export interface TransactionFilter {
  amountFrom: Maybe<number>;
  amountTo: Maybe<number>;
  dateFrom: Maybe<number>;
  dateTo: Maybe<number>;
  reason: Maybe<number>;
}

export interface UpdateFilterAction {
  type: FilterActionType.UPDATE;
  payload: {
    field: keyof TransactionFilter;
    value: TransactionFilter[keyof TransactionFilter];
  };
}

export const updateFilter = (
  field: keyof TransactionFilter,
  value: TransactionFilter[keyof TransactionFilter]
): UpdateFilterAction => ({
  type: FilterActionType.UPDATE,
  payload: { field, value },
});
