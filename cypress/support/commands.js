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

Cypress.Commands.add('loginByUI', (username, password) => {
  cy.get('[name="username"]').type(username)
  cy.get('[name="password"]').type(password)
  cy.contains('span', 'Sign in').click()
})
Cypress.Commands.add('loginByApiSession', () => {

  cy.session(
    'user-session',
    () => {
      cy.request({
        method: 'POST',
        url: Cypress.env('authenticate'),
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
        cy.visit('/')
        cy.window().then((win) => {
          cy.setCookie('access-token', res.body.access_token)
          cy.setCookie('refresh-token', res.body.refresh_token)
        })
      })
    },
    {
      validate() {
        cy.getCookie('access-token').should('exist');
      },
    }
  );

  cy.visit('/');

})

Cypress.Commands.add("selectTemplateTypes", (templateCode, items) => {
  cy.get(`[data-cy="template-${templateCode}-collapse"]`)
    .should("exist")
    .scrollIntoView()
    .closest(".ant-collapse-header")
    .click({ force: true });

  cy.get(`[data-cy="template-content-${templateCode}"]`).should("exist");

  cy.get(`[data-cy="template-content-${templateCode}"]`).should("be.visible");

  items.forEach(({ type, qty }) => {
    const baseSelector = `template-${templateCode}-${type}`;

    if (qty !== undefined) {
      cy.get("body").then(($body) => {
        const inputSelector = `[data-cy="${baseSelector}-input"]`;

        if ($body.find(inputSelector).length) {
          cy.get(inputSelector)
            .clear()
            .type(String(qty))
            .should("have.value", String(qty));
        }
      });
    }
  });
});

Cypress.Commands.add("waitApiSuccess", (alias) => {
  cy.wait(alias).then(({ response }) => {
    expect(response, `Response of ${alias}`).to.exist;
    expect(response.statusCode).to.eq(200);
    expect(response.body?.code).to.eq(0);
  });
});

Cypress.Commands.add("fillInput", (selector, value) => {
  cy.get(selector).clear().type(value).should("have.value", value);
});

Cypress.Commands.add("selectAntdOption", (label) => {
  cy.contains(".ant-select-item-option", new RegExp(`^${label}$`)).click();
});

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
    cy.visit('https://beta.cheppy.ai')
    cy.window().then((win) => {
        cy.setCookie('access-token', res.body.access_token)
        cy.setCookie('refresh-token', res.body.refresh_token)
    })
  })
})