import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App } from './app';
import { routes } from './common/constants/routes';
import { MemberListPageContainer } from './pages';

export const Routes = () => (
  <App>
    <Switch>
      <Route exact={true} path={routes.default} component={MemberListPageContainer} />
    </Switch>
  </App>
);
