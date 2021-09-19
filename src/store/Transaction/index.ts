import update from 'immutability-helper';

import { LedgerAction, TransactionActionType } from '../types';
import { TransactionState } from './action';

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
    case TransactionActionType.UPDATE_FILTER:
      return update(state, {
        filter: {
          [action.payload.field]: {
            $set: action.payload.value,
          },
        },
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

    case TransactionActionType.RECEIVE_PAGE:
      return update(state, {
        pages: { $set: Array(action.payload.totalPages).fill(null) },
        data: { $set: Array(action.payload.totalRecords) },
      });

    case TransactionActionType.SET_PAGE:
      return update(state, {
        pages: { $splice: [[action.payload.page, 1, action.payload.status]] },
      });

    case TransactionActionType.UPDATE_PAGE: {
      if (state.pages) {
        state.pages[action.payload] = true;
        return update(state, {
          pages: { $set: [...state.pages] },
        });
      }
      return state;
    }

    default:
      return state;
  }
}
