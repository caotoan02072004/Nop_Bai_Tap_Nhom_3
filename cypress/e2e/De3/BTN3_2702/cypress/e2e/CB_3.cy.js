describe('Toast Queue Test', () => {

  it('should display toast with queue and delay', () => {

    cy.visit('https://autotestsandbox.com/examples/toast-queue');

    // nhập queue item
    cy.get('[data-test-id="toast-queue-primary"]').clear().type('Toast here');

    // nhập delay
    cy.get('[data-test-id="toast-queue-secondary"]').clear().type('5000');

    // click add / show toast
    cy.contains('button', 'Enqueue toast').click();

    // verify toast hiển thị
    cy.contains('Toast here', { timeout: 6000 }).should('be.visible');
  });
});