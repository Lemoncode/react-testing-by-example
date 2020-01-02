# 01 Config

In this example we are going to add a basic setup needed to support end to end testing with Cypress.

We will start from `00-boilerplate`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

# Libraries

- We are going to install the main library which we base all our unit tests, [Cypress](https://www.cypress.io/).

```bash
npm install cypress --save-dev
```

# Config

- We can just add cypress command to scripts and running it:

### ./package.json

```diff
"scripts": {
...
    "build:dev": "npm run clean && webpack --config ./config/webpack/dev.js",
    "postinstall": "cd ./server && npm install",
+   "test:e2e": "cypress open"
  },
```

- Run it:

```bash
npm run test:e2e
```

- Cypress creates for us a folder `cypress` witn some other ones inside:

  - **fixtures**
  - **integration**
  - **plugins**
  - **screenshots**
  - **support**

- And a `cypress.json` for configuration.

- Let's remove all folders, and add our first test:

### ./cypress/integration/login.spec.js

```javascript
describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('http://localhost:8080');
  });
});
```

Let's setup _./package.json_ so we can start cypress

```bash
npm i npm-run-all -D
```

> An important note is that we need to run the app to execute the e2e tests:

### ./package.json

```diff
"scripts": {
...
-   "test:e2e": "cypress open"
+   "test:e2e": "npm-run-all -p -l start:dev start:e2e",
+   "start:e2e": "cypress open"
  },
```

- So far so good, we can add the base app url in `cypress.json` to avoid repeat it in whole tests:

### ./cypress.json

```json
{
  "baseUrl": "http://localhost:8080"
}
```

> You can see more info [here](https://docs.cypress.io/guides/references/configuration.html#Options)

### ./cypress/integration/login.spec.js

```diff
describe('Login specs', () => {
  it('visit the login page', () => {
-   cy.visit('http://localhost:8080');
+   cy.visit('/');
  });
});

```

Ok this is the way to procedure with simple tests in cypress, let's add cucumber.

## Configuring Cucumber

A lib was created to integrate the Cucumber to the Cypress on which it was based on gherkin-testcafe. The cucumber-preprocessor is here: [cypress-cucumber-preprocessor](https://www.npmjs.com/package/cypress-cucumber-preprocessor)

Cypress’s documentation accepted this repository as a **Plugin** for us to have a way to support and extend Cypress’s behavior so we can execute our Cucumber specifications.

Let's get this plugin up and running

```bash
npm i cypress-cucumber-preprocessor -D
```

Now that is already installed we can added as a plugin

Create _./cypress\plugins\index.js_

```js
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
};
```

Add support for feature files, edit _./cypress.json_

```json
{
  "testFiles": "**/*.feature"
}
```

Modify _./package.json_

```diff
...
"husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  },
+ "cypress-cucumber-preprocessor": {
+   "nonGlobalStepDefinitions": true
+ }
}
```

## Migrate specs

Right now we're using a _clasic_ aproach to resolve our tests. Let's change this and add _Cucumber_

Create _./cypress\integration\Login.feature_

```
Feature: User gets access to application

Scenario: User reaches login page
  Given I am a user that reaches login page
```

Create _./cypress\integration\Login\login.js_

```js
/// <reference types="Cypress" />

import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches login page', () => {
  cy.visit('/');
});
```

Remove _./cypress\integration\login.spec.js_

```bash
$ npm run test:e2e
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
