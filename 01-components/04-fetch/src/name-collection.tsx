import * as React from 'react';
import {getNameCollection} from './name-api';

export const NameCollection = () => {
  const [nameCollection, setNameCollection] = React.useState([]);

  React.useEffect(() => {
    getNameCollection().then((data) =>
      setNameCollection(data)
    )
  },[]);

  return (
    <ul>
      {nameCollection.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  )
}
