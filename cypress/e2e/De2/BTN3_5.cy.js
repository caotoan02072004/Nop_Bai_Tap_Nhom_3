
describe('Rename file before upload', () => {

    beforeEach(() => {
        cy.visit('https://autotestsandbox.com/labs/rename-file-before-upload')
    });

    it('Rename and upload file', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.txt');
        cy.get('input[type="text"]').type('renamed-file');
        cy.get('[data-test-id="lab-066-upload"]').click();
        cy.contains('Final: renamed-file.txt').should('be.visible');
    });
});

