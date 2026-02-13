describe('AutoTest Sandbox', () => {
    it('CB_2 - Drag slider to 55', () => {
        cy.visit('https://autotestsandbox.com/examples/range-slider-single');
        cy.get('input[type="range"]').invoke('val', 55).trigger('input').should('have.value', '55');
    })
    it('CB_3 - Canvas drawing and bounding box overlay', () => {
        cy.visit('https://autotestsandbox.com/labs/canvas-drawing-and-bounding-box-overlay');
        cy.get('[data-test-id="lab-075-draw"]').should('be.visible').click();
        cy.get('[data-test-id="lab-075-canvas"]').should('exist').and('be.visible');
        cy.get('[data-test-id="lab-075-toggle"]').click();
        cy.get('[data-test-id="lab-075-boxes"]').should('be.visible');
        cy.get('[data-test-id="lab-075-status"]').should('contain', 'Bounding boxes visible')
    })
    it('CB_4 - First page load under 2 seconds', { retries: 2 }, () => {
        cy.visit('https://autotestsandbox.com/labs/first-page-load-under-2-seconds');
        cy.get('[data-test-id="lab-091-measure"]').click();
        cy.get('[data-test-id="lab-091-time"]').should('not.contain', 'N/A').invoke('text').then((text) => {
            const time = Number(text.match(/\d+/)[0]);
            expect(time).to.be.lessThan(2000)
        });
    });
    it('CB_5 - Static Table', () => {
        cy.visit('https://autotestsandbox.com/examples/static-table');
        const tableTitle = 'Table 1'; const sku = 'SKU-001';
        cy.get('[data-test-id="static-table-primary"]').clear().type(tableTitle);
        cy.get('[data-test-id="static-table-secondary"]').clear().type('SKU-001');
        cy.get('[data-test-id="static-table-action"]').click();
        cy.contains('td', sku).parent('tr').should('have.class', 'bg-indigo-50');
        cy.get('[data-test-id="static-table-message"]').should('have.text', `${tableTitle} highlighted ${sku}`)
    });
});
