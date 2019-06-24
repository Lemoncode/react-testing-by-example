import * as React from 'react';

export const NameEdit: React.FunctionComponent = () => {
  const [userName, setUserName] = React.useState('');

  return (
    <>
      <h3 data-testid="userName-label">{userName}</h3>
      <input
        data-testid="userName-input"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
    </>
  );
};
