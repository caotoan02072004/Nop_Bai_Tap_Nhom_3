
Cypress.Commands.add('login', (username, password) => {
  cy.get('#username').clear().type(username)
  cy.get('#password').clear().type(password)
  cy.get('#submit-login').click()
})
