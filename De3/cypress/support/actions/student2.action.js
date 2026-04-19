export const student2 = (sv2) => {
    cy.get('[data-test-id="lab-115-user-status"]').contains('Not signed in.').should('be.visible');
    cy.get('[data-test-id="lab-115-login-student"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-user-status"]').contains('Signed in as student01.').should('be.visible');
    cy.get('[data-test-id="lab-115-btn-start-learning"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Learning started.').should('be.visible');
    cy.get('[data-test-id="lab-115-timeline"]').contains('| Student | START_LEARNING').should('be.visible');
    cy.get('[data-test-id="lab-115-lesson-L1"]').contains('Mark complete').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Lesson 1: Foundations completed.').should('be.visible');
    cy.get('[data-test-id="lab-115-lesson-L2"]').contains('Mark complete').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Lesson 2: Practice completed.').should('be.visible');
    cy.get('[data-test-id="lab-115-lesson-L3"]').contains('Mark complete').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Lesson 3: Review completed.').should('be.visible');
    cy.get('[data-test-id="lab-115-exam-score"]').should('be.visible').clear().type(sv2.score);
    cy.get('[data-test-id="lab-115-btn-submit-exam"]').should('be.visible').click();
    cy.get('[data-test-id="lab-115-status"]').contains('Exam passed.').should('be.visible');
    cy.get('[data-test-id="lab-115-timeline"]').contains('| Student | EXAM_PASSED |').should('be.visible');
    cy.get('[data-test-id="lab-115-logout"]').should('be.visible').click();
}