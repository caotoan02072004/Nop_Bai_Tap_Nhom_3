describe("template spec", () => {
  const cb5 = {
    table: "static-table",
    sku: "SKU-002",
  };

  it("CB_5", () => {
    cy.visit("https://autotestsandbox.com/examples/static-table");

    cy.get('[data-test-id="static-table-primary"]').type(cb5.table);

    cy.get('[data-test-id="static-table-secondary"]').type(cb5.sku);
  });
});
