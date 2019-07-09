import { watchFetchMembersRequest } from './fetchMembersSaga';
import { membersRootSaga } from './index';
describe('membersRootSaga', () => {
  it('should spawn watchFetchMembersRequest saga', () => {
    // Arrange
    const saga = membersRootSaga();

    // Act
    const result = saga.next();

    // Assert
    expect(result.value).toEqual(watchFetchMembersRequest());
  });
});
