import { State } from '../../reducers';
import * as mappers from './mappers';
import { getMembersList, getMembersListVM, getMembersState, getServerError } from './selectors';
import { Member } from './viewModel';

describe('pages/members/list/selectors', () => {
  describe('getMembersState', () => {
    it('should return the expected membersState from state', () => {
      // Arrange
      const state: State = {
        members: {
          members: [],
          serverError: null,
        },
      };

      // Act
      const result = getMembersState(state);

      // Assert
      expect(result).toBe(state.members);
    });
  });

  describe('getMembersList', () => {
    it('should return the expected members list from state', () => {
      // Arrange
      const state: State = {
        members: {
          members: [],
          serverError: null,
        },
      };

      // Act
      const result = getMembersList(state);

      // Assert
      expect(result).toBe(state.members.members);
    });
  });

  describe('getMembersListVM', () => {
    it('should return the expected members list from state', () => {
      // Arrange
      const state: State = {
        members: {
          members: [
            { id: 1, login: 'test login 1', avatar_url: 'test avatar 1' },
            { id: 2, login: 'test login 2', avatar_url: 'test avatar 2' },
          ],
          serverError: null,
        },
      };

      const membersVM: Member[] = [
        { id: 1, name: 'test login 1', avatarUrl: 'test avatar 1' },
        { id: 2, name: 'test login 2', avatarUrl: 'test avatar 2' },
      ];

      const mapMemberListModelToVM = jest.spyOn(mappers, 'mapMemberListModelToVM').mockImplementation(() => membersVM);

      // Act
      const result = getMembersListVM(state);

      // Assert
      expect(result).toBe(membersVM);
      expect(mapMemberListModelToVM).toHaveBeenCalledWith(state.members.members);
    });

    it('returns the same state without recomputations when it is called with same state', () => {
      // Arrange
      const state: State = {
        members: {
          members: [
            { id: 1, login: 'test login 1', avatar_url: 'test avatar 1' },
            { id: 2, login: 'test login 2', avatar_url: 'test avatar 2' },
          ],
          serverError: null,
        },
      };

      const membersVM: Member[] = [
        { id: 1, name: 'test login 1', avatarUrl: 'test avatar 1' },
        { id: 2, name: 'test login 2', avatarUrl: 'test avatar 2' },
      ];

      const mapMemberListModelToVM = jest.spyOn(mappers, 'mapMemberListModelToVM').mockImplementation(() => membersVM);

      // Act
      const result1 = getMembersListVM(state);
      const result2 = getMembersListVM(state);
      const result3 = getMembersListVM(state);

      // Assert
      expect(result1 === result2).toBeTruthy();
      expect(result2 === result3).toBeTruthy();
      expect(mapMemberListModelToVM).toBeCalledTimes(1);
    });
  });

  describe('getServerError', () => {
    it('should return the expected serverError from state', () => {
      // Arrange
      const state: State = {
        members: {
          members: [],
          serverError: 'test error',
        },
      };

      // Act
      const result = getServerError(state);

      // Assert
      expect(result).toBe(state.members.serverError);
    });
  });
});
