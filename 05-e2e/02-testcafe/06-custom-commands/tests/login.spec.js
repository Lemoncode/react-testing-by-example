import { Selector, ClientFunction } from 'testcafe';
import { config } from '../testcafe.config';
import { fillLoginForm } from './commands';

fixture('Login specs').page(config.baseUrl);

test('should show an alert with a message when type invalid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = '1234';
  await t.setNativeDialogHandler(() => true);

  // Act
  await fillLoginForm(t, user, password);

  const getAlert = () =>
    new Promise(resolve => {
      setTimeout(() => {
        t.getNativeDialogHistory().then(([alert]) => resolve(alert));
      }, 500);
    });

  // Assert
  await t.expect(Selector('[data-testid=userInput]').value).eql(user);
  await t.expect(Selector('[data-testid=passwordInput]').value).eql(password);
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
  const getURL = ClientFunction(() => window.location.href);

  // Act
  await fillLoginForm(t, user, password);

  // Assert
  await t.expect(Selector('[data-testid=userInput]').value).eql(user);
  await t.expect(Selector('[data-testid=passwordInput]').value).eql(password);
  await t.expect(Selector('[data-testid=loginText]').textContent).eql(user);
  const url = await getURL();
  await t.expect(url).eql('http://localhost:8080/#/hotels');
});
