import * as React from 'react';
import { render, waitForElement } from '@testing-library/react';
import * as api from './name-api';
import { NameCollection } from './name-collection';

describe('NameCollection component specs', () => {
  it('should display a list with one item when it mounts the component and it resolves the async call', async () => {
    // Arrange
    const getStub = jest
      .spyOn(api, 'getNameCollection')
      .mockResolvedValue(['John Doe']);

    // Act
    const { getAllByTestId, queryByText } = render(<NameCollection />);

    const elementBeforeWait = queryByText('John Doe');
    expect(elementBeforeWait).not.toBeInTheDocument();

    const elements = await waitForElement(() => getAllByTestId('name'));

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
    const { getAllByTestId } = render(<NameCollection />);

    const elements = await waitForElement(() => getAllByTestId('name'));

    // Assert
    expect(getStub).toHaveBeenCalled();
    expect(elements.length).toEqual(2);
    expect(elements[0].textContent).toEqual('John Doe');
    expect(elements[1].textContent).toEqual('Jane Doe');
  });
});
