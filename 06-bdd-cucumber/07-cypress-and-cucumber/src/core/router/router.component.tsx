import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './history';
import { switchRoutes } from './routes';
// TODO: Import scenes to render in Route component
// import {} from 'scenes';
import { GreeterScene, TodosScene } from '../../scenes';

console.log(switchRoutes.users);

export const RouterComponent = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        exact={true}
        path={switchRoutes.greeter}
        component={GreeterScene}
      />
      <Route path={switchRoutes.users} component={TodosScene} />
    </Switch>
  </ConnectedRouter>
);
