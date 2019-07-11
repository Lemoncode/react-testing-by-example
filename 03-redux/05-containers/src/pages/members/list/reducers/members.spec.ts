import deepFreeze from 'deep-freeze';
import { BaseAction } from '../../../../common/types';
import { Member } from '../../../../rest-api/model';
import { MembersAction } from '../actions';
import { actionIds } from '../actions/actionIds';
import { FetchMembersErrorAction, FetchMembersSuccessAction } from '../actions/fetchMembers';
import { membersReducer, MembersState } from './members';

describe('pages/members/list/reducers/members reducer tests', () => {
  it('should return the expected state when initialized with undefined initial state', () => {
    // Arrange
    const action: BaseAction = {
      type: 'foo',
      payload: null,
    };

    const initialState: MembersState = {
      members: [],
      serverError: null,
    };

    // Act
    const result = membersReducer(undefined, action as MembersAction);

    // Assert
    expect(result).toEqual(initialState);
  });

  it('should return the expected state when action type is FETCH_MEMBERS_SUCCESS', () => {
    // Arrange
    const members: Member[] = [{ id: 1, login: 'test name', avatar_url: 'test avatar' }];
    const action: FetchMembersSuccessAction = {
      type: actionIds.FETCH_MEMBERS_SUCCESS,
      payload: members,
    };
    const initialState: MembersState = deepFreeze({
      members: [],
      serverError: 'test error',
    });

    // Act
    const result = membersReducer(initialState, action);

    // Assert
    expect(result.members).toBe(members);
    expect(result.serverError).toBeNull();
  });

  it('should return the expected state when action type is FETCH_MEMBERS_ERROR', () => {
    // Arrange
    const action: FetchMembersErrorAction = {
      type: actionIds.FETCH_MEMBERS_ERROR,
      payload: 'test error',
    };
    const initialState: MembersState = deepFreeze({
      members: [],
      serverError: null,
    });

    // Act
    const result = membersReducer(initialState, action);

    // Assert
    expect(result.members).toBe(initialState.members);
    expect(result.serverError).toBe('test error');
  });

  it('should return the current state if action type is not known', () => {
    // Arrange
    const action: BaseAction = {
      type: 'foo',
      payload: null,
    };
    const initialState: MembersState = deepFreeze({
      members: [],
      serverError: null,
    });

    // Act
    const result = membersReducer(initialState, action as MembersAction);

    // Assert
    expect(result).toBe(initialState);
  });
});
