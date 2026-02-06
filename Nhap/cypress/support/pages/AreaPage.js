import DatePickerUI from '../helpers/datePickerUI';

export default class AreaPage {
    constructor() {
        this.datePicker = new DatePickerUI();
    }

    /* ================= MODAL ================= */

    modal() {
        return cy.get('.ant-modal', { timeout: 10000 });
    }

    form() {
        return this.modal().find('form.ant-form', { timeout: 20000 });
    }

    verifyModalDisplayed() {
        this.modal().should('be.visible');
        return this;
    }

    /* ================= THÔNG TIN CHUNG ================= */

    codeInput() {
        return this.form().find('app-input[formcontrolname="code"] input');
    }

    nameInput() {
        return this.form().find('app-input[formcontrolname="name"] input');
    }

    localTypeSelect() {
        return this.form().find('app-select[formcontrolname="localTypeId"] nz-select');
    }

    statusSelect() {
        return this.form().find('app-select[formcontrolname="status"] nz-select');
    }

    /* ================= NGƯỜI ĐỨNG ĐẦU ================= */

    idNumberInput() {
        return this.form().find('app-input[formcontrolname="idNumber"] input');
    }

    fullNameInput() {
        return this.form().find('app-input[formcontrolname="fullName"] input');
    }

    dobInput() {
        return this.form().find('app-datepicker[formcontrolname="dateOfBirth"] input');
    }

    termStartInput() {
        return this.form().find('app-datepicker[formcontrolname="termStartAt"] input');
    }

    termEndInput() {
        return this.form().find('app-datepicker[formcontrolname="termEndAt"] input');
    }

    /* ================= BUTTON ================= */

    submitButton() {
        return this.form().find('button[type="submit"]');
    }

    cancelButton() {
        return this.form().contains('button', 'Quay lại');
    }

    addNewButton() {
        return cy.contains('button', 'Thêm mới', { timeout: 20000 });
    }

    /* ================= ACTION ================= */

    fillGeneralInfo(data = {}) {
        if (data.name) {
            this.nameInput().clear().type(data.name);
        }

        if (data.localType) {
            this.localTypeSelect().click();
            cy.get('.ant-select-dropdown:visible')
                .contains('.ant-select-item-option', data.localType)
                .click();
        }

        return this;
    }

    fillLeaderInfo(data = {}) {
        if (data.idNumber) {
            this.idNumberInput().clear().type(String(data.idNumber));
        }

        if (data.fullName) {
            this.fullNameInput().clear().type(data.fullName);
        }

        if (data.dob) {
            this.dobInput()
                .clear()
                .type(data.dob)
                .type('{enter}');
        }

        if (data.termStart) {
            this.termStartInput().clear().type(data.termStart);
        }

        if (data.termEnd) {
            this.termEndInput().clear().type(data.termEnd);
        }

        return this;
    }
}
