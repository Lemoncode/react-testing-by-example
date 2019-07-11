import { call, put, takeLatest } from 'redux-saga/effects';
import { getDispatchedActionsFromSaga } from '../../../../common/test';
import * as api from '../../../../rest-api/api/member';
import { Member } from '../../../../rest-api/model';
import { MembersAction } from '../actions';
import { actionIds } from '../actions/actionIds';
import { fetchMembersError, FetchMembersRequestAction, fetchMembersSuccess } from '../actions/fetchMembers';
import { fetchMembersSaga, watchFetchMembersRequest } from './fetchMembersSaga';

describe('pages/members/sagas/fetchMembers sagas', () => {
  describe('watchFetchMembersRequest', () => {
    it('should wait for expected action and execute the expected worker', () => {
      // Arrange
      const saga = watchFetchMembersRequest();

      // Act
      const result = saga.next();

      // Assert
      expect(result.value).toEqual(takeLatest(actionIds.FETCH_MEMBERS_REQUEST, fetchMembersSaga));
    });
  });

  describe('fetchMembersSaga', () => {
    it('should put fetchMembersSuccess with givne members when API call is succesful', () => {
      // Arrange
      const fetchMembersRequest: FetchMembersRequestAction = {
        type: actionIds.FETCH_MEMBERS_REQUEST,
        payload: null,
      };
      const saga = fetchMembersSaga(fetchMembersRequest);
      const members: Member[] = [{ id: 1, login: 'test login', avatar_url: 'test avatar' }];

      // Act & Assert
      expect(saga.next().value).toEqual(call(api.fetchMembers));
      expect(saga.next(members).value).toEqual(put(fetchMembersSuccess(members)));
    });

    it('should put fetchMembersError with given error when API call is not succesful', () => {
      // Arrange
      const fetchMembersRequest: FetchMembersRequestAction = {
        type: actionIds.FETCH_MEMBERS_REQUEST,
        payload: null,
      };
      const saga = fetchMembersSaga(fetchMembersRequest);
      const thrownError = new Error('test error');

      // Act & Assert
      expect(saga.next().value).toEqual(call(api.fetchMembers));
      expect(saga.throw(thrownError).value).toEqual(put(fetchMembersError(thrownError.message)));
    });

    it('should dispatch the expected actions if API call is successful', async () => {
      // Arrange
      const fetchMembersRequest: FetchMembersRequestAction = {
        type: actionIds.FETCH_MEMBERS_REQUEST,
        payload: null,
      };
      const members: Member[] = [{ id: 1, login: 'test login', avatar_url: 'test avatar' }];
      const fetchMembers = jest.spyOn(api, 'fetchMembers').mockImplementation(() => Promise.resolve(members));
      const expectedActions: MembersAction[] = [fetchMembersSuccess(members)];

      // Act
      const dispatchedActions = await getDispatchedActionsFromSaga(fetchMembersSaga, fetchMembersRequest);

      // Assert
      expect(fetchMembers).toHaveBeenCalled();
      expect(dispatchedActions).toEqual(expectedActions);
    });

    it('should dispatch the expected actions if API call is not successful', async () => {
      // Arrange
      const fetchMembersRequest: FetchMembersRequestAction = {
        type: actionIds.FETCH_MEMBERS_REQUEST,
        payload: null,
      };
      const thrownError = new Error('test error');
      jest.spyOn(api, 'fetchMembers').mockImplementation(() => Promise.reject(thrownError));
      const expectedActions: MembersAction[] = [fetchMembersError(thrownError.message)];

      // Act
      const dispatchedActions = await getDispatchedActionsFromSaga(fetchMembersSaga, fetchMembersRequest);

      // Assert
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
