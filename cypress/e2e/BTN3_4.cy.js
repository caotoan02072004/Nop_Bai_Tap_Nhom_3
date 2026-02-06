describe('First page load under 2 seconds', () => {
  it('Verify PASS status when first page load is under 2 seconds', {
    retries: 2 //chạy lại 2 lần nếu fail
  }, () => {
    cy.visit('https://autotestsandbox.com/labs/first-page-load-under-2-seconds');
    cy.contains('Measure').should('be.visible').click();
    cy.contains('Pass').should('be.visible');
    cy.get('[role="status"]').invoke('text').then((text) => { // Lấy thời gian hiển thị
      const time = parseInt(text.replace(/\D/g, ''), 10); //Tìm tất cả ký tự không phải là số, thay bằng '' rỗng
      //\D	Bất kỳ ký tự KHÔNG phải số (0–9)
      //g	global – áp dụng cho toàn bộ chuỗi
      //parseInt chuyển string sang số. hệ thập phân 10
      expect(time).to.be.lessThan(2000); //Nếu nhỏ hơn 2s mà fail thì retry, nếu pass thì ngừng
    });
  });
});
