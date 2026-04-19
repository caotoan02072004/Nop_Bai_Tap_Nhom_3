export const instructor = (gv) => {
    cy.get('[data-test-id="lab-115-user-status"]').contains('Not signed in.').should('be.visible');
    cy.get('[data-test-id="lab-115-login-instructor"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-user-status"]').contains('Signed in as instructor01.').should('be.visible');
    cy.get('[data-test-id="lab-115-course-name"]').clear().type(gv.coursename);
    cy.get('[data-test-id="lab-115-course-description"]').clear().type(gv.description);
    cy.get('[data-test-id="lab-115-course-category"]').select(gv.category);
    cy.get('[data-test-id="lab-115-duration-hours"]').clear().type(gv.duration);
    cy.get('[data-test-id="lab-115-tuition-fee"]').clear().type(gv.fee);
    cy.get('[data-test-id="lab-115-btn-save"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-btn-publish"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Course published.').should('be.visible');
    cy.get('[data-test-id="lab-115-timeline"]').contains('| Instructor | PUBLISH_COURSE').should('be.visible');
    cy.get('[data-test-id="lab-115-logout"]').should('be.visible').click();
}