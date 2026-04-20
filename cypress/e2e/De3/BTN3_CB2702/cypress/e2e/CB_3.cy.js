describe('Multi Step Form (3 Steps)', () => {

  it('Fill multi step form and submit successfully', () => {

    cy.visit('https://autotestsandbox.com/examples/multi-step-form-3-steps');
    // nhập Name
    cy.get('[data-test-id="multi-step-form-3-steps-primary"]').type('Auto Test');
    cy.contains('button', 'Next').should('be.visible').click();
    // nhập Email
    cy.get('[data-test-id="multi-step-form-3-steps-secondary"]').type('autotest@mail.com');
    cy.contains('button', 'Next').should('be.visible').click();
    // Submit
    cy.contains('button', 'Submit').should('be.visible').click();
    // Verify kết quả
    cy.contains('Submitted (mock)').should('be.visible');

  });

});