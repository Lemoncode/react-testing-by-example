# 05 Router

In this example we will test components using react-router.

We will start from `04-fetch`.

# Steps

- `npm install` to install previous sample packages:

```bash
npm install
```

- Create a second page to navigate `user-edit.tsx`

### ./src/user-edit.tsx

```javascript
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface ParamProps {
  name: string;
}

interface Props extends RouteComponentProps<ParamProps> {}

export const UserEdit: React.FunctionComponent<Props> = props => {
  return <h1>User name: {props.match.params.name}</h1>;
};
```

- Create `router`:

### ./src/router.tsx

```javascript
import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { NameCollection } from './name-collection';
import { UserEdit } from './user-edit';

export const Router: React.FunctionComponent = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact={true} path="/" component={NameCollection} />
        <Route path="/users/:name" component={UserEdit} />
      </Switch>
    </HashRouter>
  );
};
```

- Use it:

### ./src/app.tsx

```diff
import * as React from 'react';
- import { NameEdit } from './name-edit';
- import { NameCollection } from './name-collection';
+ import { Router } from './router';

export const App: React.FunctionComponent = props => (
  <div>
    <h3>Hello !</h3>
-   <NameEdit />
-   <NameCollection />
+   <Router />
  </div>
);

```

- Add navigation from `name-collection` component:

### ./src/name-collection.tsx

```diff
import * as React from 'react';
+ import { Link } from 'react-router-dom';
import { getNameCollection } from './name-api';

...

  return (
    <ul>
      {nameCollection.map(name => (
+       <Link key={name} to={`/users/${name}`}>
-         <li key={name} data-testid="name">
-           {name}
-         </li>
+         <li data-testid="name">{name}</li>
+       </Link>
      ))}
    </ul>
  );
};

```

- Let's run tests:

```bash
npm run test:watch
```

- Why are they broken? Because we need to provide a `render with router` since as we know, `react-testing-library` mount all components:

### ./src/name-collection.spec.tsx

> Note: [testing with react-router](https://testing-library.com/docs/example-react-router)

```diff
import * as React from 'react';
+ import { HashRouter, Switch, Route } from 'react-router-dom';
import { render, waitForElement } from '@testing-library/react';
import * as api from './name-api';
+ import { UserEdit } from './user-edit';
import { NameCollection } from './name-collection';

+ const renderWithRouter = component => {
+   return {
+     ...render(
+       <HashRouter>
+         <Switch>
+           <Route path="/users/:name" component={UserEdit} />
+         </Switch>
+         {component}
+       </HashRouter>
+     ),
+   };
+ };

describe('NameCollection component specs', () => {
  it('should display a list with one item when it mounts the component and it resolves the async call', async () => {
    ...

    // Act
-   const { getAllByTestId, queryByText  } = render(<NameCollection />);
+   const { getAllByTestId, queryByText  } = renderWithRouter(<NameCollection />);

    ...
  });

  it('should display a list with two items when it mounts the component and it resolves the async call', async () => {
    ...

    // Act
-   const { getAllByTestId } = render(<NameCollection />);
+   const { getAllByTestId } = renderWithRouter(<NameCollection />);

    ...
  });
});

```

- should navigate to second user edit page when click in second user name:

### ./src/name-collection.spec.tsx

```diff
import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
- import { render, waitForElement } from '@testing-library/react';
+ import { render, waitForElement, fireEvent } from '@testing-library/react';
import * as api from './name-api';
import { UserEdit } from './user-edit';
import { NameCollection } from './name-collection';

...
+ it('should navigate to second user edit page when click in second user name', async () => {
+   // Arrange
+   const getStub = jest
+     .spyOn(api, 'getNameCollection')
+     .mockResolvedValue(['John Doe', 'Jane Doe']);

+   // Act
+   const { getAllByTestId, getByText, getByTestId } = renderWithRouter(
+     <NameCollection />
+   );

+   const elements = await waitForElement(() => getAllByTestId('name'));

+   const secondUser = elements[1];
+   fireEvent.click(secondUser);

+   const userEditElement = getByTestId('user-edit');

+   // Assert
+   expect(userEditElement.textContent).toEqual('User name: Jane Doe');
+ });

...

```

- Add `test id` to `user-edit`:

### ./src/user-edit.tsx

```diff
...

export const UserEdit: React.FunctionComponent<Props> = props => {
- return <h1>User name: {props.match.params.name}</h1>;
+ return <h1 data-testid="user-edit">User name: {props.match.params.name}</h1>;
};

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
