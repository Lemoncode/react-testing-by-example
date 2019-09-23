import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMembers } from '../../../../rest-api/api/member';
import { Member } from '../../../../rest-api/model';
import { actionIds } from '../actions/actionIds';
import { fetchMembersError, FetchMembersRequestAction, fetchMembersSuccess } from '../actions/fetchMembers';

export function* watchFetchMembersRequest() {
  yield takeLatest(actionIds.FETCH_MEMBERS_REQUEST, fetchMembersSaga);
}

export function* fetchMembersSaga(_action: FetchMembersRequestAction) {
  try {
    const members: Member[] = yield call(fetchMembers);
    yield put(fetchMembersSuccess(members));
  } catch (error) {
    yield put(fetchMembersError(error.message));
  }
}
