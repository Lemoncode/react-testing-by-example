describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
    const params = {
      apiPath: '/hotels',
      fixture: 'fixture:hotels',
      fetchAlias: 'fetchHotels',
    };

    // Act
    cy.loadData(params);
    cy.visit('#/hotels');

    // Assert
    cy.wait('@fetchHotels');
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });

  it('should fetch hotel collection from backend and show it in screen when visit /hotels urls', () => {
    // Arrange
    const params = {
      apiPath: '/hotels',
      fetchAlias: 'fetchHotels',
    };

    // Act
    cy.loadData(params);
    cy.visit('#/hotels');

    // Assert
    cy.wait('@fetchHotels');
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 10);
  });
});
