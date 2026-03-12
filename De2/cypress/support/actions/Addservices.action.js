export const Addservices = (add) => {
    
    cy.get('[data-test-id="lab-111-btn-add-service"]').click();
    cy.get('[data-test-id="lab-111-service-type"]').select(add.type);
    cy.get('[data-test-id="lab-111-service-qty"]').clear().type(add.quantity);
    cy.get('[data-test-id="lab-111-btn-add-service-confirm"]').click();
    cy.get('[data-test-id="lab-111-status"]').contains('Service added.').should('be.visible');
    cy.get('[data-test-id="lab-111-timeline"]').contains('SERVICE_ADDED').should('be.visible');
}