# 04 Wait requests

In this example we are going to use real hotel request.

We will start from `03-stub-requests`.

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
    "start:e2e": "cypress open"
  },
```

- Add spec with real api request:

### ./cypress/integration/hotel-collection.spec.js

```diff
...
+ it('should fetch hotel collection from backend and show it in screen when visit /hotels urls', () => {
+   // Arrange

+   // Act
+   cy.visit('#/hotels');

+   // Assert
+   cy.get('[data-testid="hotelCollectionContainer"]')
+     .children()
+     .should('have.length', 10);
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

- Now, it's failing due to cypress timeout, so we need to refactor it:

### ./cypress/integration/hotel-collection.spec.js

```diff
describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
    cy.server();
-   cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels');
+   cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels').as(
+     'fetchHotels'
+   );

    // Act
    cy.visit('#/hotels');

    // Assert
+   cy.wait('@fetchHotels');
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });

  it('should fetch hotel collection from backend and show it in screen when visit /hotels urls', () => {
    // Arrange
+   cy.server();
+   cy.route('GET', 'http://localhost:3000/api/hotels').as('fetchHotels');

    // Act
    cy.visit('#/hotels');

    // Assert
+   cy.wait('@fetchHotels');
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 10);
  });
});

```

- So, we need to take care with this stuff, let's restore the api request:

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

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
