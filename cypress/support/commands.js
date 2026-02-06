// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user) => {

  cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment');


  cy.get('[data-test-id="username"]').should('be.visible').clear().type(user.username);
  cy.get('[data-test-id="password"]').should('be.visible').clear().type(user.password);
  cy.get('[data-test-id="btn-login"]').should('be.visible').click();

})

Cypress.Commands.add('logout', () => {
  cy.get('[data-test-id="lab-120-logout"]').should('be.visible').click();
  //cy.contains('Log out').click()
})