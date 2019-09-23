import * as React from 'react';
import { Table } from './components';
import { Member } from './viewModel';

interface Props {
  serverError: string | null;
  members: Member[];
}

export const MemberListPage: React.FunctionComponent<Props> = ({ members, serverError }) => (
  <>
    <h2>Members</h2>
    {serverError ? <div className="alert alert-danger">{serverError}</div> : <Table members={members} />}
  </>
);
