export const doctorupdate = (data) => {

  cy.get('[data-test-id="diagnosis"]').type(data.diagnosis);
  cy.get('[data-test-id="protocol-name"]').select(data.protocolname);
  cy.get('[data-test-id="med-name"]').type(data.medication);
  cy.get('[data-test-id="med-dose"]').type(data.dose);
  cy.get('[data-test-id="med-frequency"]').type(data.frequency);
  cy.get('[data-test-id="btn-add-med"]').click();
  cy.get('[data-test-id="lab-120-med-list"]').should('be.visible');
  cy.get('[data-test-id="btn-save-protocol"]').click();
  cy.contains('Protocol updated.').should('be.visible');
  cy.get('[data-test-id="timeline"]').contains('PROTOCOL_UPDATED').should('be.visible');


}


