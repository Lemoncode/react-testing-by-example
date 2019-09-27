# 03 Stub requests

In this example we are going to stub hotel request.

We will start from `02-selectors`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- We will create `hotel-collection` specs:

### ./cypress/integration/hotel-collection.spec.js

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

### ./src/pods/hotel-collection/hotel-collection.jsx

```diff
...

  return (
-   <div className={classes.container}>
+   <div className={classes.container data-testid="hotelCollectionContainer">
      {hotelCollection.map(hotel => (
...

```

- Update spec:

### ./cypress/integration/hotel-collection.spec.js

```diff
describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange

    // Act
+   cy.visit('#/hotels');

    // Assert
+   cy.get('[data-testid="hotelCollectionContainer"]')
+     .children()
+     .should('have.length', 0);
  });
});
```

- How can we simulate, fetching 2 hotels?:

### ./cypress/integration/hotel-collection.spec.js

```diff
describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
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
+   cy.server();
+   cy.route('GET', 'http://localhost:3000/api/hotels', hotels);

    // Act
    cy.visit('#/hotels');

    // Assert
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
-     .should('have.length', 0);
+     .should('have.length', 2);
  });
});

```

- This is a common task that we will have to do, so cypress provide the `fixtures` approach:

### ./cypress/fixtures/hotels.json

```json
[
  {
    "id": "id-1",
    "thumbNailUrl": "test-picture-1",
    "name": "test-name-1'",
    "shortDescription": "test-description-1",
    "address1": "test-address-1",
    "hotelRating": "1",
    "city": "test-city-1"
  },
  {
    "id": "id-2",
    "thumbNailUrl": "test-picture-2",
    "name": "test-name-2'",
    "shortDescription": "test-description-2",
    "address1": "test-address-2",
    "hotelRating": "2",
    "city": "test-city-2"
  }
]
```

- Update spec:

### ./cypress/integration/hotel-collection.spec.js

```diff
describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
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
    cy.server();
-   cy.route('GET', 'http://localhost:3000/api/hotels', hotels);
+   cy.fixture('hotels').then(hotels => {
+     cy.route('GET', 'http://localhost:3000/api/hotels', hotels);
+   });

    // Act
    cy.visit('#/hotels');

    // Assert
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });
});

```

- Or a shorted way:

### ./cypress/integration/hotel-collection.spec.js

```diff
describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
    cy.server();
-   cy.fixture('hotels').then(hotels => {
-     cy.route('GET', 'http://localhost:3000/api/hotels', hotels);
-   });
+   cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels');

    // Act
    cy.visit('#/hotels');

    // Assert
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });
});

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
