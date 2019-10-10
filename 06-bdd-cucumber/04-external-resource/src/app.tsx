import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import { RouterComponent } from 'core/router';
import { store } from 'core/store';

const App = () => (
  <Provider store={store}>
    <RouterComponent />
  </Provider>
);

export default hot(App);
