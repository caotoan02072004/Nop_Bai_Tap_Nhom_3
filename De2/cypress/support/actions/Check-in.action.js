export const reception = (data) => {
    
    cy.get('[data-test-id="lab-111-booking-code"]').clear().type(data.bookingcode);
    cy.get('body').click(0, 0);
    cy.get('[data-test-id="lab-111-room-number"]').contains('101 - Standard (450000 VND)').should('be.visible');
    cy.get('[placeholder="Nguyen Van A"]').should('be.visible');
    cy.get('[data-test-id="lab-111-guest-id-number"]').clear().type(data.passport);
    cy.get('[data-test-id="lab-111-guest-phone"]').clear().type(data.phone);
    cy.get('[data-test-id="lab-111-guest-email"]').clear().type(data.email);
    cy.get('[data-test-id="lab-111-checkin-datetime"]').clear().type(data.checkindate);
    cy.get('[data-test-id="lab-111-planned-checkout-datetime"]').clear().type(data.checkoutdate);
    cy.get('[data-test-id="lab-111-num-guests"]').clear().type(data.number);
    cy.get('[data-test-id="lab-111-deposit-amount"]').clear().type(data.deposit);
    cy.get('[data-test-id="lab-111-btn-confirm-checkin"]').click();
    cy.get('[data-test-id="lab-111-status"]').should('be.visible');
    cy.get('[data-test-id="lab-111-stay-status"]').should('be.visible');
    cy.get('[data-test-id="lab-111-timeline"]').should('be.visible');
}