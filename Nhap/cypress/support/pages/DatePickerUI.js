import DatePickerUI from '../helpers/datePickerUI';
export default class AreaPage {
    constructor() {
        this.datePicker = new DatePickerUI();
    }

    //MODAL + FORM

    createModal() {
        return cy.get('.ant-modal', { timeout: 10000 })
    }
    modalDisplayed() {
        return cy.get('.ant-modal', { timeout: 10000 })  // tìm modal, chờ tối đa 10s
            .scrollIntoView()                             // scroll modal vào view
            .should('be.visible', { timeout: 10000 });    // chờ modal visible
    }
    createForm() {
        return this.createModal()
            .find('form.ant-form', { timeout: 20000 })
    }

    //THÔNG TIN CHUNG

    textCode() {
        return this.createForm()
            .find('app-input[formcontrolname="code"] input')
    }

    textName() {
        return this.createForm()
            .find('app-input[formcontrolname="name"] input')
    }

    localType() {
        return this.createForm()
            .find('app-select[formcontrolname="localTypeId"] nz-select')
    }

    status() {
        return this.createForm()
            .find('app-select[formcontrolname="status"] nz-select')
    }

    approvalStatus() {
        return this.createForm()
            .find('app-select[formcontrolname="approvalStatus"] nz-select')
    }

    //NGƯỜI ĐỨNG ĐẦU

    idNumber() {
        return this.createForm()
            .find('app-input[formcontrolname="idNumber"] input')
    }

    fullName() {
        return this.createForm()
            .find('app-input[formcontrolname="fullName"] input')
    }

    dob() {
        return this.createForm()
            .find('app-datepicker[formcontrolname="dateOfBirth"] input')
    }

    termStart() {
        return this.createForm()
            .find('app-datepicker[formcontrolname="termStartAt"] nz-date-picker div input')
    }

    termEnd() {
        return this.createForm()
            .find('app-datepicker[formcontrolname="termEndAt"] nz-date-picker div input')
    }

    // BUTTON

    btnVerify() {
        return this.createForm()
            .contains('button', 'Xác thực')
    }
    btnSubmit() {
        return this.createForm()
            .find('button[type="submit"]', { timeout: 10000 }).first()
    }

    btnCancel() {
        return this.createForm()
            .contains('button', ' Quay lại ').first()
    }

    btnAddNew() {
        return cy.contains('button', 'Thêm mới', { timeout: 20000 })
    }
    fillGeneralInfo(data = {}) {
        if (data.name !== undefined) {
            this.textName()
                .should('be.visible')
                .clear({ force: true })
                .type(data.name, { force: true });
        }
        if (data.localType) {
            cy.get('.ant-modal') // scope theo modal
                .find('.ant-select-selector')
                .eq(0)
                .click();

            cy.get('.ant-select-dropdown:visible')
                .contains('.ant-select-item-option', data.localType)
                .click();
        }
    }
    //CHECK ALL FORM
    verifyCreateFormDisplayed() {
        // this.modalDisplayed();
        this.btnSubmit().should('be.visible');
        this.btnCancel().should('be.visible');
        return this;
    }

    fillLeaderInfo(data = {}) {
        if (data.idNumber !== undefined) {
            this.idNumber()
                .clear({ force: true })
                .type(String(data.idNumber), { force: true });
        }

        if (data.fullName !== undefined) {
            this.fullName()
                .clear({ force: true })
                .type(data.fullName, { force: true });
        }

        if (data.dob) {
            this.dob()
                .click()
                .type('{selectall}{backspace}')
                .type(data.dob)
                .type('{enter}')
                .blur()

        }
        if (data.termStart) {
            this.termStart()
                .clear({ force: true })
                .type(data.termStart, { force: true });
        }

        if (data.termEnd) {
            this.termEnd()
                .clear({ force: true })
                .type(data.termEnd, { force: true });

        }

        this.btnSubmit()
            .should('exist')
            .should('be.visible')
            .then($btn => {
                cy.log('Submit button found')
                cy.wrap($btn).click()
            })
    }

};

// Phê duyệt yêu cầu cập nhật, bổ sung địa bàn
//tìm kiếm dl

export default class AreaSearchPage {

    //SEARCH FORM/
    searchForm() {
        return cy.get('form.ant-form.f-search', { timeout: 20000 })
            .should('be.visible');
    }

    //INPUT TEXT
    codeInput() {//mã địa bàn
        return this.searchForm()
            .find('app-input[formcontrolname="code"] input');
    }
    nameInput() {//tên địa bàn
        return this.searchForm()
            .find('app-input[formcontrolname="name"] input');
    }
    //Button

    searchButton() {
        return this.searchForm()
            .find('button[type="submit"]')
            .contains('Tìm kiếm');
    }

    ButtonEdit() {
        return cy.get('i.anticon-edit').first()
    }
    clickEdit() {
        this.ButtonEdit().should('be.visible').click()
    }
    buttonSend() {
        return cy.get('i.anticon-send').first()
    }
    clickSend() {
        this.buttonSend()
            .should('be.visible')
            .click()
    }
    //xác nhận gửi thông tin địa bàn
    buttonAgree() { // đồng ý
        return cy.contains('button', 'Đồng ý')
    }
    clickAgree() {// Nhấn đồng ý
        this.buttonAgree()
            .should('be.visible')
            .and('not.be.disable')
            .click()
    }
    buttonReject() { // từ chối
        return cy.contains('button', 'Từ chối')
    }
    clickReject() {// Nhấn từ chối
        this.buttonReject()
            .should('be.visile')
            .and('not.be.disable')
            .click()
    }
    //data
    fillSearchInfo(data = {}) {
        if (data.code !== undefined) {
            this.codeInput()
                .clear({ force: true })
                .type(data.code, { force: true });
        }

        if (data.name !== undefined) {
            this.nameInput()
                .clear({ force: true })
                .type(data.name, { force: true });
        }

    }
}



