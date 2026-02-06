describe("CB_2 - Drag slider to 55", () => {
    it("Drag slider and verify value", () => {
        cy.visit("https://autotestsandbox.com/examples/range-slider-single")
        cy.get('[data-test-id="range-slider-single-primary"]')
            .invoke("val", 55)
            .trigger("input")
            .trigger("change")
        cy.get('[data-test-id="range-slider-single-message"]')
            .should("contain", "55")
    })
})