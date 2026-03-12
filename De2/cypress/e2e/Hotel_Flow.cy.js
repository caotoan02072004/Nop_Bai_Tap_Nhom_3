import {reception} from '../support/actions/Check-in.action'
import {Addservices} from '../support/actions/Addservices.action'
import {Checkout} from '../support/actions/Check-out.action'
import {payment} from '../support/actions/Payment.action'

describe('CB_1', () => {
    before(() => {
    cy.visit('https://autotestsandbox.com/labs/hotel-guest-checkin-checkout-services-payment');
    cy.get('[data-test-id="lab-111-login-receptionist"]').should('be.visible').click();
    cy.get('[data-test-id="lab-111-user-status"]').contains('Signed in as reception01.').should('be.visible').click();
    cy.get('[data-test-id="lab-111-user-badge"]').contains('Receptionist').should('be.visible');
  })
   it('Test description', function () {
      // Check-in
      cy.fixture('steps/1_Check-in').then(reception);
      cy.fixture('steps/2_Add_services').then(Addservices);
      cy.fixture('steps/3_Check-out').then(Checkout);
      cy.fixture('steps/4_Payment').then(payment);
   });
})