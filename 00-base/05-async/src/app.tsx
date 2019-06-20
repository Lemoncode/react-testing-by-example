import * as React from 'react';
import { getMembers } from './api';

export const App: React.FunctionComponent = () => {
  React.useEffect(() => {
    getMembers().then(members => {
      console.log(members);
    });
  });

  return <h1>React testing by sample</h1>;
};
