describe('Lab 001 - Successful login', () => {

  it('Login successfully with valid credentials', () => {

    cy.visit('https://autotestsandbox.com/labs/successful-login');

    cy.get('input[type="email"]').clear().type('user@example.com');
    cy.get('input[type="password"]').clear().type('P@ssw0rd!');
    cy.contains('Sign in').click();
    cy.contains('Login successful').should('be.visible');

  });
});