import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GreetComponent } from './components/greet.component';
import { GreetSetterComponent } from './components/greet-setter.component';

const GreeterContainerPartial: React.FunctionComponent<
  RouteComponentProps
> = props => {
  const [greet, setGreet] = React.useState('');
  const { history } = props;
  const handleNavigation = () => {
    history.push('/users/1');
  };

  return (
    <>
      <GreetComponent greet={greet} />
      <GreetSetterComponent greet={greet} onSetGreet={setGreet} />
      <button onClick={handleNavigation}>navigate</button>
    </>
  );
};

export const GreeterContainer = withRouter(GreeterContainerPartial);
