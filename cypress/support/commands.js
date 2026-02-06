// Tài khoản
Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment')
  cy.get('[data-test-id="username"]').type(username);
  cy.get('[data-test-id="password"]').type(password);
  cy.get('[data-test-id="btn-login"]').contains("Login").click({ force: true });
})
Cypress.Commands.add('openPatient', (fullName) => {
  cy.log(`Open patient: ${fullName}`)
})


// Verify
Cypress.Commands.add('verifyCaseDetail', () => {
  cy.fixture('BT3').then(({ verifyCaseDetail }) => {
    const {
      caseCode,
      status,
      doctor,
      patientName,
      dob,
      triage,
      department
    } = verifyCaseDetail

    cy.contains(caseCode)
    cy.contains(status)
    cy.contains(doctor)
    cy.contains(patientName)
    cy.contains(dob)
    cy.contains(triage)
    cy.contains(department)
    cy.contains('Patient admitted')
  })
})

//import fille
import 'cypress-file-upload';