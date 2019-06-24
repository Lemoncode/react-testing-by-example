#01 Integration testing

So far we have just unit tested components, what about making an integration test?
We can mount a bunch of components and test them all together !

# Steps

- Copy the content from _02 name-edit_ and execute _npm install_

```bash
npm install
```
- Now we will split our _name-edit_ component and create a _display_ and _edit_
components.

_./src/display.tsx_

```tsx
import * as React from 'react';

interface Props {
  username: string;
}

export const Display = (props : Props) => {
  const {username} = props;

  return (
    <h3 data-testid="username-label">{username}</h3>
  )
}
```

_./src/edit.tsx_

```tsx
import * as React from 'react';

interface Props {
  username: string;
  onSetUsername : (username: string) => void;
}

export const Edit  = (props : Props) => {
  const {username, onSetUsername} = props;

  return (
    <input
      data-testid="username-input"
      value={username}
      onChange={(e) => onSetUsername(e.target.value)}
      />
  )
}
```

_./src/name-edit.tsx_

```diff
import * as React from 'react';
+ import {Display} from './display';
+ import {Edit} from './edit';

export const NameEdit = () => {
  const [username, setUsername]  = React.useState('');

  return(
    <>
-      <h3 data-testid="username-label">{username}</h3>
+      <Display username={username}/>
-      <input data-testid="username-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
+      <Edit username={username} onSetUsername={setUsername}/>
    </>
  )
}
```

- Now.. do we need to make any change on the _name-edit_ test? Let's see...

```bash
npm start
```

Nope ! Wow ! how does this work? React Testing library just mounts the whole component
and since we are keeping the same test id's the test is still valid as is.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
