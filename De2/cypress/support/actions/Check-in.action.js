export function reception(data) {
  cy.get('[data-test-id="lab-111-booking-code"]')
    .clear()
    .type(data.bookingCode, { force: true });
  cy.get('[data-test-id="lab-111-room-number"]').select(String(data.roomNumber));
  cy.get('[data-test-id="lab-111-guest-full-name"]').clear().type(data.guestFullName);
  cy.get('[data-test-id="lab-111-guest-id-number"]').clear().type(data.guestIdNumber);
  cy.get('[data-test-id="lab-111-guest-phone"]').clear().type(data.guestPhone);
  if (data.guestEmail) {
    cy.get('[data-test-id="lab-111-guest-email"]').clear().type(data.guestEmail);
  }
  cy.get('[data-test-id="lab-111-checkin-datetime"]')
    .invoke('val', data.checkInDatetime)
    .trigger('input', { force: true })
    .trigger('change', { force: true });
  cy.get('[data-test-id="lab-111-planned-checkout-datetime"]')
    .invoke('val', data.plannedCheckoutDatetime)
    .trigger('input', { force: true })
    .trigger('change', { force: true });
  cy.get('[data-test-id="lab-111-num-guests"]').clear().type(String(data.numGuests));
  cy.get('[data-test-id="lab-111-deposit-amount"]').clear().type(String(data.depositAmount));
  cy.get('[data-test-id="lab-111-btn-confirm-checkin"]').click();
  cy.get('[data-test-id="lab-111-stay-status"]').should('contain', 'CHECKED_IN');
  cy.get('[data-test-id="lab-111-timeline"]').should('contain', 'CHECKED_IN');
}
