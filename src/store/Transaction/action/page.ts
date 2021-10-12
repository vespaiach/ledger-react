import {
  PagingActionType,
  PagingData,
  ReceiveTotalPagesAction,
  RequestTotalPagesAction,
  UpdatePageAction,
} from '../../types';

export const requestTotalPages = (): RequestTotalPagesAction => ({
  type: PagingActionType.REQUEST,
});

export const receivePagingData = (payload: PagingData): ReceiveTotalPagesAction => ({
  type: PagingActionType.RECEIVE,
  payload,
});

export const updatePage = (page: number, status: boolean): UpdatePageAction => ({
  type: PagingActionType.UPDATE,
  payload: {
    page,
    status,
  },
});
