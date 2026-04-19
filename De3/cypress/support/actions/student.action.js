export const student = (sv) => {
    cy.get('[data-test-id="lab-115-user-status"]').contains('Not signed in.').should('be.visible');
    cy.get('[data-test-id="lab-115-login-student"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-user-status"]').contains('Signed in as student01.').should('be.visible');
    cy.get('[data-test-id="lab-115-student-name"]').should('be.visible').clear().type(sv.name);
    cy.get('[data-test-id="lab-115-student-email"]').should('be.visible').clear().type(sv.email);
    cy.get('[data-test-id="lab-115-btn-enroll"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Enrollment successful.').should('be.visible');
    cy.get('[data-test-id="lab-115-timeline"]').contains('| Student | ENROLL |').should('be.visible');
    cy.get('[data-test-id="lab-115-payment-method"]').select(sv.method);
    cy.get('[data-test-id="lab-115-pay-amount"]').should('be.visible').clear().type(sv.amount);
    cy.get('[data-test-id="lab-115-btn-pay"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Tuition paid.').should('be.visible');
    cy.get('[data-test-id="lab-115-timeline"]').contains('| Student | PAY_TUITION |').should('be.visible');
    cy.get('[data-test-id="lab-115-logout"]').should('be.visible').click();
}