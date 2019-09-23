import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { CoreState, coreReducers } from './reducers';

export interface State {
  router: any;
}

export const createRootReducer = history =>
  combineReducers<State>({
    router: connectRouter(history),
  });
