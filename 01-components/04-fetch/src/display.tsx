import * as React from 'react';

interface Props {
  username: string;
}

export const Display = (props : Props) => {
  const {username} = props;

  return (
    <h3 data-testid="username-label">{username}</h3>
  )
}
