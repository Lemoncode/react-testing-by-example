import * as React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { SayHello } from './say-hello';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('SayHello component', () => {
  it('Should display the person name', () => {
    const {getByText} = render(<SayHello person="John"/>);

    // Search for an element that contains the text 'Hello John !'
    const element = getByText('Hello John!');

    // Check that the element exists (not needed it will throw an exception if not found)
    expect(element).not.toBeNull();

    // Check that the element that contains this text is an h1
    expect(element.tagName).toEqual('H1');
  })
});
