import * as React from 'react';
import { getNameCollection } from './name-api';

export const NameCollection: React.FunctionComponent = () => {
  const [nameCollection, setNameCollection] = React.useState([]);

  React.useEffect(() => {
    getNameCollection().then(names => {
      setNameCollection(names);
    });
  }, []);

  return (
    <ul>
      {nameCollection.map(name => (
        <li key={name} data-testid="name">
          {name}
        </li>
      ))}
    </ul>
  );
};
