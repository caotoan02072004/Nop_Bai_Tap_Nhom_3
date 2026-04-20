import dataSet from '../fixtures/BT3.json'

describe('Lab115 - Education E2E Flow', () => {

  beforeEach(() => {
    cy.visit('https://autotestsandbox.com/labs/education-course-management-learning-certification')
  })

  dataSet.forEach((data) => {

    it(`Course Flow - ${data.courseName}`, () => {

      // Instructor login
      cy.get('[data-test-id="lab-115-login-instructor"]').click();

      cy.get('[data-test-id="lab-115-course-name"]').type(data.courseName);
      cy.get('[data-test-id="lab-115-course-description"]').type(data.price);
      cy.get('[data-test-id="lab-115-course-category"]').select(data.category);
      cy.get('[data-test-id="lab-115-duration-hours"]').type(data.hours);
      cy.get('[data-test-id="lab-115-tuition-fee"]').type(data.tuition);

      cy.contains('Publish course').click();
      cy.contains(data.steps[0].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[0].timeline);

      // Student login
      cy.get('[data-test-id="lab-115-login-student"]').click();

      cy.get('[data-test-id="lab-115-student-name"]').type(data.studentName);
      cy.get('[data-test-id="lab-115-student-email"]').type(data.studentEmail);
      cy.contains('Confirm enroll').click();

      cy.contains(data.steps[1].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[1].timeline);

      // Payment
      cy.get('[data-test-id="lab-115-payment-method"]').select(data.paymentMethod);
      cy.get('[data-test-id="lab-115-pay-amount"]').type(data.payAmount);
      cy.get('[data-test-id="lab-115-btn-pay"]').click();

      cy.contains(data.steps[2].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[2].timeline);

      // Admin open class
      cy.get('[data-test-id="lab-115-login-admin"]').click();
      cy.contains('Open class').click();

      cy.contains(data.steps[3].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[3].timeline);

      // Student learning
      cy.get('[data-test-id="lab-115-login-student"]').click();
      cy.contains('Start learning').click();

      cy.contains(data.steps[4].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[4].timeline);

      // Lesson 1
      cy.get('[data-test-id="lab-115-lesson-L1"]').click();
      cy.contains(data.steps[5].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[5].timeline);

      // Lesson 2
      cy.get('[data-test-id="lab-115-lesson-L2"]').click();
      cy.contains(data.steps[6].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[6].timeline);

      // Lesson 3
      cy.get('[data-test-id="lab-115-lesson-L3"]').click();
      cy.contains(data.steps[7].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[7].timeline);

      // Exam
      cy.get('[data-test-id="lab-115-exam-score"]').type(data.examScore);
      cy.contains('Submit exam').click();

      cy.contains(data.steps[8].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[8].timeline);

      // Admin issue certificate
      cy.get('[data-test-id="lab-115-login-admin"]').click();
      cy.get('[data-test-id="lab-115-btn-issue-certificate"]').click();

      cy.contains(data.steps[9].status).should('exist');
      cy.get('[data-test-id="lab-115-timeline"]').should('contain', data.steps[9].timeline);

    });

  });

});

























// import dataSet from '../fixtures/BT3.json'

// describe('Lab115 - Education E2E Flow', () => {

//   beforeEach(() => {
//     cy.visit('https://autotestsandbox.com/labs/education-course-management-learning-certification')
//   })

//   dataSet.forEach((data) => {

//     it('Course Flow ', () => {
//       // Instructor login
//       cy.get('[data-test-id="lab-115-login-instructor"]').click();
//       // Create course
//       cy.get('[data-test-id="lab-115-course-name"]').type(data.courseName);
//       cy.get('[data-test-id="lab-115-course-description"]').type(data.price);
//       cy.get('[data-test-id="lab-115-course-category"]').select(data.category);
//       cy.get('[data-test-id="lab-115-duration-hours"]').type(data.hours);
//       cy.get('[data-test-id="lab-115-tuition-fee"]').type(data.tuition);
//       cy.contains('Publish course').click();
//       cy.contains('Course published.').should('exist');
//       cy.get('[data-test-id="lab-115-timeline"]').should('contain', 'Instructor | PUBLISH_COURSE');
//       // Student login
//       cy.get('[data-test-id="lab-115-login-student"]').click();
//       // Student enroll 
//       cy.get('[data-test-id="lab-115-student-name"]').type('Hiếu');
//       cy.get('[data-test-id="lab-115-student-email"]').type('hieu@gmail.com');
//       cy.contains('Confirm enroll').click();
//       cy.contains('Enrollment successful.').should('exist');
//       cy.get('[data-test-id="lab-115-timeline"]').should('contain', 'Student | ENROLL | Note: Hiếu');

//       // Payment
//       cy.get('[data-test-id="lab-115-payment-method"]').select('CASH');
//       cy.get('[data-test-id="lab-115-pay-amount"]').type('100000');
//       cy.get('[data-test-id="lab-115-btn-pay"]').click();
//       cy.contains('Tuition paid.').should('exist')
//       cy.get('[data-test-id="lab-115-timeline"]').should('contain', 'Student | PAY_TUITION | Note: CASH 100,000 VND');

//       // Admin login
//       cy.get('[data-test-id="lab-115-login-admin"]').click();
//       cy.contains('Open class').click();
//       cy.contains('Class opened.').should('exist');
//       cy.get('[data-test-id="lab-115-timeline"]').should('contain', 'Admin | OPEN_CLASS');
//       // Student learning
//       cy.get('[data-test-id="lab-115-login-student"]').click();
//       cy.contains('Start learning').click();
//       cy.contains('Learning started.').should('exist');
//       cy.get('[data-test-id="lab-115-timeline"]').should('contain', 'Student | START_LEARNING');
//       // Học L1
//       cy.get('[data-test-id="lab-115-lesson-L1"]').click();
//       cy.contains('Lesson 1: Foundations completed.').should('exist');
//       cy.contains('button', 'Completed').should('be.visible');
//       cy.get('[data-test-id="lab-115-timeline"]')
//         .should('contain', 'Student | LESSON_COMPLETED | Note: Lesson 1: Foundations');
//       // Học L2
//       cy.get('[data-test-id="lab-115-lesson-L2"]').click();
//       cy.contains('Lesson 2: Practice completed.').should('exist');
//       cy.contains('button', 'Completed').should('be.visible');
//       cy.get('[data-test-id="lab-115-timeline"]')
//         .should('contain', 'Student | LESSON_COMPLETED | Note: Lesson 2: Practice');
//       // Học L3
//       cy.get('[data-test-id="lab-115-lesson-L3"]').click();
//       cy.contains('Lesson 3: Review completed.').should('exist');
//       cy.contains('button', 'Completed').should('be.visible');
//       cy.get('[data-test-id="lab-115-timeline"]')
//         .should('contain', 'Student | LESSON_COMPLETED | Note: Lesson 3: Review');
//       // Exam
//       cy.get('[data-test-id="lab-115-exam-score"]').type('80');
//       cy.contains('Submit exam').click();
//       cy.contains('Exam passed.').should('exist')
//       cy.get('[data-test-id="lab-115-timeline"]')
//         .should('contain', 'Student | EXAM_PASSED | Note: Score 80');
//       // Admin grant certificate
//       cy.get('[data-test-id="lab-115-login-admin"]').click();
//       cy.get('[data-test-id="lab-115-btn-issue-certificate"]').click();
//       cy.contains('Certificate issued.').should('exist');
//       cy.get('[data-test-id="lab-115-timeline"]')
//         .should('contain', 'Admin | ISSUE_CERTIFICATE | Note: CERT-115-0001');
//     });

//   });

// });