import * as React from 'react';

interface Props {
  userName: string;
}

export const Display: React.FunctionComponent<Props> = props => {
  const { userName } = props;

  return <h3 data-testid="userName-label">{userName}</h3>;
};
