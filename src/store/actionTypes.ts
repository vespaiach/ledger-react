import { Maybe, Reason, Transaction } from '../graphql.generated';

export enum ReasonActionType {
  REQUEST = '@Reason/request-list',
  RECEIVE = '@Reason/receive-list',
}

export enum TransactionActionType {
  REQUEST_BY_DATE = '@Transaction/request-list-by-date',
  REQUEST_BY_AMOUNT = '@Transaction/request-list-by-amount',
  REQUEST_BY_REASON = '@Transaction/request-list-by-reason',
  REQUEST_BY_ID = '@Transaction/request-by-id',
}

export type LedgerAction =
  | {
      type: ReasonActionType.REQUEST;
    }
  | {
      type: ReasonActionType.RECEIVE;
      payload: Maybe<Reason[]>;
    }
  | {
      type: TransactionActionType.REQUEST_BY_DATE;
      payload: {
        dateFrom?: Date;
        dateTo?: Date;
      };
    }
  | {
      type: TransactionActionType.REQUEST_BY_AMOUNT;
      payload: {
        amountFrom?: number;
        amountTo?: number;
      };
    }
  | {
      type: TransactionActionType.REQUEST_BY_REASON | TransactionActionType.REQUEST_BY_ID;
      payload: number;
    };
