describe('Currency Input', () => {

  const formatUSD = (num) =>
    Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  it('Calculate amount with tip', () => {

    cy.visit('https://autotestsandbox.com/examples/currency-input');

    const amount = 200
    const tip = 10
    const total = amount * (1 + tip / 100)

    // nhập amount (format sẵn để tránh lỗi mask)
    cy.get('[data-test-id="currency-input-primary"]')
      .invoke('val', formatUSD(amount))
      .trigger('input')
      .trigger('change');

    // nhập tip
    cy.get('[data-test-id="currency-input-secondary"]').clear().type(tip.toString());

    cy.get('[data-test-id="currency-input-action"]').click();

    // format để assert
    const formattedAmount = formatUSD(amount)
    const formattedTotal = formatUSD(total)

    cy.contains(`Base $${formattedAmount} + tip ${tip}% = $${formattedTotal}`).should('be.visible');

  });

});