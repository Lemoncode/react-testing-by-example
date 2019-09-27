describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
    const params = {
      apiPath: '/hotels',
      fixture: 'fixture:hotels',
      routePath: '#/hotels',
    };

    // Act
    cy.loadAndVisit(params);

    // Assert
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });

  it('should fetch hotel collection from backend and show it in screen when visit /hotels urls', () => {
    // Arrange
    const params = {
      apiPath: '/hotels',
      routePath: '#/hotels',
    };

    // Act
    cy.loadAndVisit(params);

    // Assert
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 10);
  });
});
