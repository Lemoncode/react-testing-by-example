import * as React from 'react';

interface Props {
  person: string;
}

export const SayHello: React.FunctionComponent<Props> = props => {
  const { person } = props;
  return <h1>Hello {person}!</h1>;
};
