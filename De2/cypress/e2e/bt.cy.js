import { reception } from '../support/actions/Check-in.action'
import { Addservices } from '../support/actions/Addservices.action'
import { Checkout } from '../support/actions/Check-out.action'
import { payment } from '../support/actions/Payment.action'

describe('CB_2', () => {
    it('Lab 038: Handle API rate limit 429', () => {
        cy.visit('https://autotestsandbox.com/labs/handle-api-rate-limit-429');
        cy.intercept(
            'GET',
            '/api/labs/rate-limit'
        ).as('sendrequest');
        cy.get('[data-test-id="lab-038-send"]').should('be.visible').click();
        cy.wait('@sendrequest').its('response.statusCode').should('eq', 200);
        cy.get('[data-test-id="lab-038-success"]').contains('Request succeeded.').should('be.visible');
        Cypress._.times(4, () => {
            cy.get('[data-test-id="lab-038-send"]').click();
        })
        //Kiểm tra có ít nhất 1 request 429
        cy.wait('@sendrequest');
        cy.get('@sendrequest.all').then((call) => { //@sendrequest.all: lấy tất cả các request
            const find429 = call.some(rq =>
                rq.response.statusCode === 429
            )
            expect(find429).to.be.true
        })
        cy.get('[data-test-id="lab-038-status"]').contains('429 Too Many Requests').should('be.visible');
    })
})

describe('CB_3', () => {
    it('Focus Trap', () => {
        cy.visit('https://autotestsandbox.com/examples/focus-trap');
        cy.get('[data-test-id="focus-trap-primary"]').should('be.visible');
        cy.get('[data-test-id="focus-trap-primary"]').type('Outside trap');
        cy.get('[data-test-id="focus-trap-secondary"]').should('be.visible');
        cy.get('[data-test-id="focus-trap-secondary"]').type('Optional');
        cy.get('[data-test-id="focus-trap-action"]').should('be.visible').click();
        cy.get('[placeholder="First in trap"]').type('first in trap');
        cy.on('window:confirm', (text) => {
            expect(text).to.contains('first in trap');
            return true
        });
        cy.contains('button', 'Save').click();
    });
})

describe('CB_4', () => {
    it('Lab 012: Dropdown with dynamic options from API', () => {
        cy.visit('https://autotestsandbox.com/labs/dropdown-with-dynamic-options-from-api');
        cy.get('[data-test-id="lab-012-load"]').should('be.visible').click();
        cy.get('[data-test-id="lab-012-status"]').contains('Loaded 5 options').should('be.visible');
        cy.get('[data-test-id="lab-012-select"]').find('option').should('have.length', 5);
        cy.get('[data-test-id="lab-012-fail"]').should('be.visible').click();
        cy.get('[data-test-id="lab-012-status"]').contains('API error: failed to load options').should('be.visible');
        cy.get('[data-test-id="lab-012-select"]').find('option').contains('No options loaded').should('be.visible');

    });

    describe('CB_5', () => {
        it('Lab 066: Rename file before upload', () => {
            cy.visit('https://autotestsandbox.com/labs/rename-file-before-upload');
            cy.get('[data-test-id="lab-066-file"]').selectFile('./cypress/fixtures/DSS-BII.pdf');
            const newname = 'BT';
            const duoifile = '.pdf';
            cy.get('[data-test-id="lab-066-name"]').clear().type(newname);
            cy.get('[data-test-id="lab-066-upload"]').click();
            cy.get('[data-test-id="lab-066-final"]').contains(newname + duoifile).should('be.visible');
        });
    })
})

describe('CB_1', () => {
    before(() => {
        cy.visit('https://autotestsandbox.com/labs/hotel-guest-checkin-checkout-services-payment');
        cy.get('[data-test-id="lab-111-reset"]').click({ force: true });
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
