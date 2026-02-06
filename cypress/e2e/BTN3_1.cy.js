describe('Lab 120 - Healthcare Expert E2E (Data Driven)', () => {
   before(() => {
      cy.fixture('BT3').as('data');
   })
   it('Admission → Lab Order → Delayed Result → Protocol → Doctor Change → Lock Record', function () {
      const { patient, accounts } = this.data
      
      //1. Reception - Admission
      cy.login(accounts.reception, accounts.password);
      cy.get('[data-test-id="patient-full-name"]').type(patient.fullName);
      cy.get('[data-test-id="dob"]').invoke('val', patient.dob).trigger('change');
      cy.get('[data-test-id="gender"]').select(patient.gender);
      cy.get('[data-test-id="national-id"]').type(patient.nationalId);
      cy.get('[data-test-id="phone"]').type(patient.phone);
      cy.get('[data-test-id="address"]').type(patient.address);
      cy.get('[data-test-id="admission-reason"]').type(patient.admissionReason);
      cy.get('[data-test-id="triage-level"]').select(patient.triage);
      cy.get('[data-test-id="initial-department"]').select(patient.initial);
      cy.contains('Admit patient').click();
      cy.verifyCaseDetail();
      cy.contains('Patient admitted').should('be.visible');

      //2. Doctor - Lab Order
      cy.login(accounts.doctor, accounts.password);
      cy.openPatient(patient.fullName);
      cy.get('[data-test-id="lab-priority"]').select('ROUTINE');
      //cy.contains('Lab tests').parent().contains('CBC').click();
      //cy.contains('CBC').find('input[type="checkbox"]').check();
      cy.get('input[type="checkbox"]').check(['CBC', 'CRP']);
      cy.get('[data-test-id="clinical-note"]').type('ghi chú');
      cy.contains('Submit lab order').click();
      cy.contains('LAB_PENDING').should('be.visible');
      cy.contains('Sent to lab').should('be.visible');

      //3. Lab - Delayed Result
      cy.login(accounts.labtech, accounts.password);
      cy.openPatient(patient.fullName);
      cy.get('[data-test-id="result-status"]').select('ABNORMAL');
      cy.get('[data-test-id="result-attachment"]').attachFile('example.txt');
      cy.get('[data-test-id="result-summary"]').type('Bệnh rất nặng, nhập viện gấp');
      cy.get('[data-test-id="btn-publish-result"]').click()
      cy.contains('LAB_RESULTED').should('be.visible'); 
      cy.contains('Lab result published').should('be.visible');

      //4. Doctor - Update Protocol
      cy.login(accounts.doctor, accounts.password);
      cy.wait(3000);
      cy.wait(3000);
      cy.get('[data-test-id="btn-login"]').contains("Login").click({ force: true });
      cy.wait(3000);
      cy.get('[data-test-id="btn-login"]').contains("Login").click({ force: true });
      cy.wait(3000);
      cy.get('[data-test-id="btn-login"]').contains("Login").click({ force: true });
      cy.wait(3000);
       cy.openPatient(patient.fullName);
      cy.get('[data-test-id="diagnosis"]').type('Bệnh tim bẩm sinh');
      cy.get('[data-test-id="protocol-name"]').select('Respiratory Infection Protocol');
      cy.get('[data-test-id="med-name"]').type('paracetamol');
      cy.get('[data-test-id="med-dose"]').type('500mg');
      cy.get('[data-test-id="med-frequency"]').type('Ngày 2 viên, sáng 1, tối 1 sau ăn');
      cy.get('[data-test-id="btn-add-med"]').click();
      cy.get('[data-test-id="med-name"]').type('Anfa');
      cy.get('[data-test-id="med-dose"]').type('50mg');
      cy.get('[data-test-id="med-frequency"]').type('Ngày 2 viên, ngậm');
      cy.get('[data-test-id="btn-add-med"]').click();
      cy.contains('Save protocol').click();
      cy.contains('PROTOCOL_UPDATED').should('be.visible');
      cy.contains('Protocol updated').should('be.visible');

        // 5. Chief - Change Doctor & Lock Record
      cy.login(accounts.chief, accounts.password);
      cy.openPatient(patient.fullName);
      //cy.get('[data-test-id="new-doctor"]').click()
      cy.get('[data-test-id="new-doctor"]').select('Dr. Lan');
      cy.get('[data-test-id="change-reason"]').type('Đổi bác sĩ');
      cy.get('[data-test-id="btn-change-doctor"]').click();
      cy.contains('Doctor reassigned: Dr. Lan').should('be.visible');
      cy.contains('DOCTOR_CHANGED').should('be.visible');
      
      cy.get('[data-test-id="lock-reason"]').type('Đóng');
      cy.get('[data-test-id="lock-confirm"]').check();
      cy.get('[data-test-id="btn-lock-record"]').click();
      cy.contains('RECORD_LOCKED').should('be.visible');
      cy.contains('Medical record locked').should('be.visible');
   });
});