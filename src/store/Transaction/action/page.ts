import { PageActionType } from '../../types';

export interface RequestTotalPagesAction {
  type: PageActionType.REQUEST;
}

export interface ReceiveTotalPagesAction {
  type: PageActionType.RECEIVE;
  payload: {
    totalPages: number;
    totalRecords: number;
  };
}

export interface UpdatePageAction {
  type: PageActionType.UPDATE;
  payload: {
    page: number;
    status: boolean;
  };
}

export const requestTotalPages = (): RequestTotalPagesAction => ({
  type: PageActionType.REQUEST,
});

export const receiveTotalPages = (payload: {
  totalPages: number;
  totalRecords: number;
}): ReceiveTotalPagesAction => ({
  type: PageActionType.RECEIVE,
  payload,
});

export const updatePage = (page: number, status: boolean): UpdatePageAction => ({
  type: PageActionType.UPDATE,
  payload: {
    page,
    status,
  },
});
