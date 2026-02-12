describe('Bài tập', () => {
  it('Drag to 55', () => {
    cy.visit('https://autotestsandbox.com/examples/range-slider-single');

    // Chờ slider hiển thị
    cy.get('input[type="range"]')
      .should('be.visible')
      .as('slider')

    // Set value = 55
    cy.get('@slider')
      .invoke('val', 55)
      .trigger('input')
      .trigger('change')

    // Verify value attribute
    cy.get('@slider')
      .should('have.value', '55')

    // Verify text hiển thị bên phải (55)
    cy.contains('55')
      .should('be.visible')
    });


  it('Draw canvas và toggle overlay hiển thị đúng', () => {

    cy.visit('https://autotestsandbox.com/labs/canvas-drawing-and-bounding-box-overlay')

    let initialCanvasState

    // Lưu trạng thái ban đầu
    cy.get('[data-test-id="lab-075-canvas"]')
      .should('be.visible')
      .then($canvas => {
        initialCanvasState = $canvas[0].toDataURL()
      })

    // Click Draw
    cy.get('[data-test-id="lab-075-draw"]')
      .should('be.visible')
      .click()

    // Verify canvas thay đổi (có hình được vẽ)
    cy.get('[data-test-id="lab-075-canvas"]')
      .should($canvas => {
        const afterDraw = $canvas[0].toDataURL()
        expect(afterDraw).to.not.equal(initialCanvasState)
      })

    // Click Toggle
    cy.get('[data-test-id="lab-075-toggle"]')
      .should('be.visible')
      .click()

    // Verify trạng thái toggle thay đổi (nếu có aria-pressed)
    cy.get('[data-test-id="lab-075-toggle"]')
      .then($btn => {
        const ariaPressed = $btn.attr('aria-pressed')
        if (ariaPressed !== undefined) {
          expect(ariaPressed).to.equal('true')
   }
      })

  });

  it('Click Measure cho đến khi PASS', {
    retries: 2
  }, () => {

    cy.visit('https://autotestsandbox.com/labs/first-page-load-under-2-seconds')

    cy.contains('button', 'Measure')
      .should('be.visible')
      .click()

    cy.get('[data-test-id="lab-091-result"]')
      .should('be.visible')
      .invoke('text')
      .then((text) => {

        const result = text.trim()

        cy.log('Result lần này là: ' + result)

        expect(result).to.equal('Pass')

  })
   });

it('Highlight đúng dòng và hiển thị message chính xác', () => {

    cy.visit('https://autotestsandbox.com/examples/static-table')

    const tableName = 'KO'
    const sku = 'SKU-003'

    // Nhập tên bảng
    cy.get('[data-test-id="static-table-primary"], input[name="tableName"]')
      .should('be.visible')
      .clear()
      .type(tableName)

    // Nhập SKU cần highlight
    cy.get('[data-test-id="static-table-secondary"], input[name="sku"]')
      .should('be.visible')
      .clear()
      .type(sku)
    // Click nút highlight
    cy.contains('button', /Highlight/i)
      .should('be.visible')
      .click()
    // Verify dòng đúng được highlight
   cy.get('[data-test-id="static-table-message"]')
  .should('be.visible')
  .and('contain.text', tableName)
  .and('contain.text', sku)
    //  Verify message hiển thị đúng
    cy.contains(`${tableName} highlighted ${sku}`)
      .should('be.visible')

     })
  });

