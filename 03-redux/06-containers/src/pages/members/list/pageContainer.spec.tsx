import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { membersReducer } from './reducers';
import { State } from '../../reducers';
import * as actions from './actions/fetchMembers';
import { MemberListPageContainer } from './pageContainer';

const renderWithRedux = (
  component,
  { initialState = {}, reducer, store = createStore(reducer, initialState) }
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

describe('src/pages/members/list/pageContainer specs', () => {
  it('should render empty table when it feeds initial state', () => {
    // Arrange
    const initialState: State = {
      members: {
        members: [],
        serverError: null,
      },
    };

    // Act
    const { queryAllByTestId } = renderWithRedux(<MemberListPageContainer />, {
      initialState,
      reducer: membersReducer,
    });

    const memberElements = queryAllByTestId('member');

    // Assert
    expect(memberElements).toHaveLength(0);
  });

  it('should render one item when it feeds initial state with one item', () => {
    // Arrange
    const initialState: State = {
      members: {
        members: [
          { id: 1, login: 'test login 1', avatar_url: 'test avatar_url 1' },
        ],
        serverError: null,
      },
    };

    // Act
    const { queryAllByTestId } = renderWithRedux(<MemberListPageContainer />, {
      initialState,
      reducer: membersReducer,
    });

    const memberElements = queryAllByTestId('member');

    // Assert
    expect(memberElements).toHaveLength(1);
  });

  it('should call fetchMembersRequest when it mounts the component', () => {
    // Arrange
    const initialState: State = {
      members: {
        members: [],
        serverError: null,
      },
    };

    const fetchMembersRequest = jest.spyOn(actions, 'fetchMembersRequest');

    // Act
    const {} = renderWithRedux(<MemberListPageContainer />, {
      initialState,
      reducer: membersReducer,
    });

    // Assert
    expect(fetchMembersRequest).toHaveBeenCalled();
  });
});
