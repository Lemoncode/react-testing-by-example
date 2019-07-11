import * as React from 'react';
import { Member } from '../viewModel';

interface Props {
  member: Member;
}

export const Row: React.FunctionComponent<Props> = ({ member }) => (
  <tr data-testid="member">
    <td>
      <img src={member.avatarUrl} style={{ maxWidth: '10rem' }} />
    </td>
    <td>
      <span>{member.id}</span>
    </td>
    <td>
      <span>{member.name}</span>
    </td>
  </tr>
);
