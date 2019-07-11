import { Member } from '../../../../rest-api/model';
import { actionIds } from './actionIds';
import { fetchMembersError, fetchMembersRequest, fetchMembersSuccess } from './fetchMembers';

describe('pages/members/list/actions/fetchMembers action creators', () => {
  describe('fetchMembersRequest', () => {
    it('should return an action with type FETCH_MEMBERS_REQUEST and payload null', () => {
      // Arrange

      // Act
      const result = fetchMembersRequest();

      // Assert
      expect(result.type).toBe(actionIds.FETCH_MEMBERS_REQUEST);
      expect(result.payload).toBeNull();
    });
  });

  describe('fetchMembersSuccess', () => {
    it('should return an action with type FETCH_MEMBERS_SUCCESS and payload the given members', () => {
      // Arrange
      const members: Member[] = [
        { id: 1, login: 'John', avatar_url: 'John avatar' },
        { id: 2, login: 'Jane', avatar_url: 'Jane avatar' },
        { id: 3, login: 'David', avatar_url: 'David avatar' },
      ];

      // Act
      const result = fetchMembersSuccess(members);

      // Assert
      expect(result.type).toBe(actionIds.FETCH_MEMBERS_SUCCESS);
      expect(result.payload).toBe(members);
    });
  });

  describe('fetchMembersError', () => {
    it('should return an action with type FETCH_MEMBERS_ERROR and payload the given error', () => {
      // Arrange
      const error = 'Something went wrong';

      // Act
      const result = fetchMembersError(error);

      // Assert
      expect(result.type).toBe(actionIds.FETCH_MEMBERS_ERROR);
      expect(result.payload).toBe(error);
    });
  });
});
