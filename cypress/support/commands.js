Cypress.Commands.add('loginByRole', (role) => {
  cy.fixture('data').then((data) => {
    const acc = data.accounts[role]
    cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment')
    cy.get('[data-test-id="username"]').clear().type(acc.username)
    cy.get('[data-test-id="password"]').clear().type(acc.password)
    cy.get('[data-test-id="btn-login"]').click()
  })
})

