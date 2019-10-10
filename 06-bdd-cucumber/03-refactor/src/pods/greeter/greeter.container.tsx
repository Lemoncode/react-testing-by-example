import * as React from 'react';
import { GreetComponent } from './components/greet.component';
import { GreetSetterComponent } from './components/greet-setter.component';

export const GreeterContainer: React.FunctionComponent = () => {
  const [greet, setGreet] = React.useState('');

  return (
    <>
      {/* <h3 data-testid="greet">{greet}</h3>
      <input data-testid="greet-setter" type="text"
        value={greet}
        onChange={(e) => setGreet(e.target.value)}
      /> */}
      <GreetComponent greet={greet} />
      <GreetSetterComponent greet={greet} onSetGreet={setGreet} />
    </>
  );
};
