#01 Name Edit

Let's start playing with DOM eventsm, in this sample we will create a name editor component:

- It will display a given name.
- It will let us edit that name.

We will be playing with dom events (on change).

# Steps

- Copy the content from _01 hello_ and execute _npm install_

```bash
npm install
```
- Let's create our _nameEdit_ component.

_./src/name-edit.tsx_

```tsx
import * as React from 'react';

export const NameEdit = () => {
  const [username, setUsername]  = React.useState('');

  return (
    <>
      <h3>{username}</h3>
      <input value={username} onChange={(e) => setUsername(e.target.value)}/>
    </>
  )
}
```

- Let's instantiate this component in our app.

_./src/app.tsx_

```diff
import * as React from 'react';
+ import {NameEdit} from './name-edit'

export const App: React.StatelessComponent = (props) => (
  <div>
    <h3>Hello !</h3>
+   <NameEdit/>
  </div>
);
```

- Let's start implementing a test, the scenario we want to test:
  - Render the _NameEdit_ component.
  - Get the input element.
  - Trigger an update over that input.
  - Check that we get that update on the _h3_ element that is displaying the username.

_./src/name-edit.spec.tsx_

```tsx
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
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
