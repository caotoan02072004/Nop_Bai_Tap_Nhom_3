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
  }

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
