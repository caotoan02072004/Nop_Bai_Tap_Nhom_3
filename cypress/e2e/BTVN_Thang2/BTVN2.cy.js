describe('Kéo slider lên 55%', () => {
    it('Kéo  slider tới giá trị 55 %', () => {
        cy.visit('https://autotestsandbox.com/examples/range-slider-single');

        const slider = '[data-test-id="range-slider-single-primary"]';
        const number = '[data-test-id="range-slider-single-secondary"]';
        const applyBtn = '[data-test-id="range-slider-single-action"]';

        // Kéo/đặt slider lên 55
        cy.get(slider)
            .should('be.visible')
            .invoke('val', 55)
            .trigger('input', { force: true })
            .trigger('change', { force: true });

        // Kiểm tra giá trị sau khi kéo
        cy.get(number).should('have.value', '55');

        // Apply  và verify % giá trị hiển thị
        cy.get(applyBtn).click();

        // Verify có hiển thị "55%" ở khu vực sandbox
        cy.contains('Applied: 55 (medium band)').should('be.visible');
    });
});