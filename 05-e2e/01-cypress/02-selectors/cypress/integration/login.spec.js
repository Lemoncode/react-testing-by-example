describe('Login specs', () => {
  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    cy.visit('/');
    const user = 'admin';
    const password = '1234';
    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').as(
      'userInput'
    );
    cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').as(
      'passwordInput'
    );
    // Act
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
  });
});
