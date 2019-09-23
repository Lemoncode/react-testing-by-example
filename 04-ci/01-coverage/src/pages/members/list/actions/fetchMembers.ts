import { BaseAction } from '../../../../common/types';
import { Member } from '../../../../rest-api/model';
import { actionIds } from './actionIds';

export type FetchMembersRequestAction = BaseAction<typeof actionIds.FETCH_MEMBERS_REQUEST>;
export const fetchMembersRequest = (): FetchMembersRequestAction => ({
  type: actionIds.FETCH_MEMBERS_REQUEST,
  payload: null,
});

export type FetchMembersSuccessAction = BaseAction<typeof actionIds.FETCH_MEMBERS_SUCCESS, Member[]>;

export const fetchMembersSuccess = (members: Member[]): FetchMembersSuccessAction => ({
  type: actionIds.FETCH_MEMBERS_SUCCESS,
  payload: members,
});

export type FetchMembersErrorAction = BaseAction<typeof actionIds.FETCH_MEMBERS_ERROR, string>;
export const fetchMembersError = (error: string): FetchMembersErrorAction => ({
  type: actionIds.FETCH_MEMBERS_ERROR,
  payload: error,
});
