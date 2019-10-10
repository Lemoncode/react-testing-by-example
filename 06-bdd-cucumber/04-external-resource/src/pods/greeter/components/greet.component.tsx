import * as React from 'react';

interface Props {
  greet: string;
}

export const GreetComponent: React.FunctionComponent<Props> = props => {
  const { greet } = props;

  return <h3 data-testid="greet">{greet}</h3>;
};
