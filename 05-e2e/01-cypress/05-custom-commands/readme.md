# 05 Custom commands

In this example we are going to use `custom commands`.

We will start from `04-wait-requests`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- If we look into our code, we will notice that there some steps that we're going to want to repeat over the tests:

### ./cypress/support/commands.js

```javascript
Cypress.Commands.add('loadAndVisit', () => {
  cy.server();
  cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels').as(
    'fetchHotels'
  );
  cy.visit('#/hotels');
  cy.wait('@fetchHotels');
});
```

### ./cypress/support/index.js

```javascript
import './commands';
```

- Use it:

### ./cypress/integration/hotel-collection.spec.js

```diff
describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
-   cy.server();
-   cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels').as(
-     'fetchHotels'
-   );

    // Act
-   cy.visit('#/hotels');
    cy.loadAndVisit();

    // Assert
-   cy.wait('@fetchHotels');
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });
...
```

- Even, we could pass parameters if we want to be more generics:

### ./cypress/support/commands.js

```diff
Cypress.Commands.add('loadAndVisit', () => {
+ const { apiPath, fixture, routePath } = params;
  cy.server();
- cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels').as(
-   'fetchHotels'
- );
+ fixture
+   ? cy
+       .route('GET', `http://localhost:3000/api${apiPath}`, fixture)
+       .as('fetch')
+   : cy.route('GET', `http://localhost:3000/api${apiPath}`).as('fetch');
- cy.visit('#/hotels');
+ cy.visit(routePath);
- cy.wait('@fetchHotels');
+ cy.wait('@fetch');
});

```

- Update it:

### ./cypress/integration/hotel-collection.spec.js

```diff
...
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
+   const params = {
+     apiPath: '/hotels',
+     fixture: 'fixture:hotels',
+     routePath: '#/hotels',
+   };

    // Act
-   cy.loadAndVisit();
+   cy.loadAndVisit(params);

    // Assert
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });

  it('should fetch hotel collection from backend and show it in screen when visit /hotels urls', () => {
    // Arrange
-   cy.server();
-   cy.route('GET', 'http://localhost:3000/api/hotels').as('fetchHotels');
+   const params = {
+     apiPath: '/hotels',
+     routePath: '#/hotels',
+   };

    // Act
-   cy.visit('#/hotels');
+   cy.loadAndVisit(params);

    // Assert
-   cy.wait('@fetchHotels');
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 10);
  });
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
