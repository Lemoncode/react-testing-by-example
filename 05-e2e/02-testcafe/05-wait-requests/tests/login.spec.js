import { Selector, ClientFunction } from 'testcafe';
import { config } from '../testcafe.config';

fixture('Login specs').page(config.baseUrl);

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

  const getAlert = () =>
    new Promise(resolve => {
      setTimeout(() => {
        t.getNativeDialogHistory().then(([alert]) => resolve(alert));
      }, 500);
    });

  // Assert
  await t.expect(userInput.value).eql(user);
  await t.expect(passwordInput.value).eql(password);
  const alert = await getAlert();
  await t
    .expect(alert.text)
    .eql(
      'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
    );
});

test('should update header user name and navigate to hotels url when type valid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = 'test';
  const userInput = Selector('[data-testid=userInput]');
  const passwordInput = Selector('[data-testid=passwordInput]');
  const getURL = ClientFunction(() => window.location.href);

  // Act
  await t.typeText(userInput, user);
  await t.typeText(passwordInput, password);
  await t.click(Selector('[data-testid=loginButton]'));

  // Assert
  await t.expect(userInput.value).eql(user);
  await t.expect(passwordInput.value).eql(password);
  await t.expect(Selector('[data-testid=loginText]').textContent).eql(user);
  const url = await getURL();
  await t.expect(url).eql('http://localhost:8080/#/hotels');
});
