import * as React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import { CardComponent } from './card';

describe('Card component specs', () => {
  it('should display a card with title and body when it feeds a title and body', () => {
    // Arrange
    const props = {
      title: 'Test title',
      body: 'Test body',
      onClick: jest.fn(),
    };

    // Act
    const { getByText } = render(<CardComponent {...props} />);

    const titleElement = getByText(props.title);
    const bodyElement = getByText(props.body);

    // Assert
    expect(titleElement).not.toBeUndefined();
    expect(bodyElement).not.toBeUndefined();
  });

  it('should call onClick property when it clicks on "Learn more" button', () => {
    // Arrange
    const props = {
      title: 'Test title',
      body: 'Test body',
      onClick: jest.fn(),
    };

    // Act
    const { getByText } = render(<CardComponent {...props} />);

    const buttonElement = getByText('Learn more');
    fireEvent.click(buttonElement);

    // Assert
    expect(props.onClick).toHaveBeenCalled();
  });
});
