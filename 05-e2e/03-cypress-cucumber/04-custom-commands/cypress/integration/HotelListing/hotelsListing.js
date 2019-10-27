/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches hotels', () => {
  // cy.loadAndVisit();
  const params = {
    apiPath: '/hotels',
    fetchAlias: 'fetchHotels',
  };
  cy.loadData(params);
  cy.visit('#/hotels');
});

Then('I see a list of hotels', () => {
  cy.wait('@fetchHotels');
  cy.get('[data-testid="hotel-collection-container"]')
    .children()
    // .should('have.length', 2);
    .should('have.length', 10);
});
