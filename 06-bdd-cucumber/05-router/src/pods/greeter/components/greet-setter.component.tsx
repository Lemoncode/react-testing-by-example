import * as React from 'react';

interface Props {
  greet: string;
  onSetGreet: (greet: string) => void;
}

export const GreetSetterComponent: React.FunctionComponent<Props> = props => {
  const { greet, onSetGreet } = props;

  return (
    <input
      data-testid="greet-setter"
      type="text"
      value={greet}
      onChange={e => onSetGreet(e.target.value)}
    />
  );
};
