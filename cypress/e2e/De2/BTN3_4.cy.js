
describe('Lab 012: Dropdown with dynamic options from API', () => {
    const url = 'https://autotestsandbox.com/labs/dropdown-with-dynamic-options-from-api'
    beforeEach(() => {
        cy.visit(url);
    })

    it('Verify load options successfully', () => {
        cy.contains('Load options').click();
        // Verify trạng thái loading
        cy.contains('Loading...').should('be.visible');
        // Verify trạng thái load thành công
        cy.contains('Loaded 5 options').should('be.visible');
        // Verify dropdown có 5 options
        cy.get('[data-test-id="lab-012-select"] option').should('have.length', 5);
        // Verify text các option
        cy.get('[data-test-id="lab-012-select"] option')
            .then(($options) => {
                const texts = [...$options].map(o => o.innerText);
                expect(texts).to.deep.equal([
                    'Red',
                    'Green',
                    'Blue',
                    'Yellow',
                    'Orange'
                ]);
            });
    });
    it('Verify API error message', () => {
        cy.contains('Simulate failure').click();
        // Verify hiển thị lỗi
        cy.contains('API error: failed to load options').should('be.visible');
    });
});

