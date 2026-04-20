describe('Reset Password Form', () => {

  it('Reset password successfully', () => {
    cy.visit('https://autotestsandbox.com/examples/reset-password-form');
    const password = '123456aB@'
    // Nhập password
    cy.get('[data-test-id="reset-password-form-primary"]').type(password);
    // Nhập confirm password
    cy.get('[data-test-id="reset-password-form-secondary"]').type(password);
    // Verify password strength
    cy.contains('Strength: Excellent').should('be.visible');
    // Submit form
    cy.contains('Reset password').click();
    // Verify message thành công
    cy.contains('Password reset successful (mock)').should('be.visible');
  });
  
});