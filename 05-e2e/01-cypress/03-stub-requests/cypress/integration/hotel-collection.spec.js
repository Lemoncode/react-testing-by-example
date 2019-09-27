describe('Hotel collection specs', () => {
  it('should fetch 2 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange
    cy.server();
    cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels');

    // Act
    cy.visit('#/hotels');

    // Assert
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });
});
