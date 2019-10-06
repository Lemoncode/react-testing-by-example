import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NameEdit } from './name-edit';

describe('NameEdit component specs', () => {
  it('should display a label and input elements with empty userName value', () => {
    // Arrange

    // Act
    const { getByTestId } = render(<NameEdit />);

    const labelElement = getByTestId('userName-label');
    const inputElement = getByTestId('userName-input') as HTMLInputElement;

    // Assert
    expect(labelElement.textContent).toEqual('');
    expect(inputElement.value).toEqual('');
  });

  it('should update h3 text when input changes', () => {
    // Arrange

    // Act
    const { getByTestId } = render(<NameEdit />);

    const labelElement = getByTestId('userName-label');
    const inputElement = getByTestId('userName-input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'John' } });

    // Assert
    expect(labelElement.textContent).toEqual('John');
    expect(inputElement.value).toEqual('John');
  });
});
