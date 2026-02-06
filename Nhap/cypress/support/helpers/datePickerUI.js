export default class DatePickerUI {
    selectDate(date) {
        cy.get('app-datepicker[formcontrolname="dateOfBirth"] nz-date-picker div input', { timeout: 10000 })
            .clear({ force: true })
            .type(date, { force: true })
            .blur();
    }
}



