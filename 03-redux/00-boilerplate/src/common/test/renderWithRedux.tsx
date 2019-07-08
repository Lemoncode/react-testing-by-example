import * as React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { State } from '../../pages';
import { Middleware } from 'redux';

export const renderWithRedux = (component: JSX.Element, initialState: State, middlewares?: Middleware[]) => {
  const store = configureStore(middlewares)(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
