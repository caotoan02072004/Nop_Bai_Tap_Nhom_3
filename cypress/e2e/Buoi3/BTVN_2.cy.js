/// <reference types="cypress" />

describe('Truy vấn element theo locator', () => {
    beforeEach(() => {
        cy.visit('https://practice.expandtesting.com/locators');
    });

    // 1. getByRole
    it('getByRole: tìm nút Contact', () => {
        cy.contains('a', 'Contact').should('be.visible');
    })

    // 2. getByText
    it('getByText: tìm text Hot Deal', () => {
        cy.contains('Hot Deal: Buy 1 Get 1 Free').should('be.visible');
    })

    //     // 3. getByLabel
    it('getByLabel: tìm input theo label', () => {
        // Choose a country → select
        cy.contains('label', 'Choose a country')
            .parent()
            .find('select')
            .should('be.visible')

        // Email for newsletter → input
        cy.contains('label', 'Email for newsletter')
            .parent()
            .find('input')
            .should('be.visible')
    })


    //     // 4. getByPlaceholder
    it('getByPlaceholder: tìm input search', () => {
        cy.get('input[placeholder="Search the site"]').should('be.visible')

    })

    //     // 5. getByAltText
    it('getByAltText: tìm ảnh User avatar', () => {
        cy.get('img[alt="User avatar"]')
            .should('be.visible')
    })


    //     // 6. getByTitle
    it('getByTitle: tìm phần tử có tooltip Settings panel', () => {
        cy.get('[title="Settings panel"]')
            .should('be.visible')
    })


    //     // 7. getByTestId
    // 7. getByTestId
    it('getByTestId: tìm status-message và user-name', () => {
        cy.get('[data-testid="status-message"]').should('be.visible')
        cy.get('[data-testid="user-name"]').should('be.visible')
    })

    //     // 8. Legacy class
    it('Legacy class: tìm phần tử legacy-targetf', () => {
        cy.get('.legacy-css')
            .should('be.visible')
    })

    // 9. XPath – List
    // it('XPath: đếm số li trong #tasks', () => {
    //     cy.xpath("//ul[@id='tasks']/li")
    //         .should('have.length.greaterThan', 0)
    // })


})
