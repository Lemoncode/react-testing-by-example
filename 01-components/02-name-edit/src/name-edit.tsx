import * as React from 'react';

export const NameEdit = () => {
  const [username, setUsername]  = React.useState('');

  return(
    <>
      <h3 data-testid="username-label">{username}</h3>
      <input data-testid="username-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
    </>
  )
}
