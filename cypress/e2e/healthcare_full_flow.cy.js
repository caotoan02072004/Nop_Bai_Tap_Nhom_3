Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
import { loginData } from '../fixtures/loginData'

describe('Healthcare Expert', () => {
  const users = loginData.Reception
  beforeEach(() => {
    cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment')
    cy.get('[data-test-id="lab-120-reset"]').should('be.visible').click()
  })
  users.forEach((user) => {
    it(user.name, () => {
      cy.login(user.username, user.password)
      if (user.success) {
        cy.contains(user.role).should('be.visible')
        cy.fixture('patient_information').then((patient) => {
          cy.registerAdmission(patient)
        })
      }
      else {
        cy.contains('Invalid credentials').should('be.visible')
      }
    })
  })
})
