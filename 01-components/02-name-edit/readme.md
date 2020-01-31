# 02 Name Edit

Let's start playing with DOM events. In this example we will create a name editor component.

We will start from `01-hello`.

Summary steps:

- It will display a given name.
- It will let us edit that name.
- We will be playing with dom events (on change).

# Steps

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's create our _nameEdit_ component.

### ./src/name-edit.tsx

```javascript
import * as React from 'react';

export const NameEdit: React.FunctionComponent = () => {
  const [userName, setUserName] = React.useState('');

  return (
    <>
      <h3>{userName}</h3>
      <input value={userName} onChange={e => setUserName(e.target.value)} />
    </>
  );
};
```

- Let's instantiate this component in our app.

### ./src/app.tsx

```diff
import * as React from 'react';
+ import { NameEdit } from './name-edit';

export const App: React.FunctionComponent = props => (
  <div>
    <h3>Hello !</h3>
+   <NameEdit />
  </div>
);

```

- Let's start implementing a test, the scenario we want to test:

  - Render the _NameEdit_ component.
  - Get the input element.
  - Trigger an update over that input.
  - Check that we get that update on the _h3_ element that is displaying the userName.

- If we try use `getByText`:

### ./src/name-edit.spec.tsx

```javascript
import * as React from 'react';
import { render } from '@testing-library/react';
import { NameEdit } from './name-edit';

describe('NameEdit component specs', () => {
  it('should display a label and input elements with empty userName value', () => {
    // Arrange

    // Act
    const { getByText } = render(<NameEdit />);

    const labelElement = getByText('');

    // Assert
  });
});
```

> It fails because it found multiple elements
> We could try `getAllByText` too.

- We could add a `testid` attribute to create different selectors:

### ./src/name-edit.tsx

```diff
import * as React from 'react';

export const NameEdit: React.FunctionComponent = () => {
  const [userName, setUserName] = React.useState('');

  return (
    <>
-     <h3>{userName}</h3>
+     <h3 data-testid="userName-label">{userName}</h3>
-     <input value={userName} onChange={e => setUserName(e.target.value)} />
+     <input
+       data-testid="userName-input"
+       value={userName}
+       onChange={e => setUserName(e.target.value)}
+     />
    </>
  );
};

```

### ./src/name-edit.spec.tsx

```diff
import * as React from 'react';
import { render } from '@testing-library/react';
import { NameEdit } from './name-edit';

describe('NameEdit component specs', () => {
  it('should display a h3 and input elements with empty userName value', () => {
    // Arrange

    // Act
-   const { getByText } = render(<NameEdit />);
+   const { getByTestId } = render(<NameEdit />);

-   const labelElement = getByText('');
+   const labelElement = getByTestId('userName-label');
+   const inputElement = getByTestId('userName-input') as HTMLInputElement;

    // Assert
+   expect(labelElement.textContent).toEqual('');
+   expect(inputElement.value).toEqual('');
  });
});

```

- should update h3 text when input changes:

### ./src/name-edit.spec.tsx

```diff
import * as React from 'react';
- import { render } from '@testing-library/react';
+ import { render, fireEvent } from '@testing-library/react';
import { NameEdit } from './name-edit';

...
+ it('should update h3 text when input changes', () => {
+   // Arrange

+   // Act
+   const { getByTestId } = render(<NameEdit />);

+   const labelElement = getByTestId('userName-label');
+   const inputElement = getByTestId('userName-input') as HTMLInputElement;

+   fireEvent.change(inputElement, { target: { value: 'John' } });

+   // Assert
+   expect(labelElement.textContent).toEqual('John');
+   expect(inputElement.value).toEqual('John');
+ });

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
