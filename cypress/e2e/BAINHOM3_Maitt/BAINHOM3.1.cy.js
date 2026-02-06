describe('CB_1_Healthcare Expert E2E', () => {

    it('Admission → Lab → Delayed Result → Doctor Change → Record Lock', () => {

        // Lễ tân tiếp nhận bệnh nhân
        cy.loginByRole('reception')

        cy.fixture('data').then((data) => {
            const patient = data.patientInformation
            cy.get('[data-test-id="patient-full-name"]').type(patient.fullName)
            cy.get('[data-test-id="dob"]').type(patient.dateOfBirth)
            cy.get('[data-test-id="gender"]').select(patient.gender)
            cy.get('[data-test-id="national-id"]').type(patient.nationalId)
            cy.get('[data-test-id="phone"]').type(patient.phone)
            cy.get('[data-test-id="address"]').type(patient.address)
            cy.get('[data-test-id="admission-reason"]').type(patient.admissionReason)
            cy.get('[data-test-id="triage-level"]').select(patient.triageLevel)
            cy.get('[data-test-id="initial-department"]').select(patient.initialDepartment)
            cy.get('[data-test-id="btn-admit"]').click()
            cy.get('[data-test-id="lab-120-admission-status"]').should('be.visible')
                .and('have.text', 'ADMITTED');
        })
        //cy.logout()
        // Bác sĩ yêu cầu xét nghiệm
        cy.loginByRole('doctor')
        cy.get('[data-test-id="lab-priority"]').select('ROUTINE');
        cy.get('input[type="checkbox"][value="CBC"]').check().should('be.checked');
        cy.get('[data-test-id="btn-submit-lab-order"]').click()
        cy.get('[data-test-id="lab-120-admission-status"]', { timeout: 20000 })
            .should('be.visible')
            .and('have.text', 'LAB_PENDING');
        //Phòng thí nghiệm công nghệ công bố kết quả một cách chậm trễ
        cy.loginByRole('labTech')
        cy.get('[data-test-id="result-status"]').select('ABNORMAL');
        cy.get('[data-test-id="result-summary"]').type('Có dấu hiệu bất thường');
        cy.get('[data-test-id="btn-publish-result"]').click();
        //Check timeline
        cy.get('[data-test-id="timeline-row-0"]')
            .should('contain.text', 'LAB_RESULTED')


        //Bác sĩ cập nhật phác đồ sau khi có kết quả
        // cy.loginByRole('doctor')
        // cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 20000 })
        //     .should('be.visible')
        //     .and('have.text', 'Doctor');
        // cy.get('[data-test-id="diagnosis"]').type('Bác sĩ cập nhật phác đồ điều trị của bệnh nhân');
        // cy.get('[data-test-id="diagnosis"]').select('Standard Fever Protocol');
        // cy.get('[data-test-id="btn-save-protocol"]').click();
        // Bác sĩ trưởng phân công lại bác sĩ và khóa hồ sơ

        // cy.loginByRole('chief')
        // cy.get('[data-test-id="new-doctor"]').select('Standard Fever Protocol');
    })
})





