# 08 CI

In this example we are going to continuous integration config.

We will start from `07-edit-hotel`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Add script commands to run in ci process:

### ./package.json

```diff
...
"scripts": {
    "test:e2e": "npm-run-all -p -l start start:e2e",
    "start:e2e": "cypress open",
+   "test:e2e:ci": "npm-run-all -p -l- r start:dev run:e2e",
+   "run:e2e": "cypress run"
  },
...
```

- And run it:

```bash
npm run test:e2e:ci
```

- As we see, `hotel collection specs` are failing. Since, we are running the web server without backend, we should remove spec retrieving real data.

### ./cypress/integration/hotel-collection.spec.js

```diff
...
- it('should fetch hotel collection from backend and show it in screen when visit /hotels urls', () => {
-   // Arrange
-   const params = {
-     apiPath: '/hotels',
-     fetchAlias: 'fetchHotels',
-   };

-   // Act
-   cy.loadData(params);
-   cy.visit('#/hotels');

-   // Assert
-   cy.wait('@fetchHotels');
-   cy.get('[data-testid="hotelCollectionContainer"]')
-     .children()
-     .should('have.length', 10);
- });
});

```

- Notice that `cypress` has added `screenshots` and `videos` with failing specs, we should ignore these folder for git:

### ./.gitignore

```diff
...
.awcache
+ cypress/screenshots
+ cypress/videos

```

- Add circe ci config file:

### ./.circleci/config.yml

```yml
version: 2
jobs:
  build:
    working_directory: ~/test-ci-code
    docker:
      - image: circleci/node:10
    steps:
      - checkout
      - run:
          name: install cypress dependencies
          command: 'sudo apt-get install xvfb libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2'
      - run:
          name: install
          command: 'npm install'
      - run:
          name: test:e2e
          command: 'npm run test:e2e:ci'
```

> We need to install cypress dependencies. More info [here](https://docs.cypress.io/guides/guides/continuous-integration.html#Advanced-setup)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
