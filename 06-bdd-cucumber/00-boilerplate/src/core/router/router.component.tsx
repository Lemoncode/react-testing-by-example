import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './history';
import { switchRoutes } from './routes';
// TODO: Import scenes to render in Route component
import {} from 'scenes';

export const RouterComponent = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        exact={true}
        path={switchRoutes.list}
        component={() => <h1>Example list component</h1>}
      />
      <Route
        path={switchRoutes.edit}
        component={() => <h1>Example edit component</h1>}
      />
    </Switch>
  </ConnectedRouter>
);
