export const benhnhan = (data) => {

  cy.get('[data-test-id="patient-full-name"]').type(data.fullname);
  cy.get('[data-test-id="dob"]').type(data.birthdate);
  cy.get('[data-test-id="gender"]').select(data.gender);
  cy.get('[data-test-id="national-id"]').type(data.nationalID);
  cy.get('[data-test-id="phone"]').type(data.phone);
  cy.get('[data-test-id="address"]').type(data.address);
  cy.get('[data-test-id="admission-reason"]').type(data.admissionreason);
  cy.get('[data-test-id="triage-level"]').select(data.triagelevel);
  cy.get('[data-test-id="initial-department"]').select(data.initial);
  cy.get('[data-test-id="btn-admit"]').click();
  cy.get('[data-test-id="lab-120-status"]').should('be.visible');
  cy.get('[data-test-id="lab-120-admission-status"]').should('be.visible');
  cy.get('[data-test-id="timeline-row-0"]').should('be.visible');

  return cy.get('[data-test-id="case-code"]').invoke('text');

}
