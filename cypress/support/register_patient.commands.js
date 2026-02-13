Cypress.Commands.add('registerAdmission', (patient) => {
    cy.get('[data-test-id="patient-full-name"]').clear().type(patient.fullName)
    cy.get('[data-test-id="dob"]').clear().type(patient.dob)
    cy.get('[data-test-id="gender"]').select(patient.gender)
    cy.get('[data-test-id="national-id"]').clear().type(patient.nationalId)
    cy.get('[data-test-id="phone"]').clear().type(patient.phone)
    cy.get('[data-test-id="insurance-no"]').clear().type(patient.insuranceNo)
    cy.get('[data-test-id="address"]').clear().type(patient.address)
    cy.get('[data-test-id="admission-reason"]').clear().type(patient.reason)
    cy.get('[data-test-id="triage-level"]').select(patient.level)
    cy.get('[data-test-id="initial-department"]').select(patient.initialdepartment)
    cy.get('[data-test-id="btn-admit"]').click()
});