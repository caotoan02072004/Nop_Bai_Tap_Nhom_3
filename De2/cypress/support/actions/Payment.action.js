function parseVndLabel(text) {
  const digits = String(text).replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export function payment(data) {
  cy.get('[data-test-id="lab-111-payment-method"]').select(data.method);
  if (data.discountCode) {
    cy.get('[data-test-id="lab-111-discount-code"]')
      .clear()
      .type(data.discountCode)
      .blur();
  }
  cy.get('[data-test-id="lab-111-grand-total"]')
    .invoke('text')
    .then((label) => {
      const grand = parseVndLabel(label);
      const pay = data.payAmount != null ? data.payAmount : grand;
      expect(pay, 'pay amount covers grand total').to.be.at.least(grand);
      cy.get('[data-test-id="lab-111-pay-amount"]').clear().type(String(pay));
    });
  cy.get('[data-test-id="lab-111-btn-pay"]').click();
  cy.get('[data-test-id="lab-111-stay-status"]').should('contain', 'PAID');
  cy.get('[data-test-id="lab-111-timeline"]').should('contain', 'PAID');
  cy.get('[data-test-id="lab-111-receipt-link"]').should('be.visible').and('not.have.class', 'hidden');
}
