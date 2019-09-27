describe('Hotel edit specs', () => {
  it('should navigate to second hotel when click on edit second hotel', () => {
    // Arrange
    const params = {
      apiPath: '/hotels',
      fixture: 'fixture:hotels',
      fetchAlias: 'fetchHotels',
    };

    // Act
    cy.loadData(params);
    cy.visit('#/hotels');
    cy.wait('@fetchHotels');
    cy.get('[data-testid="editHotelButton-with-hotelId=id-2"]').click();

    // Assert
    cy.url().should('eq', 'http://localhost:8080/#/hotels/id-2');
  });

  it('should update hotel name, and see the update after save button click', () => {
    // Arrange
    const params = {
      apiPath: '/hotels',
      fixture: 'fixture:hotels',
      fetchAlias: 'fetchHotels',
    };
    const updatedName = 'updated name value';

    // Act
    cy.loadData(params);
    cy.visit('#/hotels');
    cy.wait('@fetchHotels');
    cy.get('[data-testid="editHotelButton-with-hotelId=id-2"]').click();
    cy.get('[data-testid="nameInput"]')
      .clear()
      .type(updatedName);
    cy.get('[data-testid="ratingContainer"] :nth-child(4)').click();
    cy.get('[data-testid="saveButton"]').click();

    // Assert
    cy.url().should('eq', 'http://localhost:8080/#/hotels');
    cy.get('[data-testid="hotelName-with-hotelId=id-2"]').should(
      'have.text',
      updatedName
    );
  });
});
