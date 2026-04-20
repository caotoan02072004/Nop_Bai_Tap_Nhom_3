describe('Slider minimum and maximum value', () => {

    it('Set slider to 97 and verify value', () => {

        cy.visit('https://autotestsandbox.com/labs/slider-minimum-and-maximum-value');

        // set slider value
        cy.get('[data-test-id="lab-017-slider"]')
            .invoke('val', 97)
            .trigger('input')
            .trigger('change');

        // verify slider value
        cy.get('[data-test-id="lab-017-slider"]').should('have.value', '97');
        cy.get('[data-test-id="lab-017-validate"]').click();
        cy.contains('Value must be between 20 and 80').should('exist');

    });

});