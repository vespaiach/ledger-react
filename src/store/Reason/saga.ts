import { takeEvery, put, call } from 'redux-saga/effects';

import { GetReasonsDocument, Reason } from '../../graphql.generated';
import { updateField } from '../Shared/action';
import { ReasonActionType, SagaReturn } from '../types';
import { query } from '../utils';
import { receiveReasons } from './action';

export function* requestReasonListSaga() {
  yield takeEvery(ReasonActionType.REQUEST, requestReasonList);
}

function* requestReasonList() {
  const result: SagaReturn<{ reasons: Reason[] }> = yield call(query, GetReasonsDocument);

  if (result.error) {
    yield put(updateField('error', result.error));
  } else {
    yield put(receiveReasons(result.data?.reasons ?? []));
  }
}
