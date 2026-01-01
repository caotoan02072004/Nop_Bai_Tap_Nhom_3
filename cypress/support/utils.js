export const clickControl = (type, action = 'plus', times = 1) => {
  cy.contains('.text-center', type)
    .parent()
    .find(`span[aria-label="${action}"]`)
    .closest('button')
    .should('be.visible')
    .then($btn => {
      for (let i = 0; i < times; i++) {
        cy.wrap($btn).click()
      }
    })
}

export const expandTemplate = (templateName) => {
  cy.get(`[data-cy="${templateName}"]`)
    .then($collapse => {
        if ($collapse.attr('aria-expanded') !== 'true') {
            cy.wrap($collapse).click()
        }
    })
}