export default class AreaSearchPage {


    searchForm() {
        return cy.get('form.ant-form.f-search', { timeout: 20000 });
    }

    //INPUT

    codeInput() {
        return this.searchForm().find('app-input[formcontrolname="code"] input');
    }

    nameInput() {
        return this.searchForm().find('app-input[formcontrolname="name"] input');
    }

    //BUTTON

    searchButton() {
        return this.searchForm().contains('button', 'Tìm kiếm');
    }

    editIcon() {
        return cy.get('i.anticon-edit');
    }

    sendIcon() {
        return cy.get('i.anticon-send');
    }

    agreeButton() {
        return cy.contains('button', 'Đồng ý');
    }

    //ACTION

    fillSearchInfo(data = {}) {
        if (data.code !== undefined) {
            this.codeInput()
                .should('be.visible')
                .clear({ force: true })
                .type(data.code, { force: true });
        }

        if (data.name !== undefined) {
            this.nameInput()
                .should('be.visible')
                .clear({ force: true })
                .type(data.name, { force: true });
        }
        return this;
    }

    search() {
        this.searchButton()
            .should('be.visible')
            .click();
        return this;
    }

    clickEdit() {
        this.editIcon().should('be.visible').click();
    }

    clickSend() {
        this.sendIcon()
            .should('exist')        //chỉ cần tồn tại
            //.scrollIntoView()      //đảm bảo nằm trong viewport
            .click({ force: true }); // bắt buộc với Ant Design
    }

    approve() {
        this.agreeButton()
            .should('be.visible')
            .and('not.be.disabled')
            .click();
    }
}