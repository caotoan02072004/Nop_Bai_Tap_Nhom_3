

export default class CitizenStructureModalPage {

    //SEARCH FORM
    searchForm() {
        return cy.get('form.ant-form', { timeout: 10000 });
    }

    householdRegistrationNumberInput() {
        return this.searchForm()
            .find('app-input[formcontrolname="householdRegistrationNumber"] input');
    }

    idNumberInput() {
        return this.searchForm()
            .find('app-input[formcontrolname="idNumber"] input');
    }

    searchButton() {
        return this.searchForm().contains('button', 'Tìm kiếm');
    }

    fillSearchInfo(data = {}) {
        if (data.householdRegistrationNumber !== undefined) {
            this.householdRegistrationNumberInput()
                .should('be.visible')
                .clear({ force: true })
                .type(data.householdRegistrationNumber, { force: true });
        }

        if (data.idNumber !== undefined) {
            this.idNumberInput()
                .should('be.visible')
                .clear({ force: true })
                .type(data.idNumber, { force: true });
        }

        return this;
    }

    search() {
        this.searchButton().should('be.visible').click();
        return this;
    }

    //TABLE ROW
    rowByCode(code) {
        return cy.contains('tbody tr', code);
    }

    statusOfRow(code) {
        return this.rowByCode(code)
            .find('td')
            .eq(13) // index 
            .invoke('text')
            .then(text => text.trim()); // loại bỏ khoảng trắng, &nbsp
    }

    openStructure(householdNumber) {
        cy.get('tbody tr')
            .not('.ant-table-measure-now')
            .should('have.length.greaterThan', 0)
            .contains(householdNumber)
            .parents('tr')
            .find('i.anticon-group')
            .should('exist')
            .scrollIntoView()
            .click({ force: true });

        return this;
    }


    //MODAL
    modal() {
        return cy.get('.ant-modal', { timeout: 20000 });
    }

    modalVisible() {
        this.modal().should('be.visible');

    }

    assertModalTitle() {
        this.modal()
            .find('.ant-modal-title')
            .should('contain.text', 'hộ nhân khẩu cấu trúc dữ liệu');
        return this;
    }

    openStructureTab() {
        // Chờ modal visible
        this.modalVisible();

        // Chọn tab header đúng selector Ant Design
        this.modal()
            .find('.ant-tabs-nav-list .ant-tabs-tab')
            .contains('Cấu trúc dữ liệu', { timeout: 10000 })
            .should('be.visible')
            .click({ force: true });

        return this;
    }
    //PERMANENT RESIDENCE
    permanentResidenceSection() {
        return this.modal()
            .contains('.ant-collapse-header', 'Cấu trúc dữ liệu nơi thường trú')
            .parents('.ant-collapse-item');
    }

    openPermanentResidencePanel() {
        // Panel luôn mở, không cần click
        return this;
    }

    assertResidenceDisabled() {
        this.permanentResidenceSection()
            .find('[formcontrolname="residence"] input')
            .should('exist')
            .and('be.disabled');
        return this;
    }

    //SELECT
    selectByFormControl(controlName, value) {
        // Click vào dropdown trong panel thường trú
        this.permanentResidenceSection()
            .find(`app-select[formcontrolname="${controlName}"] nz-select, app-tree-select[formcontrolname="${controlName}"] nz-tree-select`)
            .find('.ant-select-selector')
            .click({ force: true });
        // Chờ overlay hiện
        cy.get('.cdk-overlay-pane:visible', { timeout: 10000 })
            .should('exist')
            .within(() => {
                // Chọn node hoặc item bằng text
                cy.contains(value, { timeout: 10000 })
                    .scrollIntoView()
                    .click({ force: true });
            });

        return this;
    }

    selectLocalId(value) {
        return this.selectByFormControl('localId', value);
    }

    selectCharacteristicResidence(value) {
        return this.selectByFormControl('characteristicResidenceId', value);
    }

    selectCharacteristicOwnership(value) {
        return this.selectByFormControl('characteristicOwnershipId', value);
    }

    selectPurpose(value) {
        return this.selectByFormControl('characteristicPurposeIds', value);
    }

    selectHousehold(value) {
        return this.selectByFormControl('characteristicHouseholdId', value);
    }

    //SAVE
    clickSave() {
        this.modal()
            .should('be.visible')
            .contains('button', 'Ghi')
            .should('be.enabled')
            .click({ force: true });

        return this;
    }
}