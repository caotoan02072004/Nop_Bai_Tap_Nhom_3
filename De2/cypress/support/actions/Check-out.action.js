export function Checkout(data) {
  cy.get('[data-test-id="lab-111-btn-start-checkout"]').should('be.visible').click();
  cy.get('[data-test-id="lab-111-actual-checkout-datetime"]')
    .invoke('val', data.actualCheckoutDatetime)
    .trigger('input', { force: true })
    .trigger('change', { force: true });
  cy.get('[data-test-id="lab-111-late-checkout-fee"]')
    .clear()
    .type(String(data.lateCheckoutFee ?? 0));
  cy.get('[data-test-id="lab-111-damage-fee"]')
    .clear()
    .type(String(data.damageFee ?? 0));
  if (data.notes) {
    cy.get('[data-test-id="lab-111-checkout-notes"]').clear().type(data.notes);
  }
  cy.get('[data-test-id="lab-111-btn-confirm-checkout"]').click();
  cy.get('[data-test-id="lab-111-stay-status"]').should('contain', 'CHECKED_OUT');
  cy.get('[data-test-id="lab-111-timeline"]').should('contain', 'CHECKED_OUT');
}
