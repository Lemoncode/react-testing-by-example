import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import * as api from './name-api';
import { UserEdit } from './user-edit';
import { NameCollection } from './name-collection';

const renderWithRouter = component => {
  return {
    ...render(
      <HashRouter>
        <Switch>
          <Route path="/users/:name" component={UserEdit} />
        </Switch>
        {component}
      </HashRouter>
    ),
  };
};

describe('NameCollection component specs', () => {
  it('should display a list with one item when it mounts the component and it resolves the async call', async () => {
    // Arrange
    const getStub = jest
      .spyOn(api, 'getNameCollection')
      .mockResolvedValue(['John Doe']);

    // Act
    const { getAllByTestId } = renderWithRouter(<NameCollection />);

    await waitForElement(() => getAllByTestId('name'));

    const elements = getAllByTestId('name');

    // Assert
    expect(getStub).toHaveBeenCalled();
    expect(elements.length).toEqual(1);
    expect(elements[0].textContent).toEqual('John Doe');
  });

  it('should display a list with two items when it mounts the component and it resolves the async call', async () => {
    // Arrange
    const getStub = jest
      .spyOn(api, 'getNameCollection')
      .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { getAllByTestId } = renderWithRouter(<NameCollection />);

    await waitForElement(() => getAllByTestId('name'));

    const elements = getAllByTestId('name');

    // Assert
    expect(getStub).toHaveBeenCalled();
    expect(elements.length).toEqual(2);
    expect(elements[0].textContent).toEqual('John Doe');
    expect(elements[1].textContent).toEqual('Jane Doe');
  });

  it('should navigate to second user edit page when click in second user name', async () => {
    // Arrange
    const getStub = jest
      .spyOn(api, 'getNameCollection')
      .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(
      <NameCollection />
    );

    await waitForElement(() => getAllByTestId('name'));

    const secondUser = getByText('Jane Doe');
    fireEvent.click(secondUser);

    const userEditElement = getByTestId('user-edit');

    // Assert
    expect(userEditElement.textContent).toEqual('User name: Jane Doe');
  });
});
