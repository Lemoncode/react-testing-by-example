import { runSaga, Saga } from 'redux-saga';
import { BaseAction } from '../types';

export async function getDispatchedActionsFromSaga(saga: Saga, initialAction: BaseAction) {
  const dispatchedActions = [];

  await runSaga(
    {
      dispatch: (action) => dispatchedActions.push(action),
    },
    saga,
    initialAction
  ).toPromise();

  return dispatchedActions;
}
