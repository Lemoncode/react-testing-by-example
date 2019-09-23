import * as React from 'react';
import { Member } from '../viewModel';
import { Body } from './body';
import { Header } from './header';

interface Props {
  members: Member[];
}

export const Table: React.FunctionComponent<Props> = (props) => (
  <table className="table table-striped">
    <Header />
    <Body members={props.members} />
  </table>
);
