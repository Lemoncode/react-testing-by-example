import { Selector } from 'testcafe';

export const fillLoginForm = async (t, user, password) => {
  await t.typeText(Selector('[data-testid=userInput]'), user);
  await t.typeText(Selector('[data-testid=passwordInput]'), password);
  await t.click(Selector('[data-testid=loginButton]'));
};
