# 05 Router

Let's refactor our pod and split it into multiple components
We will start from `04-external-resource`

Summary steps:

- Refactor greeter pod
- Create scenes
- Add routing to our solution
- Add scenarios when user navigates to his `todos`

## 1. Let's refactor greeter.container to handle navigation

Modify _./src\pods\greeter\greeter.container.tsx_

```diff
import * as React from 'react';
+import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GreetComponent } from './components/greet.component';
import { GreetSetterComponent } from './components/greet-setter.component';

- export const GreeterContainer: React.FunctionComponent = () => {
+const GreeterContainerPartial: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [greet, setGreet] = React.useState('');
+ const { history } = props;
+ const handleNavigation = () => {
+   history.push('');
+ };

  return (
    <>
      <GreetComponent greet={greet} />
      <GreetSetterComponent greet={greet} onSetGreet={setGreet} />
+     <button onClick={handleNavigation}>navigate</button>
    </>
  );
};

+export const GreeterContainer = withRouter(GreeterContainerPartial);

```

We left a blank space on history because we have not resolved yet.

## 2. Now it's time to create our scenes. These scenes will be the route targeting.

Let's begin by adding exports to pods barrel

Modify _./src\pods\index.ts_

```diff
+export * from './todos/todos.container';
+export * from './greeter/greeter.container';
```

Create _./src\scenes\greeter.scene.tsx_

```tsx
import * as React from 'react';
import { GreeterContainer } from '../pods';

export const GreeterScene: React.FunctionComponent = () => <GreeterContainer />;
```

Create _./src\scenes\todos.scene.tsx_

```tsx
import * as React from 'react';
import { TodosContainer } from '../pods';

export const TodosScene: React.FunctionComponent = () => <TodosContainer />;
```

Modify _./src\scenes\index.ts_

```ts
export * from './greeter.scene';
export * from './todos.scene';
```

## 3. Now that we have our scenes, let's add them to router

Edit _./src\core\router\routes.ts_

```ts
import { generatePath } from 'react-router-dom';

interface BaseRoutes {
  greeter: string;
  users: string | ((id: number) => string);
}

const baseRoutes: BaseRoutes = {
  greeter: '/',
  users: '/users/:id',
};

interface SwitchRoutes extends BaseRoutes {
  users: string;
}

export const switchRoutes: SwitchRoutes = {
  ...baseRoutes,
  users: baseRoutes.users as string,
};

interface LinkRoutes extends BaseRoutes {
  users: (id: number) => string;
}

export const linkRoutes: LinkRoutes = {
  ...baseRoutes,
  users: id => generatePath(switchRoutes.users, { id }),
};
```

Edit _./src\core\router\router.component.tsx_

```tsx
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './history';
import { switchRoutes } from './routes';
// TODO: Import scenes to render in Route component
// import {} from 'scenes';
import { GreeterScene, TodosScene } from '../../scenes';

console.log(switchRoutes.users);

export const RouterComponent = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        exact={true}
        path={switchRoutes.greeter}
        component={GreeterScene}
      />
      <Route path={switchRoutes.users} component={TodosScene} />
    </Switch>
  </ConnectedRouter>
);
```

Now we can handle navigation from _greeter.container.tsx_

Edit _./src\pods\greeter\greeter.container.tsx_

```diff
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GreetComponent } from './components/greet.component';
import { GreetSetterComponent } from './components/greet-setter.component';

const GreeterContainerPartial: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [greet, setGreet] = React.useState('');
  const { history } = props;
  const handleNavigation = () => {
-    history.push('');
+    history.push('/users/1');
  };

  return (
    <>
      <GreetComponent greet={greet} />
      <GreetSetterComponent greet={greet} onSetGreet={setGreet} />
      <button onClick={handleNavigation}>navigate</button>
    </>
  );
};

export const GreeterContainer = withRouter(GreeterContainerPartial);

```

Let's run our tests. Seeems that the components that are linked to router are alreay broken.

## 4. Fix broken tests.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
