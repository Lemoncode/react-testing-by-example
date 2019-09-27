describe('Login specs', () => {
  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234';
    cy.get('[data-testid=userInput]').as('userInput');
    cy.get('[data-testid=passwordInput]').as('passwordInput');
    const spy = cy.spy().as('alertSpy');
    cy.on('window:alert', spy);

    // Act
    cy.visit('/');
    cy.get('@userInput').type(user).debug();
    cy.get('@passwordInput').type(password);
    cy.get('[data-testid=loginButton]').click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.get('@alertSpy').should(
      'have.been.calledWith',
      'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
    );
  });

  it('should update header user name and navigate to hotels url when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';
    cy.get('[data-testid=userInput]').as('userInput');
    cy.get('[data-testid=passwordInput]').as('passwordInput');

    // Act
    cy.visit('/');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.get('[data-testid=loginButton]').click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.url().should('eq', 'http://localhost:8080/#/hotels');
  });
});
