import { benhnhan } from '../support/actions/reception.action'
import { doctorlaborder } from '../support/actions/doctor_order.action'
import { labresult } from '../support/actions/lab.action'
import { doctorupdate} from '../support/actions/doctor_update.action'
import { changeDoctor} from '../support/actions/chief.action'

describe('CB_1', () => {
    before(() => {
    cy.fixture('user_login').as('users')
  })
   it('Lab 120: Healthcare', function () {
    // Bước 1
    cy.login(this.users.reception);
    cy.contains('Signed in as reception01.').should('be.visible');
    cy.fixture('steps/1_reception').then(benhnhan);
    cy.logout();
    // Bước 2
    cy.login(this.users.doctor);
    cy.contains('Signed in as doctor01.').should('be.visible');
    cy.fixture('steps/2_doctor_orderlab').then(doctorlaborder);
    cy.logout();
    // Bước 3
    cy.login(this.users.labtech);
    cy.contains('Signed in as labtech01.').should('be.visible');
    cy.fixture('steps/3_lab_result').then(labresult);
    cy.logout();
    // Bước 4
    cy.login(this.users.doctor1);
    cy.contains('Signed in as doctor01.').should('be.visible');
    cy.fixture('steps/4_doctor_update').then(doctorupdate);
    cy.logout();
    // Bước 5
    cy.login(this.users.chief);
    cy.contains('Signed in as chief01.').should('be.visible');
    cy.fixture('steps/5_change_doctor').then(changeDoctor);
    cy.logout();
   });
})