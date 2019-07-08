import { runSaga } from 'redux-saga';

export async function getDispatchedActionsFromSaga(saga, initialAction) {
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
