import * as React from 'react';
import { getUsersByFilter } from './api';

export const useFilterUsers = filter => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsersByFilter(filter).then(newUsers => {
      setUsers(newUsers);
    });
  }, [filter]);

  return {
    users,
  };
};
