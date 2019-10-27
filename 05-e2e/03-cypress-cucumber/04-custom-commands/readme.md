# 04 Custom commands

In this example we are going to use `custom commands`.

We will start from `03-stub-requests`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

Currently we're just starting the application without start the api data server. Using mocking data or real data only depends in if we mock the server request. Edit _./package.json_

```diff
"scripts": {
    "start": "npm-run-all -p -l start:dev start:server",
    "start:dev": "webpack-dev-server --config ./config/webpack/dev.js",
    "start:prod": "webpack-dev-server --config ./config/webpack/prod.js",
    "start:server": "cd server && npm run mock-server",
    "clean": "rimraf dist",
    "build": "npm run clean && webpack --config ./config/webpack/prod.js",
    "build:dev": "npm run clean && webpack --config ./config/webpack/dev.js",
    "postinstall": "cd ./server && npm install",
-   "test:e2e": "npm-run-all -p -l start:dev start:e2e",
+   "test:e2e": "npm-run-all -p -l start start:e2e",
    "start:e2e": "cypress open"
  },
```

- If we look into our code, we will notice that there some steps that we're going to want to repeat over the tests:

Edit _./cypress\support\commands.js_

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

No we can use it into _HotelListing tests_. Edit _./cypress\integration\HotelListing\hotelsListing.js_

```diff
/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches hotels', () => {
- cy.server();
- cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels');

- cy.visit('#/hotels');
+ cy.loadAndVisit();
});

Then('I see a list of hotels', () => {
  cy.get('[data-testid="hotel-collection-container"]')
    .children()
    .should('have.length', 2);
});

```

- Even, we could pass parameters if we want to be more generics:

Edit _./cypress\support\commands.js_. Replace with this code

```js
Cypress.Commands.add('loadData', params => {
  const { apiPath, fixture, fetchAlias } = params;
  cy.server();
  fixture
    ? cy
        .route('GET', `http://localhost:3000/api${apiPath}`, fixture)
        .as(fetchAlias)
    : cy.route('GET', `http://localhost:3000/api${apiPath}`).as(fetchAlias);
});
```

Now we can use it in _./cypress\integration\HotelListing\hotelsListing.js_

```diff
/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches hotels', () => {
- cy.loadAndVisit();
+ const params = {
+   apiPath: '/hotels',
+   fetchAlias: 'fetchHotels',
+ };
+ cy.loadData(params);
+ cy.visit('#/hotels');
});

Then('I see a list of hotels', () => {
+ cy.wait('@fetchHotels');
  cy.get('[data-testid="hotel-collection-container"]')
    .children()
-   .should('have.length', 2);
+   .should('have.length', 10);
});

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
