describe("cb5", () => {
  const cb5 = {
    table: "static-table",
    sku: "SKU-002",
  };

  it("CB_5", () => {
    cy.visit("https://autotestsandbox.com/examples/static-table");

    cy.get('[data-test-id="static-table-primary"]').type(cb5.table);

    cy.get('[data-test-id="static-table-secondary"]').type(cb5.sku);

    cy.get('[data-test-id="static-table-action"]').click();

    cy.contains("td", cb5.sku)
      .parents("tr")
      .should("have.class", "bg-indigo-50");

    cy.contains(`${cb5.table} highlighted ${cb5.sku}`).should("be.visible");
  });
});

describe("cb4", { retries: 2 }, () => {
  // code here
  it("Test description", () => {
    // code here
    cy.visit(
      "https://autotestsandbox.com/labs/first-page-load-under-2-seconds",
    );
    cy.get('[data-test-id="lab-091-measure"]').click();

    //chờ hiển thị
    cy.get('[data-test-id="lab-091-time"]').should("contain.text", "Load time");

    //lấy thời gian
    cy.get('[data-test-id="lab-091-time"]')
      .invoke("text")
      .then((text) => {
        const time = Number(text.match(/\d+/)[0]);

        expect(time, `Load time = ${time}ms`).to.be.at.most(2000);
      });

    cy.get('[data-test-id="lab-091-result"]').should("contain.text", "Pass");
  });
});

describe("cb2", () => {
  it("cb2", () => {
    cy.visit("https://autotestsandbox.com/examples/range-slider-single");

    //
    cy.get('input[type="range"]')
      .invoke("val", 55)
      .trigger("input")
      .trigger("change");
    cy.contains("Value: 55").should("be.visible");

    // Verify % giá trị
    const percent = 55;
    expect(percent).to.eq(55);
  });
});

describe.only("cb3", () => {
  // code here
  it("Test description", () => {
    // code here
    cy.get('[data-test-id="lab-075-draw"]').click();
    cy.get('[data-test-id="lab-075-toggle"]').click();
  });
});
