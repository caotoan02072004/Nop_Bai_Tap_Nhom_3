describe('CB_2', () => {
  it('Slider minimum and maximum value', () => {
    cy.visit('https://autotestsandbox.com/labs/slider-minimum-and-maximum-value');
    cy.get('[data-test-id="lab-017-slider"]').should('be.visible');
    cy.get('[data-test-id="lab-017-slider"]').invoke('val', 97).trigger('input').trigger('change');
    cy.get('[data-test-id="lab-017-validate"]').should('be.visible').click();
    cy.get('[data-test-id="lab-017-status"]').should('be.visible');
    cy.get('[data-test-id="lab-017-value"]').contains('97').should('be.visible');
  })
})

describe('CB_3', () => {
   it('Toast Queue', () => {
    cy.visit('https://autotestsandbox.com/examples/toast-queue');
    cy.get('[data-test-id="toast-queue-primary"]')
      .should('be.visible').clear().type('Toast here');
    cy.get('[data-test-id="toast-queue-secondary"]')
      .should('be.visible').clear().type('5000');
    cy.get('[data-test-id="toast-queue-action"]').should('be.visible').click();
    cy.get('[data-test-id="toast-queue-message"]')
      .contains('Showing: Toast here').should('be.visible');
    cy.get('#queue-stack').should('exist');
   });
})

describe('TB_4', () => {
   it('Shadow DOM Nested', () => {
    const primary = 'Primary';
    const secondary = 'Secondary';
    cy.visit('https://autotestsandbox.com/examples/shadow-dom-nested');
    cy.get('[data-test-id="shadow-dom-nested-primary"]', { includeShadowDom: true })
    .should('be.visible').clear().type(primary);
    cy.get('[data-test-id="shadow-dom-nested-secondary"]', { includeShadowDom: true })
    .should('be.visible').clear().type(secondary);
    cy.get('[data-test-id="shadow-dom-nested-action"]', { includeShadowDom: true })
    .should('be.visible').click();
    cy.get('[data-test-id="shadow-dom-nested-message"]', { includeShadowDom: true })
    .should('be.visible')
    .and('contain', `Nested shadow submit: ${primary} / ${secondary}`);
   });
})

describe.only('K_5', () => {
   it('Lab 123 - Math CAPTCHA (Basic)', () => {
    cy.visit('https://autotestsandbox.com/labs/captcha-math-basic');
      cy.get('[data-test-id="lab-123-challenge"]').invoke('text').then((text) => {
      const match = text.match(/(\d+)\s*([+\-*/])\s*(\d+)/)

      const a = Number(match[1]);
      const pheptinh = match[2];
      const b = Number(match[3]);

      let result

      switch (pheptinh) {
      case '+':
        result = a + b
        break
      case '-':
        result = a - b
        break
      case '*':
        result = a * b
        break
      case '/':
        result = a / b
        break
      }
      cy.get('[data-test-id="lab-123-answer"]').clear().type(result.toString());
    })
    cy.on('window:confirm', (text) => {
        expect(text).to.contains('Passed');
        return true
      });
      cy.get('[data-test-id="lab-123-verify"]').should('be.visible').click();
   })
})