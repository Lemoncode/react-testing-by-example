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
export const getNameCollection = (): Promise<Object[]> =>
  fetch("https://jsonplaceholder.typicode.com/users").then(response =>
    response.json()
  );
```

- Let's create a component that make use of this api and display that list.

_./src/name-collection.tsx_

```tsx
import * as React from "react";
import { getNameCollection } from "./name-api";

export const NameCollection = () => {
  const [nameCollection, setNameCollection] = React.useState([]);

  React.useEffect(() => {
    getNameCollection.then(data => setNameCollection(data));
  }, []);

  return (
    <ul>
      {nameCollection.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  );
};
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

- Time to test this async piece :), let's create a file called _name-collection.spec.tsx_

_./src/name-collection.spec.tsx_

```typescript
import * as React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { NameCollection } from "./name-collection";
import * as nameApi from "./name-api";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Name collection component", () => {
  it("Should display a list with just one name after async call gets resolved", async () => {
    const fetchMembersStub = jest
      .spyOn(nameApi, "getNameCollection")
      .mockResolvedValue([
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496"
            }
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets"
          }
        }
      ]);

    const { getByText } = render(<NameCollection />);

    await waitForElement(() => getByText("Leanne Graham"));

    const liElement = getByText("Leanne Graham");

    expect(liElement.nodeName).toBe("LI");
  });
});
```
