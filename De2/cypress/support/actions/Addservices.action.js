export function Addservices(data) {
  (data.services || []).forEach((s) => {
    cy.get('[data-test-id="lab-111-btn-add-service"]').should('be.visible').click();
    cy.get('[data-test-id="lab-111-service-modal"]').should('be.visible');
    cy.get('[data-test-id="lab-111-service-type"]').select(s.type);
    cy.get('[data-test-id="lab-111-service-qty"]').clear().type(String(s.qty));
    cy.get('[data-test-id="lab-111-btn-add-service-confirm"]').click();
  });
  cy.get('[data-test-id="lab-111-timeline"]').should('contain', 'SERVICE_ADDED');
}
