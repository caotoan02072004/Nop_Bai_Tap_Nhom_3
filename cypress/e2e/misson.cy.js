import { clickControl, expandTemplate } from '../support/utils'

describe('gen mission', () => {
  beforeEach(() => {
    cy.session('user-session', () => {
      cy.loginByApi();
    }, {
      validate() {
        cy.getCookie('access-token').should('exist');
      }
    })
    cy.visit('/');
  })

  it('pronunciation', () => {
    cy.visit('/teacher/mission/430b8177-7f46-4ad8-8f32-947850b3f102')

    expandTemplate('template-pronunciation-collapse');
    cy.get('[data-cy="template-content-pronunciation"]').within(() => {
      // clickControl('Image', 'plus', 2);
      clickControl('Audio', 'plus', 1);
    })

    cy.intercept('POST', '/api/lcm/web/excercise/create-excercise-pronunciation').as('generateQuestion');

    cy.get('button[data-cy="generate-question"]').click();

    const responses = []

    cy.wait('@generateQuestion').then(({ response }) => {
      responses.push(response.body);
      cy.log(response.body.data.id);
    })

    cy.wait('@generateQuestion').then(({ response }) => {
      responses.push(response.body);
      cy.log(response.body.data.id);
    })
    // cy.get('[data-rbd-droppable-id="menu"]')
    //   .contains('[data-rbd-draggable-id]', 'Pronunciation')
    //   .find('span[aria-label="loading"]', { timeout: 10000 })
    //   .should('not.exist')


    // expandTemplate('template-matching_pairs-collapse');
    // cy.get('[data-cy="template-content-matching_pairs"]').within(() => {
    //   clickControl('Image - Text', 'plus', 2);
    //   clickControl('Audio- Text', 'plus', 2);
    // })

  })

  // it('create mission with grade', () => {
  //   cy.fixture('mission').then((data) => {
  //     cy.visit('/teacher/mission/create')
      
  //     cy.get('.ant-select[name="gradeId"]').click()

  //     // chọn Grade
  //     cy.get('body')
  //       .find('.ant-select-dropdown')
  //       .contains('.ant-select-item-option', data.grade)
  //       .click()

  //     // verify
  //     cy.get('.ant-select[name="gradeId"]')
  //       .contains(data.grade)
      
  //     cy.get('input[name="topic"]').type(data.topic).click()
  //     cy.contains('button', 'Apply')
  //       .should('be.visible')
  //       .click()
  //     // cy.wait(2000)
  //     // cy.debug()
  //     // data.vocab.forEach(word => {
  //     //   cy.get('input[placeholder="Add vocabulary"]')
  //     //     .click()
  //     //     .type(`${word}{enter}`)
  //     // })
  //     cy.get('input[placeholder^="Enter grammar elements"]')
  //           .should('be.visible')
  //           .click()
  //           .type('pre')
  //     // cy.wait(2000)
  //     // cy.debug()
  //     cy.contains('div', 'Present Tense')
  //       .should('be.visible')
  //       .click()
  //     cy.contains('button', 'Apply')
  //       .should('be.visible')
  //       .click()
      
  //     cy.contains('button', 'Continue')
  //       .scrollIntoView()
  //       .should('be.visible')
  //       .and('not.be.disabled')
  //       .click()
      
  //     cy.get('.ant-checkbox-group').should('be.visible')
  //       .find('input[type="checkbox"]')
  //       .check({ force: true })

  //     cy.contains('button', 'Save')
  //       .scrollIntoView()
  //       .should('be.visible')
  //       .and('not.be.disabled')
  //       .click()
  //   })
  // })
})