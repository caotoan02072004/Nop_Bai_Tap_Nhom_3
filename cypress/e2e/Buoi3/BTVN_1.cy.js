/// <reference types="cypress" />

describe('BTVN_TC1', () => {
    let users

    before(() => {
        cy.fixture('users').then(data => {
            users = data
        })
    })

    beforeEach(() => {
        cy.visit('https://practice.expandtesting.com/login')
        cy.url().should('include', '/login')
    })


    it('Đăng nhập thành công', () => {
        cy.login(users.valid.username, users.valid.password);

        cy.contains('You logged into a secure area!')
        //cy.get('#logout').scrolltoView().should('be.visible');
        cy.contains('Logout').should('be.visible')
        // cy.wait(25000);

    })


    it('Sai tên đăng nhập', () => {
        cy.login(users.invalidUser.username, users.invalidUser.password)
        cy.contains('Invalid username.')
    })

    it('Sai mật khẩu', () => {
        cy.login(users.invalidPassword.username, users.invalidPassword.password)
        cy.contains('Invalid password')
    })

    afterEach(() => {
        // Áp dụng cho các case login FAIL
        if (Cypress.currentTest.title !== 'Đăng nhập thành công') {
            cy.url().should('include', '/login')
        }
        else
            cy.url().should('include', '/secure')
    })
})