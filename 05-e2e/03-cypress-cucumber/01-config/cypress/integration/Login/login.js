/// <reference types="Cypress" />

import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('I am a user that reaches login page', () => {
  cy.visit('/');
});
