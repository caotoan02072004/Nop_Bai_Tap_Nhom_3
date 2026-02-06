export const changeDoctor = (newDoctor) => {

  cy.get('[data-test-id="new-doctor"]').select(newDoctor.newdoctor);
  cy.get('[data-test-id="change-reason"]').type(newDoctor.changereason);
  cy.get('[data-test-id="btn-change-doctor"]').click();
  cy.get('[data-test-id="timeline"]').contains('DOCTOR_CHANGED').should('be.visible');
  cy.get('[data-test-id="lock-reason"]').type(newDoctor.lockreason);
  cy.get('[data-test-id="lock-confirm"]').click();
  cy.get('[data-test-id="btn-lock-record"]').click();
  cy.get('[data-test-id="toast"]').contains('Record locked.').should('be.visible');
  cy.get('[data-test-id="timeline"]').contains('RECORD_LOCKED').should('be.visible');

}
