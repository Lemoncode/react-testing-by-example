import { runSaga, Saga } from 'redux-saga';
import { BaseAction } from '../types';

export async function getDispatchedActionsFromSaga<S>(saga: Saga, initialAction: BaseAction, state?: S) {
  const dispatchedActions = [];

  await runSaga(
    {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => state,
    },
    saga,
    initialAction
  ).toPromise();

  return dispatchedActions;
}
