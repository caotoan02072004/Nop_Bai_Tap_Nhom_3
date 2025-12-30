describe('gen mission', () => {
  beforeEach(() => {
    cy.session('user-session', () => {
      cy.loginByApi()
    }, {
      validate() {
        cy.getCookie('access-token').should('exist')
      }
    })
    cy.visit('https://beta.cheppy.ai')
  })
  
  it('create mission with grade', () => {
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
      
      cy.get('.ant-checkbox-group').should('be.visible')
        .find('input[type="checkbox"]')
        .check({ force: true })

      cy.contains('button', 'Save')
        .scrollIntoView()
        .should('be.visible')
        .and('not.be.disabled')
        .click()

    })
  })
})