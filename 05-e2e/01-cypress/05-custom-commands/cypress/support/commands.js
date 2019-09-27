Cypress.Commands.add('loadAndVisit', params => {
  const { apiPath, fixture, routePath } = params;
  cy.server();
  fixture
    ? cy
        .route('GET', `http://localhost:3000/api${apiPath}`, fixture)
        .as('fetch')
    : cy.route('GET', `http://localhost:3000/api${apiPath}`).as('fetch');
  cy.visit(routePath);
  cy.wait('@fetch');
});
