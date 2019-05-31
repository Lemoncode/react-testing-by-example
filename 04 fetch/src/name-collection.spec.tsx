import * as React from 'react';
import {
  render,
  cleanup,
  waitForElement
} from '@testing-library/react';
import { NameCollection } from './name-collection';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

// WIP !! not finished
describe('Name collection component', () => {
  it('Should display a list of names after async call gets resolved', async () => {
    const {getByText} = render(<NameCollection/>);

    // TODO: Add mock to api function

    await waitForElement(() => getByText('test-name'));

    expect(getByText('test-name')).not.toBeNull();
  })
});
