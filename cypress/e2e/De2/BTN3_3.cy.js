
describe('Focus Trap Test', () => {
  it('Should display alert with correct entered content', () => {
    // 1. Truy cập vào trang
    cy.visit('https://autotestsandbox.com/examples/focus-trap');
    const outsideText = 'Outside input test';
    const secondaryNote = 'Secondary note test';
    // 2. Nhập Outside input
    cy.get('[data-test-id="focus-trap-primary"]').type(outsideText);
    // 3. Nhập Secondary note
    cy.get('[data-test-id="focus-trap-secondary"]').type(secondaryNote);
    // 4. Nhấn Open Trap
    cy.contains('button', 'Open trap').click();
    // 5. nhập input trong popup 
    cy.get('input[placeholder="First in trap"]').type('First in trap');
    cy.contains('button', 'Save').click();
    // 6. Lắng nghe alert và kiểm tra nội dung
    cy.on('window:alert', (text) => {
      expect(text).to.contains('First in trap');
    });
  });

});


