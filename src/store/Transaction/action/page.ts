import { PageActionType, ReceiveTotalPagesAction, RequestTotalPagesAction, UpdatePageAction } from '../../types';


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
