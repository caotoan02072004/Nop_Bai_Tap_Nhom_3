describe('My Class', () => {
    beforeEach(() => {
        cy.visit('https://beta.cheppy.ai/signin')
        // Đăng nhập tài khoản
        cy.get('#user-name').type('thuythanh')
        cy.get('#password').type('123456aA@')
        cy.get('button[type="submit"]').click()
        //cy.contains('h2', 'My Library').should('be.visible')
        //cy.contains('span', 'My Library').click({ force: true })
        //cy.get('[data-cy="listExercise"]').eq(1).click()
    })

    it('ML_032_Kiểm tra hoạt động của action Eidt', () => {
        cy.contains('.ant-tag', 'Draft')
            .click({ force: true });
        cy.contains('span', 'Stage name').should('be.visible')
    })

    it('ML_033_Kiểm tra hoạt động của action Publish', () => {
        cy.contains('.ant-tag', 'Draft')
            .click({ force: true });
        cy.contains('button', 'Publish').click()
        cy.contains('button', 'Publish').click()
        cy.contains('span', 'Private').should('be.visible')
    })

    it('ML_035_Kiểm tra trạng thái khi chọn Share to person', () => {
        cy.contains('.ant-tag', 'Draft')
            .click({ force: true });
        cy.contains('button', 'Publish').click()
        // Chọn vào radio Share to other
        cy.get('input.ant-radio-input[value="TO_PUBLIC_VIEW_USER"]')
            .parent()
            .click({ force: true });
        cy.contains('span', 'Enter email or username').type('thuytest_gv1{enter}');
        cy.contains('button', 'Share with').click()
    })

    it('ML_036_Kiểm tra hoạt động nút Back', () => {
        cy.contains('.ant-tag', 'Draft')
            .click({ force: true });
        cy.contains('button', 'Publish').click()
        cy.contains('button', 'Cancel').click()
        cy.contains('span', 'Stage name').should('be.visible')
    })

   it('ML_037_Kiểm tra hoạt động của action Duplicate', () => {
        cy.contains('.ant-tag', 'Draft')
            .click({ force: true });
        cy.contains('button', 'Duplicate').click()
        cy.get('input[placeholder="Unit name"]').type('Mission dup')
        cy.contains('button', 'Duplicate').click()
        cy.contains('.tiptap ProseMirror', 'Mission dup').should(be.visible)
    })

    it('ML_038_Kiểm tra hoạt động của action Duplicate', () => {
        cy.contains('.ant-tag', 'Draft')
            .click({ force: true });
        cy.contains('button', 'Duplicate').click()
        cy.get('input[placeholder="Unit name"]').clear()
        cy.contains('.ant-form-item-explain-error', 'Field is required').should('be.visible');
    })

    it('ML_041_Kiểm tra hoạt động của action Delete', () => {
        cy.contains('.ant-tag', 'Draft')
            .click({ force: true });
        cy.contains('button', 'Delete').click()
        cy.contains('button', 'Delete').click()
        cy.contains('span', 'Deleted').should('be.visible')
    })

});