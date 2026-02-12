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

import '@testing-library/cypress/add-commands';
require('cypress-xpath');

// export để file khác có thể import dùng lại
    //Có method visit(url) để mở trang login
export class LoginPage {
  visit(url) {
    cy.visit(url);
  }
// Là object tên el . Mục đích: gom selector lại 1 chỗ → dễ bảo trì
// Mỗi thuộc tính là hàm trả về Cypress chain (cy.get, cy.contains)
  el = {
    username: () => cy.get("#username"),
    password: () => cy.get("#password"),
    loginBtn: () => cy.get("button[type='Đăng nhập']"),
  };

  assertLoginPageVisible() {
    this.el.username().should("be.visible");
    this.el.password().should("be.visible");
    this.el.loginBtn().should("be.visible");
  };

  login(username, password) {
    this.el.username().clear().type(username);
    this.el.password().clear().type(password);
    this.el.loginBtn().click();
  }
//     * Assert đăng nhập thành công theo expected
//    */
  assertLoginSuccess(expected) {
    cy.url().should('include', expected.urlIncludes);
  }
}
