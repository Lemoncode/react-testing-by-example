# 05 Wait requests

In this example we are going to use real hotel request.

We will start from `04-stub-requests`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Maybe some times we need to use real backend server for some reason, (but it could be a bad practice, for example in ci process):

### ./src/package.json

```diff
"scripts": {
..
-   "test:e2e": "npm-run-all -p -l start:dev start:e2e",
+   "test:e2e": "npm-run-all -p -l start start:e2e",
    "start:e2e": "testcafe chrome tests"
  },
```

- Add spec with real api request:

### ./tests/hotel-collection.spec.js

```diff
...
+ test('should fetch hotel collection from backend and show it in screen when visit /hotels urls', async t => {
+   // Arrange

+   // Act

+   // Assert
+   await t
+     .expect(
+       Selector('[data-testid=hotelCollectionContainer]') .childElementCount
+     )
+     .eql(10);
+ });

```

- It looks like it's working, but what's happend if we add some delay?:

### ./src/pods/hotel-collection/hotel-collection.api.js

```diff
import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/api/hotels`;

- export const fetchHotelCollection = () =>
-   Axios.get(url).then(({ data }) => data);
+ export const fetchHotelCollection = () => {
+   const promise = new Promise(resolve => {
+     Axios.get(url).then(({ data }) => setTimeout(() => resolve(data), 4000));
+   });

+   return promise;
+ };
```

- Now, it's failing due to timeout, so we need to refactor it:

### ./tests/hotel-collection.spec.js

```diff
...
    // Assert
+   await t.wait(5000);
    await t
      .expect(
        Selector('[data-testid=hotelCollectionContainer]').childElementCount
      )
      .eql(2);
  }
);

...
  // Assert
+ await t.wait(5000);
  await t
    .expect(
      Selector('[data-testid=hotelCollectionContainer]').childElementCount
    )
    .eql(10);
});
```

- TestCafe hasn't `alias` mechanism like cypress, so, we need to take care with this stuff, let's restore the api request:

### ./src/pods/hotel-collection/hotel-collection.api.js

```diff
import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/api/hotels`;

- export const fetchHotelCollection = () => {
-   const promise = new Promise(resolve => {
-     Axios.get(url).then(({ data }) => setTimeout(() => resolve(data), 4000));
-   });

-   return promise;
- };
+ export const fetchHotelCollection = () =>
+   Axios.get(url).then(({ data }) => data);
```

- Remove previous spec:

### ./tests/hotel-collection.spec.js

```diff
...
    // Assert
-   await t.wait(5000);
    await t
      .expect(
        Selector('[data-testid=hotelCollectionContainer]').childElementCount
      )
      .eql(2);
  }
);

...

- test('should fetch hotel collection from backend and show it in screen when visit /hotels urls', async t => {
-   // Arrange

-   // Act

-   // Assert
-   await t.wait(5000);
-   await t
-     .expect(
-       Selector('[data-testid=hotelCollectionContainer]').childElementCount
-     )
-     .eql(10);
- });
```

- And restore `package.json`:

### ./src/package.json

```diff
"scripts": {
..
-   "test:e2e": "npm-run-all -p -l start start:e2e",
+   "test:e2e": "npm-run-all -p -l start:dev start:e2e",
    "start:e2e": "testcafe chrome tests"
  },
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
