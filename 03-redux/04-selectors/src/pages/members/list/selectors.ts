import { createSelector } from 'reselect';
import { State } from '../../reducers';
import { mapMemberListModelToVM } from './mappers';

export const getMembersState = (state: State) => state.members;

export const getMembersList = createSelector(
  getMembersState,
  ({ members }) => members
);

export const getMembersListVM = createSelector(
  getMembersList,
  (members) => mapMemberListModelToVM(members)
);

export const getServerError = createSelector(
  getMembersState,
  ({ serverError }) => serverError
);
