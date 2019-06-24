# 01 Hello

In this example we will setup react testing library and create a simple test over a component that
just display and _h1_

We will start from `00-boilerplate`.

# Steps

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's install [react-testing-library](https://github.com/testing-library/react-testing-library)

```bash
npm install @testing-library/react -D
```

- We will create a simple component.

### ./src/say-hello.tsx

```javascript
import * as React from 'react';

interface Props {
  person: string;
}

export const SayHello: React.FunctionComponent<Props> = props => {
  const { person } = props;
  return <h1>Hello {person}!</h1>;
};

```

- Let's add our first test, we want to instantiate _SayHello_ and check that we are getting an h1 that contains the name of the person that we are passing.

### ./src/say-hello.spec.tsx

```javascript
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SayHello } from './say-hello';

afterEach(cleanup);

describe('SayHello component specs', () => {
  it('should display the person name', () => {
    // Arrange
    const person = 'John';

    // Act
    const { getByText } = render(<SayHello person={person} />);

    // Assert
    const element = getByText('Hello John!');
    expect(element).not.toBeNull();
    expect(element.tagName).toEqual('H1');
  });
});

```

- Create a global config to cleanup after each specs:

> [Docs](https://testing-library.com/docs/react-testing-library/setup)
> [setupFilesAfterEnv](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array)

### ./config/test/jest.json

```diff
{
  "rootDir": "../../",
  "preset": "ts-jest",
- "restoreMocks": true
+ "restoreMocks": true,
+ "setupFilesAfterEnv": ["@testing-library/react/cleanup-after-each"]
}

```

- Update spec:

### ./src/say-hello.spec.tsx

```diff
import * as React from 'react';
- import { render, cleanup } from '@testing-library/react';
+ import { render } from '@testing-library/react';
import { SayHello } from './say-hello';

- afterEach(cleanup);
...

```

- Another approach is to use `snapshot testing`:

### ./src/say-hello.spec.tsx

```diff
...

+ it('should display the person name using snapshot testing', () => {
+   // Arrange
+   const person = 'John';

+   // Act
+   const { asFragment } = render(<SayHello person={person} />);

+   // Assert
+   expect(asFragment()).toMatchSnapshot();
+ });

```

- It will add a file like:

### ./src/__snapshots__/say-hello.spec.tsx.snap

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`SayHello component specs should display the person name using snapshot testing 1`] = `
<DocumentFragment>
  <h1>
    Hello John!
  </h1>
</DocumentFragment>
`;

```

- This kind of tests are useful when we want to make sure the UI does not change. The snapshot should be committed to be reviewed as part of the pull request.

- On the other hand, this could be a `bad idea` in complex scenarios due to it could be complicated review the whole snapshot and we could fall into a bad habit of updating snapshot tests blindly.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
