import { takeEvery, put } from 'redux-saga/effects';

import { GetReasonsDocument, Reason } from '../../graphql.generated';
import { appGotError, appLoading } from '../Shared/action';
import { ReasonActionType, SagaReturn } from '../types';
import { query } from '../utils';
import { receiveReasons } from './action';

export function* requestReasonListSaga() {
  yield takeEvery(ReasonActionType.REQUEST, requestReasonList);
}

function* requestReasonList() {
  yield put(appLoading(true));

  const result: SagaReturn<{ reasons: Reason[] }> = yield query<Reason[]>(GetReasonsDocument);

  yield put(appLoading(false));
  if (result.error) {
    yield put(appGotError(result.error));
  } else {
    yield put(receiveReasons(result.data?.reasons ?? []));
  }
}
