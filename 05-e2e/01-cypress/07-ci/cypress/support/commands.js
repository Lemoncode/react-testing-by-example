Cypress.Commands.add('loadData', params => {
  const { apiPath, fixture, fetchAlias } = params;
  cy.server();
  fixture
    ? cy
        .route('GET', `http://localhost:3000/api${apiPath}`, fixture)
        .as(fetchAlias)
    : cy.route('GET', `http://localhost:3000/api${apiPath}`).as(fetchAlias);
});
