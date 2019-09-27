describe('Hotel collection specs', () => {
  it('should fetch 3 hotels and show it in screen when visit /hotels urls', () => {
    // Arrange

    // Act
    cy.server();
    cy.route('GET', 'http://localhost:3000/api/hotels', 'fixture:hotels');
    cy.visit('#/hotels');

    // Assert
    cy.get('[data-testid="hotelCollectionContainer"]')
      .children()
      .should('have.length', 2);
  });
});
