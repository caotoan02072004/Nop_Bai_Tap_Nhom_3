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

export function clickPreviewByIndexAndName(index, name) {
  const regex = new RegExp(`${index}\\.\\s*${name}`, 'i')

  cy.contains('.ant-typography', regex)
    .closest('.bg-white.flex.flex-col.rounded-2xl')
    .within(() => {
      cy.get('.flex.items-center.justify-end')
        .find('button')
        .first()
        .click()
    })
}

export function saveApiResponseToFile(alias, fileName) {
  cy.wait(alias).then(({ request, response }) => {
    expect(response).to.exist;

    const output = {
      url: request.url,
      method: request.method,
      status: response.statusCode,
      headers: response.headers,
      body: response.body,
    };

    cy.writeFile(`cypress/debug/${fileName}`, output, {
      log: true,
    });
  });
}

export function hasAudio(item) {
  return item.audio !== null && item.audio !== '';
}

export function hasImage(item) {
  return item.image !== null && item.image !== '';
}

export function hasPair(item) {
  return item.pairs !== null;
}
