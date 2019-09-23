import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { AppRouter } from './appRouter';
import { store } from './store';

const AppProvider: React.FunctionComponent = (props) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default hot(module)(AppProvider);
