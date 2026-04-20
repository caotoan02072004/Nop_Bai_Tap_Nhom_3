describe('Shadow DOM Nested', () => {

    it('Input values and verify alert', () => {

        cy.visit('https://autotestsandbox.com/examples/shadow-dom-nested');

        cy.on('window:alert', (msg) => {
            expect(msg).to.contain('Nested shadow submit');
            expect(msg).to.contain('Primary Test');
            expect(msg).to.contain('Secondary Test');
        });
        cy.get('[data-test-id="shadow-dom-nested-primary"]', { includeShadowDom: true }).type("Primary Test");
        cy.get('[data-test-id="shadow-dom-nested-secondary"]', { includeShadowDom: true }).type("Secondary Test");
        cy.contains('button', 'Nested action', { includeShadowDom: true }).click();

    });

});