import * as React from 'react';
import { Link } from 'react-router-dom';
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
        <Link key={name} to={`/users/${name}`}>
          <li data-testid="name">{name}</li>
        </Link>
      ))}
    </ul>
  );
};
