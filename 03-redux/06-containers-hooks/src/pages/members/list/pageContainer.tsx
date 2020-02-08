import * as React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { State } from '../../reducers';
import { fetchMembersRequest } from './actions/fetchMembers';
import { MemberListPage } from './page';
import { getMembersListVM, getServerError } from './selectors';

const mapStateToProps = (state: State) => ({
  members: getMembersListVM(state),
  serverError: getServerError(state),
});

const useFetchMembers = () => {
  const dispatch = useDispatch();
  return React.useCallback(() => {
    dispatch(fetchMembersRequest());
  }, [dispatch]);
};

export const MemberListPageContainer: React.FunctionComponent = () => {
  const { members, serverError } = useSelector(mapStateToProps, shallowEqual);
  const fetchMembers = useFetchMembers();
  React.useEffect(fetchMembers, []);

  return <MemberListPage members={members} serverError={serverError} />;
};

