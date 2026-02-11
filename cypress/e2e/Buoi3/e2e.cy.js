/// <reference types="cypress" />
describe('Bài tập Lab', () => {
  it('e2_1e- Tìm kiếm và lọc sản phẩm', () => {
    cy.visit('https://demowebshop.tricentis.com/');
    cy.get('.ico-login').click();
    cy.get('#Email').type('autotest_teca@gmail.com');
    cy.get('#Password').type('12345@');
    cy.get('[value="Log in"]').click();
    cy.get('#small-searchterms').type('Build your own expensive computer');
    cy.get('[value="Search"]').click();
    cy.get('[value="Add to cart"]').click();
    cy.get('#add-to-cart-button-74').click();
    cy.contains("shopping cart").click();
    cy.get('#checkout').click();
    cy.contains("Please accept the terms of service before the next step.");
  });
})