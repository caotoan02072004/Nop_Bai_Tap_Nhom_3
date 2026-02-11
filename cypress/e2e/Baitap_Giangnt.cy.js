describe('CB_01 Lab 120', () => {
   it('Lab 120: Healthcare Expert E2E: Admission -> Lab Orders -> Delayed Results -> Protocol Update -> Doctor Change -> Record Lock', () => {
      cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment')

      //Lễ tân tiếp nhận một bệnh nhân mới.
      cy.get('[data-test-id="username"]').clear().type('reception01');
      cy.get('[data-test-id="password"]').clear().type('Pass1234');
      cy.get('[data-test-id="btn-login"]').click();
      cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 10000 })
         .should('be.visible')
         .and('have.text', 'Reception');
      // Nhập thông tin bệnh nhân
      cy.get('[data-test-id="patient-full-name"]').type('Tom Holland');
      cy.get('[data-test-id="dob"]').clear().type('2008-08-16');
      cy.get('[data-test-id="gender"]').select('Male');
      cy.get('[data-test-id="national-id"]').clear().type('123456789000');
      cy.get('[data-test-id="phone"]').clear().type('0972000000');
      cy.get('[data-test-id="insurance-no"]').clear().type('No 1');
      cy.get('[data-test-id="address"]').clear().type('123 Street');
      cy.get('[data-test-id="admission-reason"]').clear().type('Uncontrolled hypertension');
      cy.get('[data-test-id="triage-level"]').select('Low');
      cy.get('[data-test-id="initial-department"]').select('Cardiology');
      cy.get('[data-test-id="btn-admit"]').click();
      cy.get('[data-test-id="lab-120-admission-status"]', { timeout: 10000 })
         .should('be.visible')
         .and('have.text', 'ADMITTED');
      //Bác sĩ yêu cầu xét nghiệm trong phòng thí nghiệm.
      cy.get('[data-test-id="username"]').clear().type('doctor01');
      cy.get('[data-test-id="password"]').clear().type('Pass1234');
      cy.get('[data-test-id="btn-login"]').click();
      cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 10000 })
         .should('be.visible')
         .and('have.text', 'Doctor');
      //Yêu cầu xét nghiệm
      cy.get('[data-test-id="lab-priority"]').select('ROUTINE');
      cy.get('input[type="checkbox"][value="CRP"]').check();
      cy.get('input[type="checkbox"][value="CRP"]').should('be.checked');
      cy.get('[data-test-id="btn-submit-lab-order"]').click();
      cy.get('[data-test-id="lab-120-admission-status"]', { timeout: 10000 })
         .should('be.visible')
         .and('have.text', 'LAB_PENDING');
      //Phòng thí nghiệm công nghệ công bố kết quả một cách chậm trễ
      cy.get('[data-test-id="username"]').clear().type('labtech01');
      cy.get('[data-test-id="password"]').clear().type('Pass1234');
      cy.get('[data-test-id="btn-login"]').click();
      cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 10000 })
         .should('be.visible')
         .and('have.text', 'LabTech');
      cy.get('[data-test-id="result-status"]').select('ABNORMAL');
      cy.get('[data-test-id="result-summary"]').type('kết quả bất thường');
      cy.get('[data-test-id="btn-publish-result"]').click();
      // Check timeline
      cy.get('[data-test-id="timeline"]')
         .should('contain.text', 'LAB_RESULTED');

      //Bác sĩ cập nhật phác đồ sau khi có kết quả.
      cy.get('[data-test-id="username"]').clear().type('doctor01');
      cy.get('[data-test-id="password"]').clear().type('Pass1234');
      cy.get('[data-test-id="btn-login"]').click();
      cy.wait(300);
      cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 10000 })
         .should('be.visible')
         .and('have.text', 'Doctor');
      cy.get('[data-test-id="btn-login"]').click();
      // Bác sĩ cập nhật phác đồ
      cy.get('[data-test-id="diagnosis"]').type('Chuẩn đoán của bác sĩ', { force: true });
      // cy.get('[data-test-id="diagnosis"]').select('Standard Fever Protocol');
      // cy.get('[data-test-id="btn-save-protocol"]').click();
   })
})
describe("CB_2 - Drag slider to 55", () => {
   it("Drag slider and verify value", () => {
      cy.visit("https://autotestsandbox.com/examples/range-slider-single")
      cy.get('[data-test-id="range-slider-single-primary"]')
         .invoke("val", 55)
         .trigger("input")
         .trigger("change")
      cy.get('[data-test-id="range-slider-single-message"]')
         .should("contain", "55")
   })
});

describe("CB_5 - Static Table", () => {
   it("Highlight row by table name and SKU", () => {
      cy.visit("https://autotestsandbox.com/examples/static-table")
      //Nhập tiêu đề bảng
      cy.get('[data-test-id="static-table-primary"]').clear()
         .type('KHO TIỀN CỦA GG')
      //Nhập SKU cần highlight dòng
      cy.get('[data-test-id="static-table-secondary"]').clear()
         .type('SKU-003')
      // Click button highlight
      cy.get('[data-test-id="static-table-action"]').click()
      // kiểm tra hightlight được hiển thị đúng dòng
      cy.get('tr[data-sku="SKU-003"]')
         .should('contain', 'SKU-003')
         .and('have.class', 'bg-indigo-50')
      //Thông báo hiển thị "Tên bảng" highlighted "tên SKU
      cy.get('[data-test-id="static-table-message"]').should('be.visible')
   })
});