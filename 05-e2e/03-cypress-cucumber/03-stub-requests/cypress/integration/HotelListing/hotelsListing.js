/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches hotels', () => {
  cy.server();
  cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels');

  cy.visit('#/hotels');
});

Then('I see a list of hotels', () => {
  cy.get('[data-testid="hotel-collection-container"]')
    .children()
    .should('have.length', 2);
});
