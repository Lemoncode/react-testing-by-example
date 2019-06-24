# 05 Async

In this example we are going to learn test async code.

We will start from `04-tdd`.

Summary steps:

- Handle `getMembers` errors.
- Test async code.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- This time, we want to handle `getMembers` errors:

> 403: API rate limit exceeded
> 503: Service unavailable

### ./src/api.ts

```diff
- import Axios from 'axios';
+ import Axios, { AxiosError } from 'axios';
import { Member } from './api-model';

const url = 'https://api.github.com/orgs/lemoncode/members';

export const getMembers = (): Promise<Member[]> =>
- Axios.get(url).then(({ data }) => data);
+ Axios.get(url)
+   .then(({ data }) => data)
+   .catch((error: AxiosError) => {
+     switch (error.response.status) {
+       case 403:
+         throw 'Too much Github API calls!';
+       case 503:
+         throw 'Unavailable service';
+     }
+   });

```

- Update app:

### ./src/app.tsx

```diff
import * as React from 'react';
import { getMembers } from './api';
import { mapToMemberVMList } from './mapper';

export const App: React.FunctionComponent = () => {
  React.useEffect(() => {
    getMembers()
      .then(members => {
        console.log(mapToMemberVMList(members));
-     });
+     })
+     .catch(error => console.log(error));
  });

  return <h1>React testing by sample</h1>;
};

```

- Let's start to test it:

### ./src/api.spec.ts

```javascript
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
