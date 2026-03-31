describe('Lab4', () => {

    it('Lab 012: Dropdown with dynamic options from API', () => {

        cy.visit('https://autotestsandbox.com/labs/dropdown-with-dynamic-options-from-api')

    
        cy.get('[data-test-id="lab-012-load"]').click();
        cy.contains('Loaded 5 options').should('be.visible');
        cy.get('select option').should('have.length', 5);
        cy.reload();
        cy.get('[data-test-id="lab-012-fail"]').click();
        cy.contains('API error: failed to load options')
            .should('be.visible');

    })

})