/// <reference types="cypress" />

describe ('Lab 115: Education E2E: Course -> Enrollment -> Payment -> Learning -> Exam -> Certification',()=>{
    let Lab20260227

    before(()=>{
        cy.fixture('Lab20260227').then(data =>{
            data = Lab20260227
        })
    })
    it('Lab 115: Education E2E: Course -> Enrollment -> Payment -> Learning -> Exam -> Certification',()=>{
        cy.visit('https://autotestsandbox.com/labs/education-course-management-learning-certification');

    //Giảng viên đăng nhập, tạo và xuất bản khóa học 
        cy.get('[data-test-id="lab-115-login-instructor"]').should('be.visible').click();
        cy.get('[data-test-id="lab-115-user-badge"]').should('have.text','Instructor')
        cy.get('[data-test-id="lab-115-course-name"]').clear().type(Lab20260227.validCourseCreation.courseName);
        // cy.get('[data-test-id="lab-115-course-description"]').clear().type(Lab20260227.validCourseCreation.description);
        // cy.get('[data-test-id="lab-115-course-category"]').should('be.visible').select(Lab20260227.validCourseCreation.category);
        // cy.get('[data-test-id="lab-115-duration-hours"]').clear().should('be.visible').type(Lab20260227.validCourseCreation.duration(hours));
        // cy.get('[data-test-id="lab-115-duration-hours"]').clear().type(Lab20260227.validCourseCreation.tuitionFee(VND));
        // cy.get('[data-test-id="lab-115-btn-publish"]').should('be.visible').click();
    })
})