import * as React from 'react';

interface Props {
  person : string;
}

export const SayHello = (props : Props) => {
  return (
    <h1>Hello {props.person}!</h1>
  )
}
