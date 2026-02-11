describe("First page load under 2 seconds", { retries: 2 }, () => {
  // code here
  it("Test description", () => {
    cy.visit("https://autotestsandbox.com/labs/first-page-load-under-2-seconds");
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