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
    offset: 0,
    limit: 100,
  },
  data: [],
  pages: null,
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
      return update(state, {
        data: { $splice: [[action.payload.offset, action.payload.limit, ...action.payload.data]] },
      });
    }

    case TransactionActionType.RECEIVE_PAGE:
      return update(state, {
        pages: { $set: Array(action.payload.totalPages).fill(false) },
        data: { $set: Array(action.payload.totalRecords) },
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
