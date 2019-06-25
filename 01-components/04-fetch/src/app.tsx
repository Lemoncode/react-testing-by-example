import * as React from 'react';
import { NameEdit } from './name-edit';
import { NameCollection } from './name-collection';

export const App: React.FunctionComponent = props => (
  <div>
    <h3>Hello !</h3>
    <NameEdit />
    <NameCollection />
  </div>
);
