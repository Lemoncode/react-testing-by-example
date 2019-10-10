# 03 Welcome User

Lets refactor our pod and split it into multiple components
We will start from `02-welcome-user`

Summary steps:

- Refactor our container
- Run tests and check out if they're broken

## 1. Let's create a new componet that will diplay the greet

Create _./src\pods\greeter\components\greet.component.tsx_

```tsx
import * as React from 'react';

interface Props {
  greet: string;
}

export const GreetComponent: React.FunctionComponent<Props> = props => {
  const { greet } = props;

  return <h3 data-testid="greet">{greet}</h3>;
};
```

## 2. Let's create a new component that sets the greet

Create _./src\pods\greeter\components\greet-setter.component.tsx_

```tsx
import * as React from 'react';

interface Props {
  greet: string;
  onSetGreet: (greet: string) => void;
}

export const GreetSetterComponent: React.FunctionComponent<Props> = props => {
  const { greet, onSetGreet } = props;

  return (
    <input
      data-testid="greet-setter"
      type="text"
      value={greet}
      onChange={e => onSetGreet(e.target.value)}
    />
  );
};
```

## 3. Now that we have these new components we can start or container refactor

Modify _./src\pods\greeter\greeter.container.tsx_

```diff
import * as React from 'react';
+import { GreetComponent } from './components/greet.component';
+import { GreetSetterComponent } from './components/greet-setter.component';

export const GreeterContainer: React.FunctionComponent = () => {
  const [greet, setGreet] = React.useState('');

  return (
    <>
-     <h3 data-testid="greet">{greet}</h3>
-     <input data-testid="greet-setter" type="text"
-       value={greet}
-       onChange={(e) => setGreet(e.target.value)}
-     />
+     <GreetComponent greet={greet} />
+     <GreetSetterComponent greet={greet} onSetGreet={setGreet}/>
    </>
  );
};

```

Let's give a try and run our tests. Everything works and the cool thing is that we have move around implementation details but no tes have to be changed!!!

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
