import { renderHook, act } from '@testing-library/react-hooks';
import * as api from './api';
import { useFilterUsers } from './useFilterUsers';

describe('useFilterUsers specs', () => {
  it('should call getUsersByFilter and update users when it feeds filter equals "doe"', async () => {
    // Arrange
    const filter = 'doe';
    const getUsersByFilterSpy = jest
      .spyOn(api, 'getUsersByFilter')
      .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useFilterUsers(filter)
    );

    // Assert
    expect(result.current.users).toEqual([]);

    await waitForNextUpdate();

    expect(getUsersByFilterSpy).toHaveBeenCalledWith('doe');
    expect(result.current.users).toEqual(['John Doe', 'Jane Doe']);
  });

  it('should call getUsersByFilter only one time when it calls filterUsers with same filter two times', async () => {
    // Arrange
    const filter = 'doe';
    const getUsersByFilterSpy = jest
      .spyOn(api, 'getUsersByFilter')
      .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useFilterUsers(filter)
    );

    // Assert
    expect(result.current.users).toEqual([]);

    await waitForNextUpdate();

    rerender('doe');

    expect(getUsersByFilterSpy).toHaveBeenCalledWith('doe');
    expect(getUsersByFilterSpy).toHaveBeenCalledTimes(1);
    expect(result.current.users).toEqual(['John Doe', 'Jane Doe']);
  });

  it('should call getUsersByFilter two times when it calls filterUsers with different filters', async () => {
    // Arrange
    const filter = 'doe';
    const getUsersByFilterSpy = jest
      .spyOn(api, 'getUsersByFilter')
      .mockResolvedValue(['Jane Smith']);

    // Act
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useFilterUsers(filter)
    );

    // Assert
    expect(result.current.users).toEqual([]);

    rerender('smith');
    await waitForNextUpdate();

    expect(getUsersByFilterSpy).toHaveBeenCalledWith('doe');
    expect(getUsersByFilterSpy).toHaveBeenCalledWith('smith');
    expect(getUsersByFilterSpy).toHaveBeenCalledTimes(2);
    expect(result.current.users).toEqual(['Jane Smith']);
  });
});
