/// <reference types="cypress" />

describe('BTVN_TC1', () => {
    let healthcare

    before(() => {
        cy.fixture('healthcare').then(data => {
            healthcare = data
        })
    })

    beforeEach(() => {
        cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment')
    })
    it('Lab 120: Healthcare Expert E2E: Admission -> Lab Orders -> Delayed Ressults -> Protocol Update -> Doctor Change -> Record Lock', () => {
        //Nhân viên Login
        cy.get('[data-test-id="username"]').clear().type(healthcare.validUserReception.username);
        cy.get('[data-test-id="password"]').clear().type(healthcare.validUserReception.password);
        cy.get('[data-test-id="btn-login"]').should('be.visible').click();
        cy.get('[data-test-id="lab-120-role-badge"]')
            .should('have.text', 'Reception');


        //1. Admission - Nhân viên tiếp nhận nhập viện
        cy.get('[data-test-id="patient-full-name"]').clear().should('be.visible').type(healthcare.validPatient.fullName);
        cy.get('[data-test-id="dob"]').clear().should('be.visible').type(healthcare.validPatient.dateOfBirth);
        cy.get('[data-test-id="gender"]')
            .should('be.visible')
            .select(healthcare.validPatient.gender);
        cy.get('[data-test-id="national-id"]').clear().should('be.visible').type(healthcare.validPatient.nationalID);
        cy.get('[data-test-id="phone"]').clear().should('be.visible').type(healthcare.validPatient.phone);
        // cy.get('[data-test-id="insurance-no"]').clear().should('be.visible').type(healthcare.validPatient.insuranceNo);
        cy.get('[data-test-id="address"]').clear().should('be.visible').type(healthcare.validPatient.address);
        cy.get('[data-test-id="admission-reason"]').clear().should('be.visible').type(healthcare.validPatient.admissionReason);
        cy.get('[data-test-id="triage-level"]').should('be.visible').select(healthcare.validPatient.triageLevel);
        cy.get('[data-test-id="initial-department"]').should('be.visible').select(healthcare.validPatient.initialDepartment);
        cy.get('[data-test-id="btn-admit"]').should('be.visible').click();
        cy.get('[data-test-id="lab-120-admission-status"]')
            .should('have.text', 'ADMITTED');
        //Check timeline
        cy.contains('ADMITTED').should('be.visible');

        //2. Lab Orders - Bác sĩ chỉ định xét nghiệm
        // 2.1. Bác sĩ đăng nhập hệ thống
        cy.get('[data-test-id="username"]').clear().type(healthcare.validUserDoctor.username);
        cy.get('[data-test-id="password"]').clear().type(healthcare.validUserDoctor.password);
        cy.get('[data-test-id="btn-login"]').should('be.visible').click();
        cy.get('[data-test-id="lab-120-role-badge"]')
            .should('have.text', 'Doctor');

        // 2.2. yêu cầu xét nghiệm
        cy.get('[data-test-id="lab-priority"]').should('be.visible').select(healthcare.validLabOrders.priority);
        cy.get('input[type="checkbox"][value="CRP"]')
            .check()
            .should('be.checked');
        cy.get('[data-test-id="btn-submit-lab-order"]').click();
        cy.get('[data-test-id="lab-120-lab-status"]').should('have.text', 'LAB_PENDING');
        //Check timeline
        cy.contains('ADMITTED').should('be.visible');
        cy.contains('ADMITTED').should('be.visible');

        //3. Delayed Ressults - Phòng thí nghiệm công nghệ công bố kết quả 1 cách chậm trễ 
        //3.1. Phòng thí nghiệm công nghệ đăng nhập hệ thống
        cy.get('[data-test-id="username"]').clear().type(healthcare.validUserLabTech.username);
        cy.get('[data-test-id="password"]').clear().type(healthcare.validUserLabTech.password);
        cy.get('[data-test-id="btn-login"]').should('be.visible').click();
        cy.get('[data-test-id="lab-120-role-badge"]')
            .should('have.text', 'LabTech');
        //3.2. Công bố kết quả
        cy.get('[data-test-id="result-status"]').should('be.visible').select(healthcare.validLabTech.resultStatus);
        cy.get('[data-test-id="result-summary"]').should('be.visible').type(healthcare.validLabTech.clinicalNote);
        cy.get('[data-test-id="btn-publish-result"]').should('be.visible').click();
        cy.get('[data-test-id="lab-120-logout"]').should('be.visible').click();
        //4. Protocol Update - Cập nhật phác đồ điều trị 
        //4.1. Bác sĩ đăng nhập
        cy.get('[data-test-id="username"]').clear().type(healthcare.validUserDoctor.username);
        cy.get('[data-test-id="password"]').clear().type(healthcare.validUserDoctor.password);
        cy.get('[data-test-id="btn-login"]').should('be.visible').click();
        cy.get('[data-test-id="lab-120-role-badge"]')
            .should('have.text', 'Doctor');
        //4.2. Bác sĩ cập nhật phác đồ điều trị
        cy.get('[data-test-id="diagnosis"]').should('be.visible');
        //clear().type(healthcare.validProtocolUpdate.diagnosis);
        //cy.get('[data-test-id="protocol-name"]').should('be.visible').select(healthcare.validProtocolUpdate.protocolName);

        //Doctor Change- Record Lock --> Thay đổi bác sĩ --> Khóa hồ sơ

        // Kiểm tra timeline 
        // const expectedTimeline = [
        //     'LAB_RESULTED',
        //     'LAB_PENDING',
        //     'LAB_ORDERED',
        //     'ADMITTED'
        // ];

        // cy.get('[data-test-id="timeline-item"]')
        //     .should('have.length', expectedTimeline.length)
        //     .each(($el, index) => {
        //         cy.wrap($el)
        //             .should('contain.text', expectedTimeline[index]);
        //     });

    })
})