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

Cypress.Commands.add('login_cheppy', (username, password) => {
    cy.get('[name="username"]').type(username)
    cy.get('[name="password"]').type(password)
    cy.contains('span', 'Sign in').click()
})
Cypress.Commands.add('loginByApi', () => {
  cy.request({
    method: 'POST',
    url: 'https://beta.cheppy.ai/api/security/authenticate',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: true,
    body: {
        grant_type: Cypress.env('grant_type'),
        client_id: Cypress.env('client_id'),
        username: Cypress.env('username'),
        password: Cypress.env('password'),
        rememberDevice: false
    }
    
  }).then((res) => {
    cy.log('Login successful, token received')
    // Phải visit trang trước khi set localStorage
    cy.visit('https://beta.cheppy.ai')
    cy.window().then((win) => {
        cy.setCookie('access-token', res.body.access_token)
        cy.setCookie('refresh-token', res.body.refresh_token)
    })
  })
})