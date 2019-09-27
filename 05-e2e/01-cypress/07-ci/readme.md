# 07 CI

In this example we are going to continuous integration config.

We will start from `06-edit-hotel`.

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
+   "test:e2e:ci": "npm-run-all -p -l start:dev run:e2e",
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

- About `login` spec, we are running `start:dev` and `run:e2e` processes in parallel, but the run process has to wait until the web server is up and running. So, we need to install [wait-on](https://github.com/jeffbski/wait-on):

```bash
npm install wait-on --save-dev
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
