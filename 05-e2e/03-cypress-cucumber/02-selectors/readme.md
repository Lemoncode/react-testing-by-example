# 02 Selectors

In this example we are going to add some specs to login page.

We will start from `01-config`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

Let's add new scenarios to _./cypress\integration\Login.feature_

```diff
Feature: User gets access to application

Scenario: User reachs login page
  Given I am a user that reaches login page
+
+Scenario: User does not provide right credentials
+ Given I am a user that reaches login page
+ When User provides right login name
+ When User provides wrong password
+ Then Notify user something goes wrong

```

To make easier reach the elements in our tests lets add _data-testid_

Modify _./src\common\components\text-field.component.jsx_

```diff
      rowsMax={rowsMax}
      placeholder={placeholder}
+     inputProps={{
+       'data-testid': props['data-testid'],
+     }}
    >
      {children}
    </TextField>
```

Modify _./src\pods\login\login.component.jsx_

```diff
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
+           data-testid="loginInput"
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
-         <Button type="submit" variant="contained" color="primary">
+         <Button data-testid="loginButton" type="submit" variant="contained" color="primary">
            Login
          </Button>
        </FormComponent>
      </CardContent>
    </Card>
```

Modify _./cypress\integration\Login\login.js_

```js
/// <reference types="Cypress" />

/*diff*/
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
/*diff*/

Given('I am a user that reaches login page', () => {
  cy.visit('/');
});

/*diff*/
When('User provides right login name', () => {
  cy.get('[data-testid="loginInput"]')
    .as('loginInput')
    .type('admin');
});

When('User provides wrong password', () => {
  cy.get('[data-testid="passwordInput"]')
    .as('passwordInput')
    .type('1234');
  const spy = cy.spy().as('alertSpy');
  cy.on('window:alert', spy);
});

When('User feeds credentials to app', () => {
  cy.get('[data-testid="loginButton"]').click();
});

Then('Notify user something goes wrong', () => {
  cy.get('@loginInput').should('have.value', 'admin');
  cy.get('@passwordInput').should('have.value', '1234');
  cy.get('@alertSpy').should(
    'have.been.calledWith',
    'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
  );
});
/*diff*/
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
