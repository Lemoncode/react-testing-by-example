import { membersRootSaga } from './members';
import { rootSaga } from './sagas';

describe('pages/sagas.ts', () => {
  it('should call expected modules root sagas', () => {
    // Arrange
    const saga = rootSaga();

    // Act
    const result = saga.next();

    // Assert
    expect(result.value).toEqual(membersRootSaga());
  });
});
