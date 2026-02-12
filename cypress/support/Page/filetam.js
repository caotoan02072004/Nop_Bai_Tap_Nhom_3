
export default class AreaPage {
    visit() {
        cy.visit('https://dd3a.devlead.top/cskv-ct/danh-muc-dia-ban/yeu-cau-thay-doi-dia-ban')
    }
    /* ================= MODAL + FORM ================= */
    createModal() {
        return cy.get('.ant-modal', { timeout: 10000 })
    }
    modalDisplayed() {
        this.createModal().should('be.visible')
        return this
    }
    createForm() {
        return this.createModal()
            .find('form.ant-form', { timeout: 20000 })
    }

    /* ================= THÔNG TIN CHUNG ================= */

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

    /* ================= NGƯỜI ĐỨNG ĐẦU ================= */

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
            .find('app-datepicker[formcontrolname="termStartAt"] input')
    }

    termEnd() {
        return this.createForm()
            .find('app-datepicker[formcontrolname="termEndAt"] input')
    }

    /* ================= BUTTON ================= */

    btnVerify() {
        return this.createForm()
            .contains('button', 'Xác thực')
    }
    btnSubmit() {
        return this.createForm()
            .find('button[type="submit"]', { timeout: 10000 })
    }

    btnCancel() {
        return this.createForm()
            .contains('button', ' Quay lại ')
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
                .click()

            cy.get('.ant-select-dropdown:visible')
                .contains('.ant-select-item-option', data.localType)
                .click()
        }

        // ===== CHECK ALL FORM =====
        verifyCreateFormDisplayed() 
        {
            this.modalDisplayed()
            this.btnSubmit().should('be.visible')
            this.btnCancel().should('be.visible')
            return this
        }
        fillLeaderInfo(data = {})
         {
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

    }
}