#01 Fetch

Let's hop into testing components that get involved asynchronous call execution.

# Steps

- Copy the content from _03 integration_ and execute _npm install_

```bash
npm install
```

- Now we will create a file that will contain a call to a remote api that returns a list
of names.

_./src/name-api.ts_

```typescript
export const getNameCollection = () : Promise<Object[]> =>
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
```

- Let's create a component that make use of this api and display that list.

_./src/name-collection.tsx_

```tsx
import * as React from 'react';
import {getNameCollection} from './name-api';

export const NameCollection = () => {
  const [nameCollection, setNameCollection] = React.useState([]);

  React.useEffect(() => {
    getNameCollection.then((data) =>
      setNameCollection(data)
    )
  },[]);

  return (
    <ul>
      {nameCollection.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  )
}
```

- Now let's instantiate this component in the _app.tsx_ file.

_./src/app.tsx_

```diff
import * as React from 'react';
import {NameEdit} from './name-edit';
+ import {NameCollection} from './name-collection'

export const App: React.StatelessComponent = (props) => (
  <div>
    <h3>Hello !</h3>
    <NameEdit/>
+    <NameCollection/>
  </div>
);
```
