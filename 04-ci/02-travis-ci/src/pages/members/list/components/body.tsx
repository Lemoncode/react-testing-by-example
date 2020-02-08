import * as React from 'react';
import { Member } from '../viewModel';
import { Row } from './row';

interface Props {
  members: Member[];
}

export const Body: React.FunctionComponent<Props> = ({ members }) => (
  <tbody>
    {members.map((member) => (
      <Row key={member.id} member={member} />
    ))}
  </tbody>
);
