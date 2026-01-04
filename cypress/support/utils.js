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

export function clickPreviewByIndexAndName(index, name, type = 0) {
    const regex = new RegExp(`${index}\\.\\s*${name}`, 'i')
    if (type == 1){
        cy.contains('.ant-typography', regex)
        .closest('.bg-white.flex.flex-col.rounded-2xl')
        .as('questionCard');

        cy.get('@questionCard').within(() => {
            cy.get('.ant-spin-spinning', { timeout: 30000 })
            .should('not.exist');

            cy.get('img.image-custom', { timeout: 30000 })
            .should('be.visible')
            .should($img => {
                const src = $img.attr('src');
                expect(src).to.exist;
                expect(src).not.to.include('default_image');
            });
        });
        cy.wait(300);
        cy.get('@questionCard').within(() => {
            cy.get('.flex.items-center.justify-end')
                .find('button')
                .first()
                .should('not.be.disabled')
                .click();
        });
    }
    else{
        cy.contains('.ant-typography', regex)
        .closest('.bg-white.flex.flex-col.rounded-2xl')
        .within(() => {
        cy.get('.flex.items-center.justify-end')
            .find('button')
            .first()
            .click()
        })
    }

}

export function hasAudio (item) {
    return item.audio !== null && item.audio !== '';
}

export function hasImage (item) {
    return item.image !== null && item.image !== '';
}

export function hasPair (item) {
    return item.pairs !== null;
}

export function hasUrlData (item, type) {
    if (type == 0){
        return item.audio !== null && item.audio !== '';
    }
    else if(type == 1){
        return item.image !== null && item.image !== '';
    }
    else{
        return item.pairs !== null;
    }
}

export function matchMediaType(item, type) {
    if (type === 0) {
        return item?.mediaType === 'AUDIO';
    }

    if (type === 1) {
        return item?.mediaType === 'IMAGE';
    }

    return false;
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


export function createMission() {
    cy.fixture('mission').then((data) => {
      cy.visit('/teacher/mission/create')
      
      cy.get('.ant-select[name="gradeId"]').click()

      // chọn Grade
      cy.get('body')
        .find('.ant-select-dropdown')
        .contains('.ant-select-item-option', data.grade)
        .click()

      // verify
      cy.get('.ant-select[name="gradeId"]')
        .contains(data.grade)
      
      cy.get('input[name="topic"]').type(data.topic).click()
      cy.contains('button', 'Apply')
        .should('be.visible')
        .click()
      // cy.wait(2000)
      // cy.debug()
      // data.vocab.forEach(word => {
      //   cy.get('input[placeholder="Add vocabulary"]')
      //     .click()
      //     .type(`${word}{enter}`)
      // })
      cy.get('input[placeholder^="Enter grammar elements"]')
            .should('be.visible')
            .click()
            .type('pre')
      // cy.wait(2000)
      // cy.debug()
      cy.contains('div', 'Present Tense')
        .should('be.visible')
        .click()
      cy.contains('button', 'Apply')
        .should('be.visible')
        .click()
      
      cy.contains('button', 'Continue')
        .scrollIntoView()
        .should('be.visible')
        .and('not.be.disabled')
        .click()
      
      cy.get('.ant-checkbox-group')
        .find('.ant-checkbox-wrapper')
        .each(($label) => {
          cy.wrap($label).click()
        })

      cy.contains('button', 'Save')
        .scrollIntoView()
        .should('be.visible')
        .and('not.be.disabled')
        .click()
    })
}