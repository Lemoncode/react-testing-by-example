import { all } from 'redux-saga/effects';
import { membersRootSaga } from './members';

export function* rootSaga() {
  yield all([membersRootSaga()]);
}
