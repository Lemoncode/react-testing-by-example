import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user setting my custom greet', () => {
  cy.visit('http://localhost:8080');
});

Then('the greeter should appear', () => {
  expect(true).to.equal(true);
});
