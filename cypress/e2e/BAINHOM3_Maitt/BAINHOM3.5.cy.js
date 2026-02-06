describe("CB_5 - Static Table", () => {
  it("Highlight row by table name and SKU", () => {
    cy.visit("https://autotestsandbox.com/examples/static-table")
    //Nhập tiêu đề bảng
    cy.get('[data-test-id="static-table-primary"]').clear()
      .type('KHO TIỀN CỦA MAI TRẦN')
    //Nhập SKU cần highlight dòng
    cy.get('[data-test-id="static-table-secondary"]').clear()
      .type('SKU-003')
    // Click button highlight
    cy.get('[data-test-id="static-table-action"]').click()
    // kiểm tra hightlight được hiển thị đúng dòng
    cy.get('tr[data-sku="SKU-003"]')
      .should('contain', 'SKU-003')
      .and('have.class', 'bg-indigo-50')
    //Thông báo hiển thị "Tên bảng" highlighted "tên SKU
    cy.get('[data-test-id="static-table-message"]').should('be.visible')
  })
})