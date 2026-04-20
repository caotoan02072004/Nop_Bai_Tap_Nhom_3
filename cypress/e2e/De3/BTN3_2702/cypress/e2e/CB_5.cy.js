describe('Lab 123 - Math CAPTCHA (Basic)', () => {
  it('Solve captcha and verify submission status', () => {
    cy.visit('https://autotestsandbox.com/labs/captcha-math-basic');

    cy.get('[data-test-id="lab-123-challenge"]')
      .invoke('text')
      .should('match', /\d+\s*[\+\-\*]\s*\d+/)   // đợi có dạng: 5 + 5 / 8 - 2 / 3 * 4
      .then((text) => {

        const numbers = text.match(/\d+/g)
        const num1 = Number(numbers[0])
        const num2 = Number(numbers[1])

        const operator = text.match(/[\+\-\*]/)[0]

        let result

        if (operator === '+') result = num1 + num2
        if (operator === '-') result = num1 - num2
        if (operator === '*') result = num1 * num2

        cy.get('[data-test-id="lab-123-answer"]').clear().type(result);

        cy.get('[data-test-id="lab-123-verify"]').click();
      });
    cy.contains('Answer correct - Passed').should('be.visible');
  });
});