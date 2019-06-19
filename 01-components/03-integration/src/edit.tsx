import * as React from 'react';

interface Props {
  username: string;
  onSetUsername : (username: string) => void;
}

export const Edit  = (props : Props) => {
  const {username, onSetUsername} = props;

  return (
    <input
      data-testid="username-input"
      value={username}
      onChange={(e) => onSetUsername(e.target.value)}
      />
  )
}
