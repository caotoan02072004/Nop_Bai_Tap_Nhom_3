describe('Drag to 55', () => {
  it('Drag to 55', () => {
    cy.visit('https://autotestsandbox.com/examples/range-slider-single');

    cy.get('input[type="range"]')
      .invoke('val', 55)//Gán giá trị slider = 55
      .trigger('input')
      .trigger('change');
    cy.get('[data-bar="20"]')
      .should('contain.text', '20%')
      .and('have.class', 'bg-indigo-300');//300 700 là màu 
    cy.get('[data-bar="40"]')
      .should('contain.text', '40%')
      .and('have.class', 'bg-indigo-300');
    cy.get('[data-bar="60"]')
      .should('not.have.class', 'bg-indigo-300');
    cy.get('[data-bar="80"]')
      .should('not.have.class', 'bg-indigo-300');
    cy.get('[data-bar="100"]')
      .should('not.have.class', 'bg-indigo-300');
  })
})
