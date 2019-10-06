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
+   const user = 'admin';
+   const password = '1234';

+   // Act
    cy.visit('/');
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
    const user = 'admin';
    const password = '1234';

    // Act
    cy.visit('/');
+   const userInput = cy.get(
+     ':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input'
+   );
+   const passwordInput = cy.get(
+     ':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input'
+   );
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
    const user = 'admin';
    const password = '1234';

    // Act
    cy.visit('/');
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

- Another important best practice, it's using `data-testid` selectors instead of `css classes`. With this approach, we are isolating the test from real implementation:

### ./cypress/integration/login.spec.js

```diff
describe('Login specs', () => {
  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234';

    // Act
    cy.visit('/');
-   cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').as(
-     'userInput'
-   );
+   cy.get('[data-testid=userInput]').as('userInput');
-   cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').as(
-     'passwordInput'
-   );
+   cy.get('[data-testid=passwordInput]').as('passwordInput');

...
});

```

- Update `login.component`:

### ./src/pods/login/login.component.jsx

```diff
...

export const LoginComponent = props => {
...

  return (
    <Card>
      <CardHeader title="Login" />
      <CardContent>
        <FormComponent className={classes.formContainer} onSubmit={onLogin}>
          <TextFieldComponent
            label="Name"
            name="login"
            value={credentials.login}
            onChange={onUpdateCredentials}
            error={credentialErrors.login.message}
+           data-testid="userInput"
          />
          <TextFieldComponent
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={onUpdateCredentials}
            error={credentialErrors.password.message}
+           data-testid="passwordInput"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
+           data-testid="loginButton"
          >
            Login
          </Button>
        </FormComponent>
      </CardContent>
    </Card>
  );
};

```

- Update `common component`:

### ./src/common/components/text-field.component.jsx

```diff
...
      rowsMax={rowsMax}
      placeholder={placeholder}
+     inputProps={{
+       'data-testid': props['data-testid'],
+     }}
    >
      {children}
    </TextField>
  );
};
...

```

- Checking modal error message when click on button with invalid credentials:

### ./cypress/integration/login.spec.js

```diff
describe('Login specs', () => {
  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234';
+   const spy = cy.spy().as('alertSpy');
+   cy.on('window:alert', spy);

    // Act
    cy.visit('/');
    cy.get('[data-testid=userInput]').as('userInput');
    cy.get('[data-testid=passwordInput]').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
+   cy.get('[data-testid=loginButton]').click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
+   cy.get('@alertSpy').should(
+     'have.been.calledWith',
+     'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
+   );
  });
});

```

> More info in [event-types](https://docs.cypress.io/api/events/catalog-of-events.html#Event-Types)

- Now, we could test when it's a succeded login:

### ./src/layouts/app.layout.jsx

```diff
...

          <Typography
            ref={useFlasher()}
            variant="h6"
            color="inherit"
+           data-testid="loginText"
          >
            {login}
          </Typography>
...
```

### ./cypress/integration/login.spec.js

```diff
...
+ it('should update header user name and navigate to hotels url when type valid credentials', () => {
+   // Arrange
+   const user = 'admin';
+   const password = 'test';

+   // Act
+   cy.visit('/');
+   cy.get('[data-testid=userInput]').as('userInput');
+   cy.get('[data-testid=passwordInput]').as('passwordInput');
+   cy.get('@userInput').type(user);
+   cy.get('@passwordInput').type(password);
+   cy.get('[data-testid=loginButton]').click();

+   // Assert
+   cy.get('@userInput').should('have.value', user);
+   cy.get('@passwordInput').should('have.value', password);
+   cy.get('[data-testid=loginText]').should('have.text', user);
+   cy.url().should('eq', 'http://localhost:8080/#/hotels');
+ });
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
