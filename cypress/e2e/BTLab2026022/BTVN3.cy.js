describe("Lab3", () => {
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
      expect(text).to.include("trap data");
    });
  });
});