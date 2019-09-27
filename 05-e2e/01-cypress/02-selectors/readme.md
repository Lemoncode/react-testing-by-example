# 02 Selectors

In this example we are going to add some specs to login page.

We will start from `01-config`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's add some specs to login page:

### ./cypress/integration/login.spec.js

```diff
describe('Login specs', () => {
- it('visit the login page', () => {
+ it('should show an alert with a message when type invalid credentials', () => {
+   // Arrange
    cy.visit('/');
+   const user = 'admin';
+   const password = '1234';

+   // Act
+   cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type(
+     user
+   );

+   cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type(
+     password
+   );

+   // Assert
+   cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').should(
+     'have.value',
+     user
+   );
+   cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').should(
+     'have.value',
+     password
+   );
  });
});

```

- Notice that we are using selectors like css selectors, the first refactor that we could think is assign selectors to a variable like:

### ./cypress/integration/login.spec.js

```diff
describe('Login specs', () => {
  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    cy.visit('/');
    const user = 'admin';
    const password = '1234';
+   const userInput = cy.get(
+     ':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input'
+   );
+   const passwordInput = cy.get(
+     ':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input'
+   );

    // Act
-   cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type(
-     user
-   );
+   userInput.type(user);

-   cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type(
-     password
-   );
+   passwordInput.type(password);

    // Assert
-   cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').should(
-     'have.value',
-     user
-   );
+   userInput.should('have.value', user);
-   cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').should(
-     'have.value',
-     password
-   );
+   passwordInput.should('have.value', password);
  });
});

```

- This doesn't work, because `cypress commands` are enqueued and run it in async way. Let's refator it:

### ./cypress/integration/login.spec.js

```diff
describe('Login specs', () => {
  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    cy.visit('/');
    const user = 'admin';
    const password = '1234';
-   const userInput = cy.get(
-     ':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input'
-   );
+   cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').as(
+      'userInput'
+   );
-   const passwordInput = cy.get(
-     ':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input'
-   );
+   cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').as(
+     'passwordInput'
+   );

    // Act
-   userInput.type(user);
+   cy.get('@userInput').type(user);
-   passwordInput.type(password);
+   cy.get('@passwordInput').type(password);

    // Assert
-   userInput.should('have.value', user);
+   cy.get('@userInput').should('have.value', user);
-   passwordInput.should('have.value', password);
+   cy.get('@passwordInput').should('have.value', password);
  });
});

```

> More info [here](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
