import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../reducers';
import { MembersAction } from './actions';
import { fetchMembersRequest } from './actions/fetchMembers';
import { MemberListPage } from './page';
import { getMembersListVM, getServerError } from './selectors';
import { Member } from './viewModel';

const mapStateToProps = (state: State) => ({
  members: getMembersListVM(state),
  serverError: getServerError(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MembersAction>) => ({
  fetchMembers: () => {
    dispatch(fetchMembersRequest());
  },
});

interface Props {
  members: Member[];
  serverError: string | null;
  fetchMembers: () => void;
}

const PageContainer: React.FunctionComponent<Props> = React.memo(props => {
  const { members, serverError, fetchMembers } = props;
  React.useEffect(fetchMembers, []);

  return <MemberListPage members={members} serverError={serverError} />;
});

export const MemberListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);
