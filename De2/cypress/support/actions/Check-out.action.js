export const Checkout = (out) => {
    
    cy.get('[data-test-id="lab-111-actual-checkout-datetime"]').clear().type(out.time);
    cy.get('[data-test-id="lab-111-late-checkout-fee"]').clear().type(out.latefee);
    cy.get('[data-test-id="lab-111-damage-fee"]').clear().type(out.damagefee);
    cy.get('[data-test-id="lab-111-checkout-notes"]').clear().type(out.notes);
    cy.get('[data-test-id="lab-111-btn-confirm-checkout"]').click();
    cy.get('[data-test-id="lab-111-status"]').contains('Check-out confirmed.').should('be.visible');
    cy.get('[data-test-id="lab-111-timeline"]').contains('CHECKED_OUT').should('be.visible');
}