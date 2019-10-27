/// <reference types="Cypress" />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches login page', () => {
  cy.visit('/');
});

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
