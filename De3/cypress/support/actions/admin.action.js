export const admin = (qtv) => {
    cy.get('[data-test-id="lab-115-user-status"]').contains('Not signed in.').should('be.visible');
    cy.get('[data-test-id="lab-115-login-admin"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-user-status"]').contains('Signed in as admin01.').should('be.visible');
    cy.get('[data-test-id="lab-115-btn-open-class"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Class opened.').should('be.visible');
    cy.get('[data-test-id="lab-115-timeline"]').contains('| Admin | OPEN_CLASS').should('be.visible');
    cy.get('[data-test-id="lab-115-logout"]').should('be.visible').click();
}