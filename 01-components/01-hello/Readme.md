#01 Hello

In this sampe we will setup react testing library and create a simple test over a component that
just display and _h1_

# Steps

- Copy the content from _00 bootstrap_ and execute _npm install_

```bash
npm install
```

- Let's install _react-testing-library_

```bash
npm install --save-dev @testing-library/react
```

- We will create a simple component.

_./src/say-hello.tsx_

```tsx
import * as React from 'react';

interface Props {
  person : string;
}

export const SayHello = (props : Props) => {
  return (
    <h1>Hello {props.person}!</h1>
  )
}
```

- Let's add our first test, we want instantiate _SayHello_ and check that
we are getting an h1 that contains the name of the person that we are passing.

_./src/say-hello.spec.tsx_

```tsx
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
```
