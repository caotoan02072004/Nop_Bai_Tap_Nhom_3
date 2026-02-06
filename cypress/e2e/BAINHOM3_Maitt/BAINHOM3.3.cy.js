describe("CB_3- Canvas drawing and bounding box overlay", () => {
    it("Drawn Canvas and toggle boxes", () => {
        cy.visit("https://autotestsandbox.com/labs/canvas-drawing-and-bounding-box-overlay")
        //Drawn Canvas
        cy.get('[data-test-id="lab-075-draw"]').click()
        cy.get('[data-test-id="lab-075-status"]')
            .should('be.visible')
        //toggle boxes
        cy.get('[data-test-id="lab-075-toggle"]').click()
        cy.get('[data-test-id="lab-075-status"]')
            .should("be.visible")
    })
})