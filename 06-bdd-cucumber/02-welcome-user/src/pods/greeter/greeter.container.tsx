import * as React from 'react';

export const GreeterContainer: React.FunctionComponent = () => {
  const [greet, setGreet] = React.useState('');

  return (
    <>
      <h3 data-testid="greet">{greet}</h3>
      <input
        data-testid="greet-setter"
        type="text"
        value={greet}
        onChange={e => setGreet(e.target.value)}
      />
    </>
  );
};
