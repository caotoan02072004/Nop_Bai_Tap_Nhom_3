
export default class ApprovalAreaSearchPage {

    //FORM

    searchForm() {
        return cy.get('form.ant-form.f-search', { timeout: 20000 })
            .should('be.visible');
    }

    //INPUT

    codeInput() {
        return this.searchForm()
            .find('app-input[formcontrolname="code"] input')
            .should('be.visible');
    }

    nameInput() {
        return this.searchForm()
            .find('app-input[formcontrolname="name"] input')
            .should('be.visible');


    }


    searchButton() {
        return this.searchForm()
            .contains('button', 'Tìm kiếm')
            .should('be.visible');
    }

    //TABLE

    rowByCode(code) {
        return cy.get('nz-table')
            .contains('td', code)
            .parents('tr');
    }

    clickEdit(code) {
        return this.rowByCode(code)
            .find('i.anticon svg[data-icon="edit"]')
            .should('exist')
            .scrollIntoView()
            .click({ force: true });


    }

    // ACTIONS

    fillSearchInfo(data = {}) {
        if (data.code) {
            this.codeInput().clear().type(data.code);
        }

        if (data.name) {
            this.nameInput().clear().type(data.name);
        }

        return this;
    }

    clickSearch() {
        this.searchButton().click({ force: true });
        return this;
    }
}