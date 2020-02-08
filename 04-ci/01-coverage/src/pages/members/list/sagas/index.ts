import { watchFetchMembersRequest } from './fetchMembersSaga';

export function* membersRootSaga() {
  yield watchFetchMembersRequest();
}
