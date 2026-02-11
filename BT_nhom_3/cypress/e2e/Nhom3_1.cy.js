describe('BTVN_Nhóm 3', () => {
  it('CB_1-Lab 120: Healthcare Expert E2E', () => {
    cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment');
    cy.get('[data-test-id="username"]').clear().type('reception01');
    cy.get('[data-test-id="password"]').clear().type('Pass1234');
    cy.get('button[data-test-id="btn-login"]').click();
    cy.get('[data-test-id="lab-120-role-badge"]').should('contain', 'Reception');// Dang nhap le tan
    cy.get('[data-test-id="patient-full-name"]').type('Tom Holland');
    cy.get('[data-test-id="dob"]').type('2008-08-16');
    cy.get('[data-test-id="gender"]').select('Male');
    cy.get('[data-test-id="national-id"]').type('123456789000');
    cy.get('[data-test-id="phone"]').type('0972000000');
    cy.get('[data-test-id="address"]').type('No 1, 123 Street');
    cy.get('[data-test-id="admission-reason"]').type('Uncontrolled hypertension');
    cy.get('[data-test-id="triage-level"]').select('Low');
    cy.get('[data-test-id="initial-department"]').select('Cardiology');// Nhap thong tin benh nhan
    cy.get('button[data-test-id="btn-admit"]').click();// Nhan Admit patient
    cy.get('[data-test-id="lab-120-admission-status"]').should('contain', 'ADMITTED');
    cy.get('[data-test-id="lab-120-lab-status"]').should('contain', 'ADMITTED');
    cy.get('[data-test-id="case-status"]').should('contain', 'ADMITTED');//Cap nhat trang thai tuong ung
    cy.get('[data-test-id="timeline"]').should('contain.text', 'ADMITTED');// check timeline
    cy.get('[data-test-id="username"]').clear().type('doctor01');
    cy.get('[data-test-id="password"]').clear().type('Pass1234');
    cy.get('button[data-test-id="btn-login"]').click();
    cy.get('[data-test-id="lab-120-role-badge"]').should('contain', 'Doctor');// Dang nhap bac si
    cy.get('[data-test-id="lab-priority"]').select('ROUTINE');
    cy.get('input[type="checkbox"][value="CBC"]').check().should('be.checked');// Bác sĩ chỉ định xét nghiệm (nhập form Lab order)
    cy.get('button[data-test-id="btn-submit-lab-order"]').click(); //Nhấn Submit lad order
    cy.get('[data-test-id="lab-120-admission-status"]').should('contain', 'LAB_PENDING');
    cy.get('[data-test-id="lab-120-lab-status"]').should('contain', 'LAB_PENDING');
    cy.get('[data-test-id="case-status"]').should('contain', 'LAB_PENDING');//Cap nhat trang thai tuong ung
    cy.get('[data-test-id="timeline"]').should('contain.text', 'LAB_PENDING');// check timeline
    cy.get('[data-test-id="username"]').clear().type('labtech01');
    cy.get('[data-test-id="password"]').clear().type('Pass1234');
    cy.get('button[data-test-id="btn-login"]').click();
    cy.get('[data-test-id="lab-120-role-badge"]').should('contain', 'LabTech');// Dang nhap Phong thi nghiem
    cy.get('[data-test-id="result-status"]').select('NORMAL');
    cy.get('[data-test-id="result-attachment"]').selectFile('cypress/fixtures/Filedinhkem.pdf');
    cy.get('[data-test-id="result-summary"]').type('Suy nhược cơ thể');//Nhập thông tin công bố kết quả
    cy.get('button[data-test-id="btn-publish-result"]').click();//Nhấn Publish result
    cy.get('[data-test-id="lab-120-admission-status"]').should('contain', 'LAB_RESULTED');
    cy.get('[data-test-id="lab-120-lab-status"]', { timeout: 20000 }).should('contain', 'LAB_RESULTED');
    cy.get('[data-test-id="case-status"]').should('contain', 'LAB_RESULTED');//Cap nhat trang thai tuong ung
    cy.get('[data-test-id="timeline"]').should('contain.text', 'LAB_RESULTED');// check timeline
    cy.get('[data-test-id="username"]').clear().type('doctor01');
    cy.get('[data-test-id="password"]').clear().type('Pass1234');
    cy.get('button[data-test-id="btn-login"]').click();
    cy.get('[data-test-id="lab-120-role-badge"]').should('contain', 'Doctor');// Dang nhap bac si
    // cy.get('[data-test-id="diagnosis"]').should('be.enabled');///////SAI
    // cy.get('[data-test-id="diagnosis"]').type('Bổ sung thuốc vitamin');
    // cy.get('[data-test-id="protocol-name"]').select('Standard Fever Protocol');
    // cy.get('[data-test-id="med-name"]').type('vitamin B1');
    // cy.get('[data-test-id="med-dose"]').type('10 viên');
    // cy.get('[data-test-id="med-frequency"]').type('S1, T1, sau ăn');
    // cy.get('button[data-test-id="btn-add-med"]').click();
    // cy.get('[data-test-id="med-row-0"]').should('be.visible');// Nhập khung Protocol update
    // cy.get('button[data-test-id="btn-save-protocol"]').click();//Nhấn Save protocol
    // cy.get('[data-test-id="lab-120-admission-status"]').should('contain','PROTOCOL_UPDATED');
    // cy.get('[data-test-id="lab-120-lab-status"]').should('contain','PROTOCOL_UPDATED');
    // cy.get('[data-test-id="case-status"]').should('contain','PROTOCOL_UPDATED');//Cap nhat trang thai tuong ung
    // cy.get('[data-test-id="username"]').clear().type('chief01');
    // cy.get('[data-test-id="password"]').clear().type('Pass1234');
    // cy.get('button[data-test-id="btn-login"]').click();
    // cy.get('[data-test-id="lab-120-role-badge"]').should('contain', 'ChiefDoctor');// Dang nhap bac si
    // cy.get('[data-test-id="new-doctor"]').select('Dr.Lan');
    // cy.get('[data-test-id="change-reason"]').type('Thay đổi bác sĩ');////Phân công lại bsi 
    // cy.get('button[data-test-id="btn-change-doctor"]').click();//Nhấn Change doctor
    // cy.get('[data-test-id="lab-120-admission-status"]').should('contain','DOCTOR_CHANGED');
    // cy.get('[data-test-id="lab-120-lab-status"]').should('contain','DOCTOR_CHANGED');
    // cy.get('[data-test-id="case-status"]').should('contain','DOCTOR_CHANGED');//Cap nhat trang thai tuong ung
    // cy.get('[data-test-id="lock-reason"]').type('Khóa hồ sơ');
    // cy.get('[data-test-id="lock-confirm"]').check().should('be.checked');//Nhập thông tin khóa hồ sơ
    // cy.get('button[data-test-id="btn-lock-record"]').click();//Nhấn Lock record
    // cy.get('[data-test-id="lab-120-admission-status"]').should('contain','RECORD_LOCKED');
    // cy.get('[data-test-id="lab-120-lab-status"]').should('contain','RECORD_LOCKED');
    // cy.get('[data-test-id="case-status"]').should('contain','RECORD_LOCKED');//Cap nhat trang thai tuong ung
  });
  it('CB_2-Drag to 55', () => {
    cy.visit('https://autotestsandbox.com/examples/range-slider-single');
    cy.get('input[data-test-id="range-slider-single-primary"]').should('be.visible')
      .invoke('val', 55)
      .trigger('input')
      .trigger('change');
    cy.get('[data-test-id="range-slider-single-primary"]').should('have.value', '55');
    cy.get('[data-test-id="range-slider-single-secondary"]').should('have.value', '55');
  })

  it("Drawn Canvas and toggle boxes", () => {
    cy.visit("https://autotestsandbox.com/labs/canvas-drawing-and-bounding-box-overlay")
    cy.get('[data-test-id="lab-075-draw"]').click()
    cy.get('[data-test-id="lab-075-status"]').should('be.visible')
    cy.get('[data-test-id="lab-075-toggle"]').click()
    cy.get('[data-test-id="lab-075-status"]').should("be.visible")
  })
  it('CB_5-Static Table', () => {
    cy.visit("https://autotestsandbox.com/examples/static-table")
    cy.get('[data-test-id="static-table-primary"]').clear().type('HOANGHA STORE')
    cy.get('[data-test-id="static-table-secondary"]').clear().type('SKU-001')//Nhap dong can highlight
    cy.get('[data-test-id="static-table-action"]').click()//Nhan hightlight
    cy.get('tr[data-sku="SKU-001"]')
      .should('contain', 'SKU-001')
      .and('have.class', 'bg-indigo-50')
    cy.get('[data-test-id="static-table-message"]').should('be.visible')
  })
})