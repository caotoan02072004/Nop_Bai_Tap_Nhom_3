export const labresult = (results) => {

  cy.get('[data-test-id="queue-filter-status"]').select(results.filter);
  cy.get('[data-test-id="btn-open-case"]').click();
  cy.get('[data-test-id="result-status"]').select(results.result);
  cy.get('[data-test-id="result-attachment"]').selectFile(`cypress/fixtures/${results.file}`, { force: true });
  cy.get('[data-test-id="result-summary"]').type(results.resultsummary);
  cy.get('[data-test-id="btn-publish-result"]').click();
  cy.contains('Lab result published. Await availability.').should('be.visible');
  cy.get('[data-test-id="timeline"]').contains('LAB_RESULTED').should('be.visible');
}

