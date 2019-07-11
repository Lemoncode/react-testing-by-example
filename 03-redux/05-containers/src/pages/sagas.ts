import { membersRootSaga } from './members';

export function* rootSaga() {
  yield membersRootSaga();
}
