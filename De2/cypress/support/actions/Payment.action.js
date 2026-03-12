export const payment = (paym) => {
    
    cy.get('[data-test-id="lab-111-payment-method"]').select(paym.method);
    cy.get('[data-test-id="lab-111-discount-code"]').clear().type(paym.discount);
    cy.get('[data-test-id="lab-111-grand-total"]').invoke('text')
    .then((text) => {
        const total = text.replace(/[^0-9]/g, '');
        cy.get('[data-test-id="lab-111-pay-amount"]').clear().type(total);

    });
    cy.get('[data-test-id="lab-111-btn-pay"]').click();
    cy.get('[data-test-id="lab-111-receipt-link"]').should('be.visible');
    cy.get('[data-test-id="lab-111-status"]').contains('Payment completed.').should('be.visible');
    cy.get('[data-test-id="lab-111-timeline"]').contains('PAID').should('be.visible');

}