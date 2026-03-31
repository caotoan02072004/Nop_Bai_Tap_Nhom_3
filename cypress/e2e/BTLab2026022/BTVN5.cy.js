describe('Lab5', () => {

    it('Rename file before upload', () => {

        const newName = 'Auto_Test'
//1. Truy cập vào trang 
        cy.visit('https://autotestsandbox.com/labs/rename-file-before-upload');

//2. Upload file
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Anh.png');
//3.Nhập tên mới (không kèm phần mở rộng).
        cy.get('[data-test-id="lab-066-name"]').clear().type(newName);
        cy.get('[data-test-id="lab-066-upload"]').click();
//4.Tải lên và xác nhận tên cuối gồm đuôi file gốc.
        cy.contains(`${newName}.png`).should('be.visible');

    })

})