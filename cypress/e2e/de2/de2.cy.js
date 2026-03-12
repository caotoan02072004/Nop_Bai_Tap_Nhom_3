describe("CB2", () => {
  beforeEach(() => {
    cy.visit("https://autotestsandbox.com/labs/handle-api-rate-limit-429");
  });

  it("429 appears after exceeding 3 requests", () => {
    // 3 request đầu
    for (let i = 0; i < 3; i++) {
      cy.get('[data-test-id="lab-038-send"]').click();
      cy.contains("Success").should("exist");
    }
    //
    // request thứ 4
    cy.get('[data-test-id="lab-038-send"]').click();

    cy.contains("429").should("exist");
    cy.contains("Too many requests").should("exist");
  });
});

describe("CB3", () => {
  const outsideInput = '[data-test-id="focus-trap-primary"]';
  const secondaryNote = '[data-test-id="focus-trap-secondary"]';
  const openTrap = '[data-test-id="focus-trap-action"]';

  it("should display alert with first input value", () => {
    cy.visit("https://autotestsandbox.com/examples/focus-trap");

    cy.get(outsideInput).type("Test outside");
    cy.get(secondaryNote).type("Test note");

    cy.get(openTrap).click();

    // input trong trap
    cy.get('input[placeholder="First in trap"]')
      .should("be.visible")
      .type("trap data");

    cy.contains("button", "Save").click();

    // alert
    cy.on("window:alert", (text) => {
      expect(text).to.eq("trap data");
    });
  });
});
