describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
    cy.server();
    cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels').as(
      'fetchHotels'
    );

    // Act
    cy.visit('#/hotels');

    // Assert
    cy.wait('@fetchHotels');
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });

  it('should fetch hotel collection from backend and show it in screen when visit /hotels urls', () => {
    // Arrange
    cy.server();
    cy.route('GET', 'http://localhost:3000/api/hotels').as('fetchHotels');

    // Act
    cy.visit('#/hotels');

    // Assert
    cy.wait('@fetchHotels');
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 10);
  });
});
