import lab111Data from '../fixtures/datatest_hotel.json'

describe('Lab 111 -Hotel E2E', () => {
    lab111Data.forEach((data) => {
        it(data.name, () => {
            cy.visit('https://autotestsandbox.com/labs/hotel-guest-checkin-checkout-services-payment')

            cy.get('[data-test-id="lab-111-login-receptionist"]').click();
            cy.get('[data-test-id="lab-111-user-status"]')
                .should('contain.text', 'Signed in as reception01.');

            cy.get('[data-test-id="lab-111-booking-code"]').clear().type(data.bookingCode);
            cy.get('[data-test-id="lab-111-room-number"]').select(data.room);
            cy.get('[data-test-id="lab-111-guest-full-name"]').clear().type(data.fullName);
            cy.get('[data-test-id="lab-111-guest-id-number"]').clear().type(data.idNumber);
            cy.get('[data-test-id="lab-111-guest-phone"]').clear().type(data.phone);
            cy.get('[data-test-id="lab-111-checkin-datetime"]').clear().type(data.checkinDatetime);
            cy.get('[data-test-id="lab-111-planned-checkout-datetime"]').clear().type(data.plannedCheckoutDatetime);
            cy.get('[data-test-id="lab-111-num-guests"]').clear().type(data.numGuests);
            cy.get('[data-test-id="lab-111-btn-confirm-checkin"]').click();

            cy.get('[data-test-id="lab-111-stay-status"]').should('have.text', 'CHECKED_IN');

            cy.get('[data-test-id="lab-111-btn-add-service"]').click();
            cy.get('[data-test-id="lab-111-service-type"]').select(data.serviceType);
            cy.get('[data-test-id="lab-111-service-qty"]').clear().type(data.serviceQty);
            cy.get('[data-test-id="lab-111-btn-add-service-confirm"]').click();

            cy.get('[data-test-id="lab-111-timeline"] li').first()
                .should('contain.text', 'SERVICE_ADDED');

            cy.get('[data-test-id="lab-111-actual-checkout-datetime"]').clear().type(data.actualCheckoutDatetime);
            cy.get('[data-test-id="lab-111-late-checkout-fee"]').clear().type(data.lateCheckoutFee);
            cy.get('[data-test-id="lab-111-damage-fee"]').clear().type(data.damageFee);
            cy.get('[data-test-id="lab-111-btn-confirm-checkout"]').click();

            cy.get('[data-test-id="lab-111-timeline"] li')
                .first()
                .should('contain.text', 'CHECKED_OUT');

            cy.get('[data-test-id="lab-111-payment-method"]').select(data.paymentMethod);

            if (data.discountCode) {
                cy.get('[data-test-id="lab-111-discount-code"]').clear().type(data.discountCode);
            }

            cy.get('[data-test-id="lab-111-discount-total"]')
                .should('contain.text', data.expectedDiscount);

            cy.get('[data-test-id="lab-111-grand-total"]')
                .invoke('text')
                .then((text) => {
                    const amount = text.replace(/[^\d]/g, '')
                    cy.get('[data-test-id="lab-111-pay-amount"]').clear().type(amount)
                })

            cy.get('[data-test-id="lab-111-btn-pay"]').click();

            cy.get('[data-test-id="lab-111-status"]')
                .should('contain.text', data.expectedPaymentStatus);
        })
    })
})

describe('Lab 038 - Handle API rate limit 429', () => {
    it('UI kết hợp API testing-Verify API rate limit 429', () => {
        cy.visit('https://autotestsandbox.com/labs/handle-api-rate-limit-429');
        cy.intercept('**/api/**').as('sendRequest');
        // Lần đầu thành công
        cy.get('[data-test-id="lab-038-send"]').click();
        cy.wait('@sendRequest').its('response.statusCode').should('eq', 200);
        cy.get('[data-test-id="lab-038-success"]')
            .should('be.visible')
            .and('contain.text', 'Request succeeded.');
        // Nhấn request nhiều lần để bị rate limit
        for (let i = 0; i < 8; i++) {
            cy.get('[data-test-id="lab-038-send"]').click();
        }
        // Kiểm tra UI báo 429
        cy.get('[data-test-id="lab-038-error"]')
            .should('be.visible')
            .and('contain.text', 'Too many requests');
    });
});

describe('Focus Trap', () => {

    it('Should show alert with correct entered content', () => {
        const OSValue = 'Outside input test'
        const SCValue = 'Secondary note test'
        const trapValue = 'Meo uno'
        cy.visit('https://autotestsandbox.com/examples/focus-trap');
        cy.get('[data-test-id="focus-trap-primary"]').clear().type(OSValue);
        cy.get('[data-test-id="focus-trap-secondary"]').clear().type(SCValue);
        cy.get('[data-test-id="focus-trap-action"]').click();
        cy.get('input[placeholder="First in trap"]').clear().type(trapValue);
        //Check popup + OK
        cy.on('window:alert', (text) => {
            expect(text).to.eq(`Saved value: ${trapValue}`)
            // Cypress sẽ tự nhấn OK
        })
        cy.contains('.rounded-2xl button', 'Save').click();
    })

})

describe('CB_4 -Lab012', () => {

    it('Dropdown with dynamic options from API', () => {

        cy.visit('https://autotestsandbox.com/labs/dropdown-with-dynamic-options-from-api')

        // ===== Load thành công =====
        cy.get('[data-test-id="lab-012-load"]').click();
        // Check status text
        cy.contains('Loaded 5 options').should('be.visible');
        // Check số lượng options
        cy.get('select option').should('have.length', 5);
        // =====  Giả lập lỗi API =====
        cy.reload();
        cy.get('[data-test-id="lab-012-fail"]').click();
        // Check text thông báo hiển thị thay thế
        cy.contains('API error: failed to load options')
            .should('be.visible');

    })

})
describe('CB_5 - Lab066', () => {

    it('Rename file before upload', () => {

        const newName = 'Meo_Uno'

        cy.visit('https://autotestsandbox.com/labs/rename-file-before-upload');

        // Upload file
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Meouno.jpg');
        // Nhập tên mới
        cy.get('[data-test-id="lab-066-name"]').clear().type(newName);
        // Click upload
        cy.get('[data-test-id="lab-066-upload"]').click();
        // Check file name hiển thị (new name + đuôi file gốc)
        cy.contains(`${newName}.jpg`).should('be.visible');

    })

})