import update from 'immutability-helper';

import {
  FilterActionType,
  LedgerAction,
  OtherActionType,
  PagingActionType,
  TransactionActionType,
  TransactionState,
} from '../types';

/**
 * Todo: move to app configuration
 */
const Limit = 50;

const intialState: TransactionState = {
  filter: {
    amountFrom: null,
    amountTo: null,
    dateFrom: null,
    dateTo: null,
    reason: null,
    limit: Limit,
  },
  data: [],
  pages: [],
  byMonths: [],
  lookup: {},
  resetting: false,
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

    case PagingActionType.RECEIVE: {
      const { totalRecords, months } = action.payload;
      const totalPages = Math.floor(totalRecords / Limit) + (totalRecords % Limit) === 0 ? 0 : 1;

      const byMonths = [];
      let len = months.length;
      let offset = 0;
      for (let i = 0; i < len; i++) {
        if (i > 0) {
          offset += months[i - 1].count;
        }
        byMonths.push({ month: new Date(months[i].month), offset });
      }

      return update(state, {
        pages: { $set: Array(totalPages).fill(null) },
        data: { $set: Array(action.payload.totalRecords) },
        lookup: { $set: {} },
        byMonths: { $set: byMonths },
      });
    }

    case PagingActionType.UPDATE:
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

    case TransactionActionType.CHANGE_TOTAL_TRANSACTION: {
      /**
       * Add/remove a new record will make whole list order shifted.
       * Since, we don't know exactly where the position of that new/removing record is.
       * We have to reset the whole list and call API to build up it again.
       */
      const totalRecords = state.data.length + action.payload;
      const totalPages = Math.floor(totalRecords / Limit) + (totalRecords % Limit === 0 ? 0 : 1);

      return update(state, {
        pages: { $set: Array(totalPages).fill(null) },
        data: { $set: Array(totalRecords) },
        lookup: { $set: {} },
        resetting: { $set: true },
      });
    }

    case OtherActionType.UPDATE:
      return update(state, action.payload);

    default:
      return state;
  }
}
