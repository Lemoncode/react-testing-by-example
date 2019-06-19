import * as React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { NameEdit } from './name-edit';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('NamEdit component', () => {
  it('Should update name h3 element when input changes', () => {
    const {getByTestId} = render(<NameEdit/>);

    // Search for username h3
    const usernameLabelElement  = getByTestId('username-label');
    // Search for username input
    const usernameInputElement  = getByTestId('username-input');

    fireEvent.change(usernameInputElement, {target: {value: 'John'}});

    // Check that both h3 and input contains the text John
    expect(usernameLabelElement.innerHTML).toEqual('John');
    expect(usernameInputElement["value"]).toEqual('John');

  })
});
