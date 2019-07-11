import { watchFetchMembersRequest } from './fetchMembersSaga';
import { membersRootSaga } from './index';

describe('pages/members/list/membersRootSaga', () => {
  it('should spawn watchFetchMembersRequest saga', () => {
    // Arrange
    const saga = membersRootSaga();

    // Act
    const result = saga.next();

    // Assert
    expect(result.value).toEqual(watchFetchMembersRequest());
  });
});
