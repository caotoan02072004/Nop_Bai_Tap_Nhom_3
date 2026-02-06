
export default class ApprovalAreaPage {

    //SEARCH FORM

    inputCode() {
        return cy.get('app-input[formcontrolname="code"] input');
    }

    inputName() {
        return cy.get('app-input[formcontrolname="name"] input');
    }

    btnSearch() {
        return cy.contains('button', 'Tìm kiếm');
    }
    search(data = {}) {
        if (data.code) {
            this.inputCode().clear().type(data.code);
        }

        if (data.name) {
            this.inputName().clear().type(data.name);
        }
        // ktra giá trị đang hiển thị, k chọn option
        // if (data.approvalStatus) {
        //     this.selectApprovalStatus()
        //         .should('contain.text', data.approvalStatus);



        this.btnSearch().click();
    }

    // BẢNG

    table() {
        return cy.get('nz-table', { timeout: 10000 });

    }
    rowByCode(code) {
        return this.table()
            .contains('td', code)
            .parents('tr');
    }

    statusOfRow(code) {
        return this.rowByCode(code)
            .find('.ant-tag')
        // .should('contain.text', 'Chờ duyệt');
    }

    btnApprove(code) {
        return this.rowByCode(code)
            .find('.action')
            .find('.anticon-check-circle')
            .closest('a');

    }
    btnEditApprove(code) {
        return this.rowByCode(code)
            .find('.action')
            .find('anticon.anticon-edit"')
            .closest('a');

    }
    // MODAL CONFIRM

    confirmModal() {
        return cy.get('.ant-modal-confirm');
    }
    //lấy nút duyệt của bản ghi
    confirmApprove() {
        this.confirmModal()
            .should('be.visible')
            .contains('button', 'Đồng ý')
            .click();
    }

    //ASSERT

    assertStatus(code, statusText) {
        this.rowByCode(code)
            .should('contain.text', statusText);
    }

}