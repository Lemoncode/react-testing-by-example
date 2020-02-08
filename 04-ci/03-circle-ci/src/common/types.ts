import { Action } from 'redux';

export interface BaseAction<T = string, P = null> extends Action<T> {
  payload: P;
}
