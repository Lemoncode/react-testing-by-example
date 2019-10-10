import * as React from 'react';
import { GreetComponent } from './components/greet.component';
import { GreetSetterComponent } from './components/greet-setter.component';

export const GreeterContainer: React.FunctionComponent = () => {
  const [greet, setGreet] = React.useState('');

  return (
    <>
      <GreetComponent greet={greet} />
      <GreetSetterComponent greet={greet} onSetGreet={setGreet} />
    </>
  );
};
