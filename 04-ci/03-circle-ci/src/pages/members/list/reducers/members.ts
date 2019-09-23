import { Reducer } from 'redux';
import { Member } from '../../../../rest-api/model';
import { MembersAction } from '../actions';
import { actionIds } from '../actions/actionIds';

export interface MembersState {
  members: Member[];
  serverError: string | null;
}

const createInitialState = (): MembersState => ({
  members: [],
  serverError: null,
});

type MembersReducer = Reducer<MembersState, MembersAction>;
export const membersReducer: MembersReducer = (state = createInitialState(), action) => {
  switch (action.type) {
    case actionIds.FETCH_MEMBERS_SUCCESS:
      return handleFetchMembersSuccess(state, action.payload);
    case actionIds.FETCH_MEMBERS_ERROR:
      return handleFetchMembersError(state, action.payload);
    default:
      return state;
  }
};

const handleFetchMembersSuccess = (_state: MembersState, members: Member[]): MembersState => ({
  members,
  serverError: null,
});

const handleFetchMembersError = (state: MembersState, error: string): MembersState => ({
  ...state,
  serverError: error,
});
