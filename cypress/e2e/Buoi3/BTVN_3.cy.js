/// <reference types="cypress" />

describe('Drag and Drop Circles', () => {
    before(() => {
        cy.visit('https://practice.expandtesting.com/drag-and-drop-circles')
    })

    it('Kéo 3 hình tròn vào hình chữ nhật theo thứ tự', () => {

        const items = [
            "#source .red",
            "#source .blue",
            "#source .green"
        ];

        const target = "#target";

        const dataTransfer = new DataTransfer();

        for (let i = 0; i < items.length; i++) {

            cy.get(items[i])
                .should("be.visible")
                .trigger("dragstart", { dataTransfer });

            cy.get(target)
                .trigger("drop", { dataTransfer })
                .trigger("dragend", { dataTransfer });

        }
    })
})
