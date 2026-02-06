
export default class ApprovalAreaEditPage {

    modalBody() {
        return cy.get('.ant-modal-body', { timeout: 10000 });
    }

    statusSelect() {
        return this.modalBody()
            .find('app-select[formcontrolname="status"] nz-select')
            .should('be.visible');
    }

    modalShouldBeVisible() {
        this.modalBody().should('be.visible');
        return this;
    }

    selectStatus(value) {
        this.statusSelect()
            .click({ force: true });

        cy.get('.cdk-overlay-pane:visible', { timeout: 10000 })
            .find('.ant-select-item-option-content')
            .contains(value)
            .click({ force: true });

        return this;
    }

    clickSave() {
        this.modalBody()
            .find('button.ant-btn-primary')
            .should('be.visible')
            .click({ force: true });

        return this;
    }
    newNameInput() {
        return this.modalBody()
            .find('app-input[formcontrolname="name"] input')
            .should('be.visible');
    }

    fillNewName(value) {
        this.newNameInput()
            .clear()
            .type(value);

        return this;
    }
}

