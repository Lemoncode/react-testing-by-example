# 02 Selectors

In this example we are going to add some specs to login page.

We will start from `01-config`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's add some specs to login page:

### ./tests/login.spec.js

```diff
+ import { Selector } from 'testcafe';
import { config } from '../testcafe.config';

fixture('Login specs').page(config.baseUrl);
describe('Login specs', () => {
- test('visit the login page', async t => {
+ test('should show an alert with a message when type invalid credentials', async t => {
+ // Arrange
+ const user = 'admin';
+ const password = '1234';

+ // Act
+ await t.typeText(
+   Selector(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input'),
+   user
+ );
+ await t.typeText(
+   Selector(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input'),
+   password
+ );

+ // Assert
+ await t
+   .expect(
+     Selector(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').value
+   )
+   .eql(user);
+ await t
+   .expect(
+     Selector(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').value
+   )
+   .eql(password);
});

```

- Notice that we are using selectors like css selectors, the first refactor that we could think is assign selectors to a variable like:

### ./tests/login.spec.js

```diff
test('should show an alert with a message when type invalid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = '1234';
+ const userInput = Selector(
+   ':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input'
+ );
+ const passwordInput = Selector(
+   ':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input'
+ );

  // Act
- await t.typeText(
-   Selector(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input'),
-    user
- );
+ await t.typeText(userInput, user);
- await t.typeText(
-   Selector(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input'),
-   password
- );
+ await t.typeText(passwordInput, password);

  // Assert
- await t
-   .expect(
-     Selector(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').value
-   )
-   .eql(user);
+ await t.expect(userInput.value).eql(user);
- await t
-   .expect(
-     Selector(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').value
-   )
-   .eql(password);
+ await t.expect(passwordInput.value).eql(password);
});

```

- Another important best practice, it's using `data-testid` selectors instead of `css classes`. With this approach, we are isolating the test from real implementation:

### ./tests/login.spec.js

```diff
test('should show an alert with a message when type invalid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = '1234';
- const userInput = Selector(
-   ':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input'
- );
+ const userInput = Selector('[data-testid=userInput]');
- const passwordInput = Selector(
-   ':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input'
- );
+ const passwordInput = Selector('[data-testid=passwordInput]');
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

### ./tests/login.spec.js

```diff
test('should show an alert with a message when type invalid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = '1234';
  const userInput = Selector('[data-testid=userInput]');
  const passwordInput = Selector('[data-testid=passwordInput]');
+ await t.setNativeDialogHandler(() => true);

  // Act
  await t.typeText(userInput, user);
  await t.typeText(passwordInput, password);
+ await t.click(Selector('[data-testid=loginButton]'));

  // Assert
  await t.expect(userInput.value).eql(user);
  await t.expect(passwordInput.value).eql(password);
+ const [alert] = await t.getNativeDialogHistory();
+ await t
+   .expect(alert.text)
+   .eql(
+     'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
+   );
});

```

> More info in [handling-native-dialogs]https://devexpress.github.io/testcafe/documentation/test-api/handling-native-dialogs.html)

- Previous code does not work, because there is a condition race, between open the window.alert and `getNativeDialogHistory`. Let's refactor it:

### ./tests/login.spec.js

```diff
test('should show an alert with a message when type invalid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = '1234';
  const userInput = Selector('[data-testid=userInput]');
  const passwordInput = Selector('[data-testid=passwordInput]');
  await t.setNativeDialogHandler(() => true);

  // Act
  await t.typeText(userInput, user);
  await t.typeText(passwordInput, password);
  await t.click(Selector('[data-testid=loginButton]'));

+ const getAlert = () =>
+   new Promise(resolve => {
+     setTimeout(() => {
+       t.getNativeDialogHistory().then(([alert]) => resolve(alert));
+     }, 500);
+   });

  // Assert
  await t.expect(userInput.value).eql(user);
  await t.expect(passwordInput.value).eql(password);
- const [alert] = await t.getNativeDialogHistory();
+ const alert = await getAlert;
  await t
    .expect(alert.text)
    .eql(
      'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
    );
});

```

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

### ./tests/login.spec.js

```diff
- import { Selector } from 'testcafe';
+ import { Selector, ClientFunction } from 'testcafe';
import { config } from '../testcafe.config';
...
+ test('should update header user name and navigate to hotels url when type valid credentials', async t => {
+   // Arrange
+   const user = 'admin';
+   const password = 'test';
+   const userInput = Selector('[data-testid=userInput]');
+   const passwordInput = Selector('[data-testid=passwordInput]');
+   const getURL = ClientFunction(() => window.location.href);
+
+   // Act
+   await t.typeText(userInput, user);
+   await t.typeText(passwordInput, password);
+   await t.click(Selector('[data-testid=loginButton]'));
+
+   // Assert
+   await t.expect(userInput.value).eql(user);
+   await t.expect(passwordInput.value).eql(password);
+   await t.expect(Selector('[data-testid=loginText]').textContent .eql(user);
+   const url = await getURL();
+   await t.expect(url).eql('http://localhost:8080/#/hotels');
});
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
