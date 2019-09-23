import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export interface State {
  router: any;
}

export const createRootReducer = history =>
  combineReducers<State>({
    router: connectRouter(history),
  });
