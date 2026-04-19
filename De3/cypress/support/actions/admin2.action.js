export const admin2 = (qtv2) => {
    cy.get('[data-test-id="lab-115-user-status"]').contains('Not signed in.').should('be.visible');
    cy.get('[data-test-id="lab-115-login-admin"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-user-status"]').contains('Signed in as admin01.').should('be.visible');
    cy.get('[data-test-id="lab-115-btn-issue-certificate"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Certificate issued.').should('be.visible');
    cy.get('[data-test-id="lab-115-timeline"]').contains('| Admin | ISSUE_CERTIFICATE |').should('be.visible');
}