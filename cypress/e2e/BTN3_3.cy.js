describe('Canvas drawing and bounding box overlay', () => {
  it('Draw canvas and toggle bounding box overlay', () => {
    cy.visit('https://autotestsandbox.com/labs/canvas-drawing-and-bounding-box-overlay');
    //  Click Draw canvas để vẽ hình
    cy.contains('Draw canvas').should('be.visible').click();
    // Click Toggle boxes để hiển thị bounding box
    cy.contains('Toggle boxes').should('be.visible').click();
    //  Verify overlay hiển thị
    cy.contains('Bounding boxes visible').should('be.visible');
    cy.get('[data-test-id="lab-075-boxes"], .bounding-box, .overlay').should('exist').and('be.visible');
  })
})
