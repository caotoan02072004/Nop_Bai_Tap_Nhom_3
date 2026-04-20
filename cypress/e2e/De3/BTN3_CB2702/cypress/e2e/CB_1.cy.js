describe('Lab 101 - Full CRUD + Search flow', () => {

  it('Create new record and search it', () => {

    cy.visit('https://autotestsandbox.com/labs/full-crud-search-flow');

    // dữ liệu test
    const name = 'Auto'
    const email = 'autotest@example.com'
    const role = 'Admin'

    // 1. Click New Record
    cy.contains('New record').click();

    // 2. Nhập thông tin form
    cy.get('[data-test-id="lab-101-name"]').type(name);
    cy.get('[data-test-id="lab-101-email"]').type(email);
    cy.get('[data-test-id="lab-101-role"]').select(role);

    // 3. Click Save
    cy.contains('Save').click();

    // 4. Verify tạo thành công
    cy.contains('Record created.').should('be.visible');

    // 5. Search bản ghi vừa tạo
    cy.get('[data-test-id="lab-101-search"]').type(name);

    // 6. Verify tìm thấy bản ghi
    cy.contains(name).should('be.visible');
    cy.contains(email).should('be.visible');
    cy.contains(role).should('be.visible');

  });

});