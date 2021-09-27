import update from 'immutability-helper';
import { Transaction } from '../../graphql.generated';

import { FilterActionType, LedgerAction, PageActionType, TransactionActionType } from '../types';
import { TransactionFilter } from './action';

export interface TransactionState {
  filter: TransactionFilter;
  data: Transaction[];
  pages: (boolean | null)[];
  lookup: Record<number, number>;
}

const intialState: TransactionState = {
  filter: {
    amountFrom: null,
    amountTo: null,
    dateFrom: null,
    dateTo: null,
    reason: null,
  },
  data: [],
  pages: [],
  lookup: {},
};

export function transactionReducer(
  state: TransactionState = intialState,
  action: LedgerAction
): TransactionState {
  switch (action.type) {
    case FilterActionType.UPDATE:
      return update(state, {
        filter: {
          [action.payload.field]: {
            $set: action.payload.value,
          },
        },
      });

    case PageActionType.RECEIVE:
      return update(state, {
        pages: { $set: Array(action.payload.totalPages).fill(null) },
        data: { $set: Array(action.payload.totalRecords) },
      });

    case PageActionType.UPDATE:
      return update(state, {
        pages: { $splice: [[action.payload.page, 1, action.payload.status]] },
      });

    case TransactionActionType.RECEIVE: {
      const { offset, data } = action.payload;
      const len = data.length;
      const idLookup = data.reduce<Record<number, number>>(
        (a, t, index) => ((a[t.id] = offset + index), a),
        {}
      );

      return update(state, {
        data: {
          $splice: [[offset, len, ...data.map((t) => ({ ...t, date: new Date(t.date) }))]],
        },
        lookup: {
          $merge: idLookup,
        },
      });
    }

    case TransactionActionType.RECEIVE_ONE: {
      const index = state.data.findIndex((t) => t.id === action.payload.id);
      if (index > -1) {
        return update(state, {
          data: {
            $splice: [[index, 1, { ...action.payload, date: new Date(action.payload.date) }]],
          },
        });
      }
      return state;
    }

    case TransactionActionType.RESET:
      return update(state, {
        data: { $set: intialState.data },
        pages: { $set: intialState.pages },
        lookup: { $set: intialState.lookup },
      });

    default:
      return state;
  }
}
