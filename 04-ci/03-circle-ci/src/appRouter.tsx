import * as React from 'react';
import { Router } from 'react-router';
import { history } from './history';
import { Routes } from './routes';

export const AppRouter: React.FunctionComponent = () => (
  <Router history={history}>
    <Routes />
  </Router>
);
