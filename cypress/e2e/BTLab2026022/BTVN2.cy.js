describe("Lab2", () => {
  beforeEach(() => {
    cy.visit("https://autotestsandbox.com/labs/handle-api-rate-limit-429");
  });

  it("429 appears after exceeding 3 requests", () => {
    // 3 request đầu
    for (let i = 0; i < 3; i++) {
      cy.get('[data-test-id="lab-038-send"]').click();
      cy.contains("Request succeeded.").should("exist");
    }
    //
    // request thứ 4
    cy.get('[data-test-id="lab-038-send"]').click();

    cy.contains("429").should("exist");
    cy.contains("Too many requests").should("exist");
  });
});