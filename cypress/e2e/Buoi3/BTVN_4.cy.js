/// <reference types="cypress" />

describe('Form Validation page for Automation Testing Practice', () => {

    beforeEach(() => {
        cy.visit('https://practice.expandtesting.com/form-validation');
    });


    it('TC01 - Verify page heading', () => {
        cy.get('h1')
            .should('be.visible')
            .and('contain', 'Form Validation page for Automation Testing Practice');
    });


    it('TC02 - Contact Name valid', () => {
        cy.get('#validationCustom01').type('dodo');

        cy.get('button[type="submit"]').click();

        cy.contains('Looks good!')
            .should('be.visible');

        cy.url().should('include', '/form-validation');
    });


    it('TC03 - Contact Number invalid', () => {

        cy.get('#validationCustom05')
            .clear()
            .type('abc');

        cy.get('button[type="submit"]').click();

        cy.contains('Please provide your Contact number.')
            .should('be.visible');


        cy.url().should('include', '/form-validation');

        cy.get('#validationCustom05')
            .clear()
            .type('012-3456789');

        cy.get('button[type="submit"]').click();


        cy.contains('Please provide your Contact number.')
            .should('not.be.visible');

    });


    it('TC04 - PickUp Date valid', () => {

        cy.get('input[name="pickupdate"]')
            .clear()
            .type('2025-12-20')
            .blur();

        cy.get('button[type="submit"]').click();

        cy.contains('Please provide valid Date.')
            .should('not.be.visible');

    });


    it('TC05 - Select Payment Method card', () => {
        cy.get('[name="payment"]')
            .select('card')
            .should('have.value', 'card');

        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/form-validation');
    });

    it('TC06 - Register successfully when form is valid', () => {

        cy.get('[name="ContactName"]').type('dodo');

        cy.get('[name="contactnumber"]').type('012-3456789');

        cy.get('[name="pickupdate"]').type('2025-12-20');

        cy.get('[name="payment"]').select('card');

        cy.get('[type="submit"]').click();
        cy.url().should('include', '/form-confirmation');

        cy.get('.alert[role="alert"]')
            .should('be.visible')
            .and('contain', 'Thank you for validating your ticket');
    });


});

