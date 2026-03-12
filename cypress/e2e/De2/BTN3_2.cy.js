describe('Lab 038 - Handle API rate limit 429', () => {

  it('Kiểm tra gửi request thành công và bị 429 khi gửi nhiều lần', () => {
    // 1. Truy cập vào trang
    cy.visit('https://autotestsandbox.com/labs/handle-api-rate-limit-429');
    // 2. Bắt API request khi nhấn nút gửi
    cy.intercept('POST', '**/api/**').as('sendRequest');
    // 3. Nhấn gửi request lần đầu
    cy.contains('Send request').click();
    // 4. Kiểm tra trạng thái thành công 
    cy.contains('Request succeeded.').should('be.visible');
    // 5. Nhấn gửi request nhiều lần để vượt rate limit
    for (let i = 0; i < 5; i++) {
      cy.contains('Send request').click();
    }
    // 6. Kiểm tra nhận lỗi 429
    cy.contains('429 Too Many Requests').should('be.visible');
  });

});