# 03 Stub requests

In this example we are going to stub hotel request.

We will start from `02-selectors`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- We will create Hotel Listing feature:

Create _./cypress\integration\HotelListing.feature_

```
Feature: User cen see hotels

Scenario: User reaches hotel page
  Given I am a user that reaches hotels
  Then I see a list of hotels

```

Modify _./src\pods\hotel-collection\hotel-collection.component.jsx_

```diff

  return (
-   <div className={classes.container}>
+   <div className={classes.container} data-testid="hotel-collection-container">
      {hotelCollection.map(hotel => (


```

Create _.&cypress\integration\HotelListing\hotelsListing.js_

```js
/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches hotels', () => {
  cy.visit('#/hotels');
});

Then('I see a list of hotels', () => {
  cy.get('[data-testid="hotel-collection-container"]')
    .children()
    .should('have.length', 0);
});
```

The test will pass, but in order to have some data, _api server_ must be running. We have another alternative, we can use _Cypress_ to stub the request.

Modify _./cypress\integration\HotelListing\hotelsListing.js_

```diff
/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches hotels', () => {
+ const hotels = [
+   {
+     id: 'id-1',
+     thumbNailUrl: 'test-picture-1',
+     name: 'test-name-1',
+     shortDescription: 'test-description-1',
+     address1: 'test-address-1',
+     hotelRating: 1,
+     city: 'test-city-1',
+   },
+   {
+     id: 'id-2',
+     thumbNailUrl: 'test-picture-2',
+     name: 'test-name-2',
+     shortDescription: 'test-description-2',
+     address1: 'test-address-2',
+     hotelRating: 2,
+     city: 'test-city-2',
+   },
+ ];
+ cy.server();
+ cy.route('GET', 'http://localhost:3000/api/hotels', hotels);

  cy.visit('#/hotels');
});

Then('I see a list of hotels', () => {
  cy.get('[data-testid="hotel-collection-container"]')
    .children()
-   .should('have.length', 0);
+   .should('have.length', 2);
});

```

- Of course we can keep using `fixtures`

Create _./cypress\fixtures\example.json_

```json
[
  {
    "id": "id-1",
    "thumbNailUrl": "test-picture-1",
    "name": "test-name-1",
    "shortDescription": "test-description-1",
    "address1": "test-address-1",
    "hotelRating": 1,
    "city": "test-city-1"
  },
  {
    "id": "id-2",
    "thumbNailUrl": "test-picture-2",
    "name": "test-name-2",
    "shortDescription": "test-description-2",
    "address1": "test-address-2",
    "hotelRating": 2,
    "city": "test-city-2"
  }
]
```

Update _./cypress\integration\HotelListing\hotelsListing.js_

```diff
/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches hotels', () => {
- const hotels = [
-   {
-     id: 'id-1',
-     thumbNailUrl: 'test-picture-1',
-     name: 'test-name-1',
-     shortDescription: 'test-description-1',
-     address1: 'test-address-1',
-     hotelRating: 1,
-     city: 'test-city-1',
-   },
-   {
-     id: 'id-2',
-     thumbNailUrl: 'test-picture-2',
-     name: 'test-name-2',
-     shortDescription: 'test-description-2',
-     address1: 'test-address-2',
-     hotelRating: 2,
-     city: 'test-city-2',
-   },
- ];
  cy.server();
- cy.route('GET', 'http://localhost:3000/api/hotels', hotels);
+ cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels');

  cy.visit('#/hotels');
});

Then('I see a list of hotels', () => {
  cy.get('[data-testid="hotel-collection-container"]')
    .children()
    .should('have.length', 2);
});



```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
