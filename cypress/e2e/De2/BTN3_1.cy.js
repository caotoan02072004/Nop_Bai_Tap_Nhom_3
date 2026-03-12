import dayjs from 'dayjs'

describe('Lab 111 - Full Hotel Flow E2E (Data Driven)', () => {

  before(() => {
    cy.fixture('BT3').as('testData');
  })

  it('Lab 111: Hotel Flow E2E', function () {

    this.testData.forEach((data) => {

      cy.visit('https://autotestsandbox.com/labs/hotel-guest-checkin-checkout-services-payment')

      //  1. Login 
      cy.get('[data-test-id="lab-111-login-receptionist"]').click();

      //  2. Checkin
      const now = dayjs().format('YYYY-MM-DDTHH:mm');
      const checkout = dayjs().add(1, 'day').format('YYYY-MM-DDTHH:mm');

      cy.get('[data-test-id="lab-111-booking-code"]').type(data.bookingCode);
      cy.get('[data-test-id="lab-111-room-number"]').select(data.room);
      cy.get('[data-test-id="lab-111-guest-full-name"]').type(data.guestName);
      cy.get('[data-test-id="lab-111-guest-id-number"]').type(data.idNumber);
      cy.get('[data-test-id="lab-111-guest-phone"]').type(data.phone);
      cy.get('[data-test-id="lab-111-guest-email"]').type(data.email);
      cy.get('[data-test-id="lab-111-checkin-datetime"]').type(now);
      cy.get('[data-test-id="lab-111-planned-checkout-datetime"]').type(checkout);
      cy.get('[data-test-id="lab-111-num-guests"]').clear().type(data.numGuests);
      cy.get('[data-test-id="lab-111-deposit-amount"]').clear().type(data.deposit);
      cy.get('[data-test-id="lab-111-btn-confirm-checkin"]').click();
      //Verify 
      cy.get('[data-test-id="lab-111-timeline"] li').first().should('contain', 'CHECKED_IN | Note: Check-in confirmed');
      cy.contains('Check-in confirmed.').should('be.visible');

      // 3. Add service
      cy.get('[data-test-id="lab-111-btn-add-service"]').click();
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('[data-test-id="lab-111-service-type"]').select(data.serviceName);
      cy.get('[data-test-id="lab-111-service-qty"]').clear().type(data.quantity);
      cy.get('[data-test-id="lab-111-btn-add-service-confirm"]').click();
      //Verify 
      cy.contains(data.serviceName).should('be.visible');
      cy.get('[data-test-id="lab-111-timeline"] li').first()
        .should('contain', 'SERVICE_ADDED | Note: LAUNDRY x2');

      // 4.Check out
      cy.get('[data-test-id="lab-111-login-receptionist"]').click();
      const checkOut = dayjs().add(1, 'minute').format('YYYY-MM-DDTHH:mm');
      cy.get('[data-test-id="lab-111-actual-checkout-datetime"]').clear().type(checkOut);
      cy.get('[data-test-id="lab-111-late-checkout-fee"]').type('50000');
      cy.get('[data-test-id="lab-111-damage-fee"]').type('20000');
      cy.get('[data-test-id="lab-111-checkout-notes"]').type('Check out muộn');
      cy.contains('Confirm Check-out').click();
      //Verify 
      cy.contains('Check-out confirmed.').should('be.visible');
      cy.contains('CHECKED_OUT | Note: Check out muộn').should('be.visible');

      // 5. Payment
      cy.get('[data-test-id="lab-111-login-receptionist"]').click();
      cy.get('[data-test-id="lab-111-payment-method"]').select('CASH');
      cy.get('[data-test-id="lab-111-discount-code"]').type('DISC10');
      cy.get('[data-test-id="lab-111-pay-amount"]').type('500000');
      cy.get('[data-test-id="lab-111-btn-pay"]').click();
      //Verify 
      cy.contains('Payment completed').should('be.visible');
      cy.contains('PAID | Note: CASH').should('be.visible');
    });

  });

});