import {instructor} from '../support/actions/instructor.action'
import {student} from '../support/actions/student.action'
import {admin} from '../support/actions/admin.action'
import {student2} from '../support/actions/student2.action'
import {admin2} from '../support/actions/admin2.action'

describe('CB_1', () => {
    before(() => {
    cy.visit('https://autotestsandbox.com/labs/education-course-management-learning-certification');
  })
   it.only('Lab 115: Education E2E', function () {
      // Check-in
      cy.fixture('Steps/instructor').then(instructor);
      cy.fixture('Steps/student').then((studentData) => {
        return student(studentData)
        }).then(() => {
                        admin()
                    });
      cy.fixture('Steps/student').then((studentData2) => {
        return student2(studentData2)
        }).then(() => {
                        admin2()
                    });
   });
})