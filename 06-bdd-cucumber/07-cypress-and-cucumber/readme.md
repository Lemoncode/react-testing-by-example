# 07 Cypress and Cucumber

Ok let's mix this two technologies together.

Summary steps:

- Install `cypress`

## 1. Let's install cypress

```bash
npm i cypress -D
```

Cypress will set up everything that is necessary to run our tests, so after installation is completed, running cypress is as easy as

```bash
npm run cypress open
```

If we have the issue that anything is started we can create the folder structure by our selve:

**cypress**

- **fixtures**
- **integration**
- **plugins**
- **screenshots**
- **support**

A _./cypress.json_ for configurattion.

To check that the minimum configuration is working:

Create _./cypress\integration\test.spec.js_

```js
describe('test initial config', () => {
  it('visit root url', () => {
    cy.visit('http://localhost:8080');
  });
});
```

Let's setup _./package.json_ so we can start cypress

```bash
npm i npm-run-all -D
```

```diff
"scripts": {
...
-   "test:e2e": "cypress open"
+   "test:e2e": "npm-run-all -p -l start:dev start:e2e",
+   "start:e2e": "cypress open"
  },
```

## 2. Configuring Cucumber

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

Create _./cypress\integration\Greeter.feature_

```
Feature: Custom user greet

Scenario: User sets its custom greet
  Given I am a user setting my custom greet
  Then the greeter should appear


```

Create _./cypress\integration\Greeter\greeter.js_

```js
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user setting my custom greet', () => {
  cy.visit('http://localhost:8080');
});

Then('the greeter should appear', () => {
  expect(true).to.equal(true);
});
```

Now we're running cypress + cucumber

## References

> https://www.npmjs.com/package/cypress-cucumber-preprocessor#configuration

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
