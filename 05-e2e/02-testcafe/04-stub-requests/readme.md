# 04 Stub requests

In this example we are going to stub hotel request.

We will start from `03-debug`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- We will create `hotel-collection` specs:

### ./tests/hotel-collection.spec.js

```javascript
describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

- Add `data-testid`:

### ./src/pods/hotel-collection/hotel-collection.component.jsx

```diff
...

  return (
-   <div className={classes.container}>
+   <div className={classes.container data-testid="hotelCollectionContainer">
      {hotelCollection.map(hotel => (
...

```

- Update spec:

### ./tests/hotel-collection.spec.js

```diff
+ import { Selector } from 'testcafe';
import { config } from '../testcafe.config';

- fixture('Hotel collection specs').page(config.baseUrl);
+ fixture('Hotel collection specs').page(`${config.baseUrl}#/hotels`);

test('should fetch 2 hotels and show it in screen when visit /hotels urls', async t => {
  // Arrange

  // Act

  // Assert
+ await t.expect(
+   Selector('[data-testid=hotelCollectionContainer]').childElementCount
+ ).eql(0);
});

```

- How can we simulate, fetching 2 hotels?:

### ./tests/hotel-collection.spec.js

```diff
- import { Selector } from 'testcafe';
+ import { Selector, RequestMock } from 'testcafe';
import { config } from '../testcafe.config';

fixture('Hotel collection specs').page(`${config.baseUrl}#/hotels`);

+   const hotels = [
+     {
+       id: 'id-1',
+       thumbNailUrl: 'test-picture-1',
+       name: 'test-name-1',
+       shortDescription: 'test-description-1',
+       address1: 'test-address-1',
+       hotelRating: 1,
+       city: 'test-city-1',
+     },
+     {
+       id: 'id-2',
+       thumbNailUrl: 'test-picture-2',
+       name: 'test-name-2',
+       shortDescription: 'test-description-2',
+       address1: 'test-address-2',
+       hotelRating: 2,
+       city: 'test-city-2',
+     },
+   ];

+ const mock = RequestMock()
+   .onRequestTo('http://localhost:3000/api/hotels')
+   .respond(hotels, 200, {
+     'access-control-allow-origin': '*',
+     'access-control-allow-credentials': true,
+   });

- test('should fetch 2 hotels and show it in screen when visit /hotels urls', async t => {
+ test.requestHooks(mock)(
+   'should fetch 2 hotels and show it in screen when visit /hotels urls',
  // Arrange

  // Act

  // Assert
  await t.expect(
    Selector('[data-testid=hotelCollectionContainer]').childElementCount
- ).eql(0);
+ ).eql(2);
});

```

> More info [here](https://devexpress.github.io/testcafe/documentation/test-api/intercepting-http-requests/)

- This is a common task that we will have to do, so we could move it to:

### ./tests/mocks/hotels.js

```javascript
export const mockHotels = [
  {
    id: 'id-1',
    thumbNailUrl: 'test-picture-1',
    name: 'test-name-1',
    shortDescription: 'test-description-1',
    address1: 'test-address-1',
    hotelRating: 1,
    city: 'test-city-1',
  },
  {
    id: 'id-2',
    thumbNailUrl: 'test-picture-2',
    name: 'test-name-2',
    shortDescription: 'test-description-2',
    address1: 'test-address-2',
    hotelRating: 2,
    city: 'test-city-2',
  },
];
```

- And the request:

### ./tests/mocks/requests.js

```javascript
import { RequestMock } from 'testcafe';

export const getMockRequest = (url, data, statusCode) =>
  RequestMock()
    .onRequestTo(url)
    .respond(data, statusCode, {
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': true,
    });
```

- Add `barrel` file:

```javascript
export * from './hotels';
export * from './requests';
```

### ./tests/mocks/requests.js

```javascript
import { RequestMock } from 'testcafe';

export const getMockRequest = (url, data, statusCode) =>
  RequestMock()
    .onRequestTo(url)
    .respond(data, statusCode, {
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': true,
    });
```

- Update spec:

### ./tests/hotel-collection.spec.js

```diff
- import { Selector, RequestMock } from 'testcafe';
+ import { Selector } from 'testcafe';
import { config } from '../testcafe.config';
+ import { getMockRequest, mockHotels } from './mocks';

fixture('Hotel collection specs').page(`${config.baseUrl}#/hotels`);

-   const hotels = [
-     {
-       id: 'id-1',
-       thumbNailUrl: 'test-picture-1',
-       name: 'test-name-1',
-       shortDescription: 'test-description-1',
-       address1: 'test-address-1',
-       hotelRating: 1,
-       city: 'test-city-1',
-     },
-     {
-       id: 'id-2',
-       thumbNailUrl: 'test-picture-2',
-       name: 'test-name-2',
-       shortDescription: 'test-description-2',
-       address1: 'test-address-2',
-       hotelRating: 2,
-       city: 'test-city-2',
-     },
-   ];

- const mock = RequestMock()
-   .onRequestTo('http://localhost:3000/api/hotels')
-   .respond(hotels, 200, {
-     'access-control-allow-origin': '*',
-     'access-control-allow-credentials': true,
-   });

- test.requestHooks(mock
+ test.requestHooks(
+   getMockRequest('http://localhost:3000/api/hotels', mockHotels, 200)
)(
  'should fetch 2 hotels and show it in screen when visit /hotels urls',
  ...
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
