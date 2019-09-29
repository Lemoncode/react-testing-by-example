# 06 Custom commands

In this example we are going to use `custom commands`.

We will start from `05-wait-requests`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Sometimes, we need to reuse some functionality. For example, we will try to reuse `fill login form` functionality:

### ./tests/commands/commands.js

```javascript
import { Selector } from 'testcafe';

export const fillLoginForm = async (t, user, password) => {
  await t.typeText(Selector('[data-testid=userInput]'), user);
  await t.typeText(Selector('[data-testid=passwordInput]'), password);
  await t.click(Selector('[data-testid=loginButton]'));
};
```

- Add `barrel` file:

### ./tests/commands/index.js

```javascript
export * from './commands';
```

- Use it:

### ./tests/login.spec.js

```diff
import { Selector, ClientFunction } from 'testcafe';
import { config } from '../testcafe.config';
+ import { fillLoginForm } from './commands';

fixture('Login specs').page(config.baseUrl);

test('should show an alert with a message when type invalid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = '1234';
- const userInput = Selector('[data-testid=userInput]');
- const passwordInput = Selector('[data-testid=passwordInput]');
  await t.setNativeDialogHandler(() => true);

  // Act
- await t.typeText(userInput, user);
- await t.typeText(passwordInput, password);
- await t.click(Selector('[data-testid=loginButton]'));
+ await fillLoginForm(t, user, password);

...
  // Assert
- await t.expect(userInput.value).eql(user);
+ await t.expect(Selector('[data-testid=userInput]').value).eql(user);
- await t.expect(passwordInput.value).eql(password);
+ await t.expect(Selector('[data-testid=passwordInput]').value).eql(password);
...
});

test('should update header user name and navigate to hotels url when type valid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = 'test';
- const userInput = Selector('[data-testid=userInput]');
- const passwordInput = Selector('[data-testid=passwordInput]');
  const getURL = ClientFunction(() => window.location.href);

  // Act
- await t.typeText(userInput, user);
- await t.typeText(passwordInput, password);
- await t.click(Selector('[data-testid=loginButton]'));
+ await fillLoginForm(t, user, password);

  // Assert
- await t.expect(userInput.value).eql(user);
+ await t.expect(Selector('[data-testid=userInput]').value).eql(user);
- await t.expect(passwordInput.value).eql(password);
+ await t.expect(Selector('[data-testid=passwordInput]').value).eql(password);
  await t.expect(Selector('[data-testid=loginText]').textContent).eql(user);
  const url = await getURL();
  await t.expect(url).eql('http://localhost:8080/#/hotels');
});

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
