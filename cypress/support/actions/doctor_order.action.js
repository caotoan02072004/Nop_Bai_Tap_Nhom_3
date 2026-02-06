export const doctorlaborder = (data) => {

  cy.get('[data-test-id="lab-priority"]').select(data.priority);
  cy.get('[data-test-id="lab-tests"]').contains(data.labtest).click();
  cy.get('[data-test-id="clinical-note"]').type(data.clinical);
  cy.get('[data-test-id="btn-submit-lab-order"]').click();
  cy.get('[data-test-id="lab-120-lab-status"]').should('be.visible');
  cy.contains('Lab order submitted.').should('be.visible');
  cy.get('[data-test-id="timeline"]').contains('LAB_PENDING').should('be.visible');
  cy.get('[data-test-id="timeline"]').contains('LAB_ORDERED').should('be.visible');
}
