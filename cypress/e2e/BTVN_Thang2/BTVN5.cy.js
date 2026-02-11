describe("Static Table", () => {
    let healthcare 
    before(() => {
        cy.fixture('healthcare').then(data => {
            healthcare = data
        })
    })

    beforeEach(() => {
        cy.visit('https://autotestsandbox.com/examples/static-table')
    })
       it("Static Table", () => {

        cy.get('[data-test-id="static-table-primary"]').type(healthcare.validStatic.tableTitle);

        cy.get('[data-test-id="static-table-secondary"]').type(healthcare.validStatic.HighlightSKU);

        cy.get('[data-test-id="static-table-action"]').click();

        cy.contains("td", healthcare.validStatic.HighlightSKU)
            .parents("tr")
            .should("have.class", "bg-indigo-50");

        cy.contains(`${healthcare.validStatic.tableTitle} highlighted ${healthcare.validStatic.HighlightSKU}`).should("be.visible");
    });
})
