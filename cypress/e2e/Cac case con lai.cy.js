


describe('CB_2', () => {
  it('Drag to 55', () => {
    cy.visit('https://autotestsandbox.com/examples/range-slider-single');
    cy.get('[data-test-id="range-slider-single-primary"]').should('be.visible');
    cy.get('input[data-test-id="range-slider-single-primary"]').invoke('val', 55).trigger('input').trigger('change');
    cy.get('[data-test-id="range-slider-single-action"]').click();
    cy.get('[data-test-id="range-slider-single-secondary"]').should('have.value', '55');
    cy.get('[data-test-id="range-slider-single-message"]').contains('Applied: 55 (medium band)').should('be.visible');
    cy.contains('40%').should('have.class', 'dark:bg-indigo-700');
  })
})

describe('CB_3', () => {
   it('Canvas drawing and bounding box overlay', () => {
      cy.visit('https://autotestsandbox.com/labs/canvas-drawing-and-bounding-box-overlay');
      cy.get('[data-test-id="lab-075-draw"]').should('be.visible').click();
      //chỗ này để viết kiểm tra hình vẽ có hiển thị hay không
      cy.get('[data-test-id="lab-075-toggle"]').click();
   });
})

describe('CB_4', () => {
   it('First page load under 2 seconds', { retries: 3 }, () => {
    cy.visit('https://autotestsandbox.com/labs/first-page-load-under-2-seconds');
    cy.get('[data-test-id="lab-091-measure"]').should('be.visible').click();
    cy.get('[data-test-id="lab-091-time"]').invoke('text').then((text) => {
      const time = Number(text.match(/\d+/)[0]);
      expect(time).to.be.lessThan(2000);
    });
    cy.contains('Pass').should('be.visible');
   });
})

describe('CB_5', () => {
   it('Static Table', () => {
      cy.visit('https://autotestsandbox.com/examples/static-table');
      cy.get('[data-test-id="static-table-primary"]').should('be.visible');
      cy.get('[data-test-id="static-table-primary"]').type('Static Table');
      cy.get('[data-test-id="static-table-secondary"]').should('be.visible').type('SKU-003');
      cy.get('[data-test-id="static-table-action"]').click();
      //cy.get('tbody').find('tr').eq(2).should('have.class', 'bg-indigo-50 dark:bg-indigo-900/30');
      cy.get('[data-sku="SKU-003"]').should('have.class', 'bg-indigo-50 dark:bg-indigo-900/30');
      cy.get('[data-test-id="static-table-message"]').contains('Static Table highlighted SKU-003').should('be.visible');
   });
})