describe('Canvas drawing and bounding box overlay', () => {
  it('Kiểm tra bouding', () => {
    cy.visit('https://autotestsandbox.com/labs/canvas-drawing-and-bounding-box-overlay');

    const sandbox = '[data-test-id="lab-075-sandbox"]';
    const drawBtn = '[data-test-id="lab-075-draw"]';
    const toggleBtn = '[data-test-id="lab-075-toggle"]';
    const canvas = '[data-test-id="lab-075-canvas"]';
    const boxes = '[data-test-id="lab-075-boxes"]';
    const status = '[data-test-id="lab-075-status"]';

    /* ---------- Lưu lại canvas trước khi click button---------- */
    cy.get(canvas).then(($cvs) => {
      const before = $cvs[0].toDataURL();
      cy.wrap(before).as('canvasBefore');
    });
    //Click Draw canvas 
    cy.get(drawBtn).should('be.visible').click();
    //Kiểm tra thay đổi sau click
    cy.get('@canvasBefore').then((before) => {
      cy.get(canvas).then(($cvs) => {
        const after = $cvs[0].toDataURL();
        expect(after).to.not.equal(before);
      });
    });
    //Click Toggle boxes
    cy.get(toggleBtn).should('be.visible').click();

    // Kiểm tra hiển thị bounding box overlay
    cy.get(boxes)
      .should('be.visible')
      .and('have.css', 'pointer-events', 'none')
      .and('have.css', 'position', 'absolute');
    // Có ít nhất 1 bounding box
    cy.get(`${boxes} > div`)
      .should('have.length.at.least', 1)
      .each(($box) => {
        cy.wrap($box)
          .should('have.css', 'border-style', 'solid')
          .and('have.css', 'position', 'absolute');
      });
    // Kiểm tra status hiển thị đúng 
    cy.get(status)
      .should('have.attr', 'role', 'status')
      .and('be.visible')
      .and('contain.text', 'Bounding boxes visible');
  });
});