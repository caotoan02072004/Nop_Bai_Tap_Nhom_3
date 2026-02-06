describe('template spec', () => {
  it('Lab 120: Healthcare Expert E2E', () => {
    cy.visit('https://autotestsandbox.com/labs/healthcare-multi-stage-treatment')

    /*Lễ tân tiếp nhận một bệnh nhân mới.*/
    // Lễ tân đăng nhập
    cy.get('[data-test-id="username"]').clear().type('reception01');
    cy.get('[data-test-id="password"]').clear().type('Pass1234');
    cy.get('[data-test-id="btn-login"]').click();
    cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 20000 })
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
    cy.get('[data-test-id="lab-120-admission-status"]', { timeout: 20000 })
      .should('be.visible')
      .and('have.text', 'ADMITTED');
    /*Bác sĩ yêu cầu xét nghiệm trong phòng thí nghiệm.*/
    //Bác sĩ đăng nhập 
    cy.get('[data-test-id="username"]').clear().type('doctor01');
    cy.get('[data-test-id="password"]').clear().type('Pass1234');
    cy.get('[data-test-id="btn-login"]').click();
    cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 20000 })
      .should('be.visible')
      .and('have.text', 'Doctor');
    //Yêu cầu xét nghiệm
    cy.get('[data-test-id="lab-priority"]').select('ROUTINE');
    cy.get('input[type="checkbox"][value="CRP"]').check();
    cy.get('input[type="checkbox"][value="CRP"]').should('be.checked');
    cy.get('[data-test-id="btn-submit-lab-order"]').click();
    cy.get('[data-test-id="lab-120-admission-status"]', { timeout: 20000 })
      .should('be.visible')
      .and('have.text', 'LAB_PENDING');
    // Check timeline
    //       cy.get('[data-test-id="timeline-row-1"]')
    // .should('contain.text', 'LAB_PENDING');
    /*Phòng thí nghiệm công nghệ công bố kết quả một cách chậm trễ.*/
    // Phòng thí nghiệm đăng nhập labtech01
    cy.get('[data-test-id="username"]').clear().type('labtech01');
    cy.get('[data-test-id="password"]').clear().type('Pass1234');
    cy.get('[data-test-id="btn-login"]').click();
    cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 20000 })
      .should('be.visible')
      .and('have.text', 'LabTech');
    cy.get('[data-test-id="result-status"]').select('ABNORMAL');
    cy.get('[data-test-id="result-summary"]').type('kết quả bất thường');
    cy.get('[data-test-id="btn-publish-result"]').click();
    // Check timeline
    cy.get('[data-test-id="timeline"]')
      .should('contain.text', 'LAB_RESULTED');

    /*Bác sĩ cập nhật phác đồ sau khi có kết quả.*/
    //Bác sĩ đăng nhập 
    cy.get('[data-test-id="username"]').clear().type('doctor01');
    cy.get('[data-test-id="password"]').clear().type('Pass1234');
    cy.get('[data-test-id="btn-login"]').click();
    cy.wait(300);

    cy.get('[data-test-id="lab-120-role-badge"]', { timeout: 20000 })
      .should('be.visible')
      .and('have.text', 'Doctor');
    cy.get('[data-test-id="btn-login"]').click();
    // Bác sĩ cập nhật phác đồ
    cy.get('[data-test-id="diagnosis"]').type('Chuẩn đoán của bác sĩ', { force: true });
    // cy.get('[data-test-id="diagnosis"]').select('Standard Fever Protocol');
    // cy.get('[data-test-id="btn-save-protocol"]').click();
  })
})
describe('Kéo slider lên 55%', () => {
  it('Kéo  slider tới giá trị 55 %', () => {
    cy.visit('https://autotestsandbox.com/examples/range-slider-single');

    const slider = '[data-test-id="range-slider-single-primary"]';
    const number = '[data-test-id="range-slider-single-secondary"]';
    const applyBtn = '[data-test-id="range-slider-single-action"]';

    // 1) Kéo/đặt slider lên 55
    cy.get(slider)
      .should('be.visible')
      .invoke('val', 55)
      .trigger('input', { force: true })
      .trigger('change', { force: true });

    // 2) Kiểm tra giá trị sau khi kéo (sync với ô số)
    cy.get(number).should('have.value', '55');

    // 3) Apply  và verify % giá trị hiển thị
    cy.get(applyBtn).click();

    // Verify có hiển thị "55%" ở khu vực sandbox
    cy.contains('55').should('be.visible');
  });
});
describe('Lab 075 - kiểm tra bounding box overlay', () => {
  it('Kiểm tra bouding', () => {
    cy.visit('https://autotestsandbox.com/labs/canvas-drawing-and-bounding-box-overlay');

    const sandbox = '[data-test-id="lab-075-sandbox"]';
    const drawBtn = '[data-test-id="lab-075-draw"]';
    const toggleBtn = '[data-test-id="lab-075-toggle"]';
    const canvas = '[data-test-id="lab-075-canvas"]';
    const boxes = '[data-test-id="lab-075-boxes"]';
    const status = '[data-test-id="lab-075-status"]';

    /* ---------- Lưu lại canvas trước khi click button---------- */
    cy.get(canvas).then(($cvs) => {
      const before = $cvs[0].toDataURL();
      cy.wrap(before).as('canvasBefore');
    });
    //Click Draw canvas 
    cy.get(drawBtn).should('be.visible').click();
    //Kiểm tra thay đổi sau click
    cy.get('@canvasBefore').then((before) => {
      cy.get(canvas).then(($cvs) => {
        const after = $cvs[0].toDataURL();
        expect(after).to.not.equal(before);
      });
    });
    //Click Toggle boxes
    cy.get(toggleBtn).should('be.visible').click();

    // Kiểm tra hiển thị bounding box overlay
    cy.get(boxes)
      .should('be.visible')
      .and('have.css', 'pointer-events', 'none')
      .and('have.css', 'position', 'absolute');
    // Có ít nhất 1 bounding box
    cy.get(`${boxes} > div`)
      .should('have.length.at.least', 1)
      .each(($box) => {
        cy.wrap($box)
          .should('have.css', 'border-style', 'solid')
          .and('have.css', 'position', 'absolute');
      });
    // Kiểm tra status hiển thị đúng 
    cy.get(status)
      .should('have.attr', 'role', 'status')
      .and('be.visible')
      .and('contain.text', 'Bounding boxes visible');
  });
});

describe('Static Table', () => {
  it('Nhập tên bảng + SKU, highlight đúng dòng và hiện thông báo đúng', () => {
    cy.visit('https://autotestsandbox.com/examples/static-table')
    const tableTitle = 'Uno test'
    const skuToHighlight = 'SKU-004'
    // Nhập thông tin bảng
    cy.get('[data-test-id="static-table-primary"]').clear().type(tableTitle).should('have.value', tableTitle);
    // Nhập SKU cần highlight
    cy.get('[data-test-id="static-table-secondary"]').clear().type(skuToHighlight).should('have.value', skuToHighlight)
    // Click highlight
    cy.get('[data-test-id="static-table-action"]').click()
    // ===== Verify highlight đúng dòng =====
    //check đúng row có class highlight (theo mẫu đang dùng bg-indigo-50 hoặc dark:bg-indigo-900/30)
    cy.get(`tr[data-sku="${skuToHighlight}"]`)
      .should('exist')
      .and('have.class', 'bg-indigo-50')
    // Verify các dòng khác không bị highlight
    cy.get('tbody tr')
      .not(`tr[data-sku="${skuToHighlight}"]`)
      .should('not.have.class', 'bg-indigo-50')
    // Yêu cầu:Hiển thị đúng "Tên bảng highlighted tên SKU"
    cy.get('[data-test-id="static-table-message"]')
      .should('be.visible')
      .and('contain', `${tableTitle} highlighted ${skuToHighlight}`)
  })
})
describe('Lab 091 ', () => {
  it('Kiểm tra load trang PASS khi giá trị load time <= 2000ms', () => {
    cy.visit('https://autotestsandbox.com/labs/first-page-load-under-2-seconds');

    const measureBtn = '[data-test-id="lab-091-measure"]';
    const timeEl = '[data-test-id="lab-091-time"]';
    const KetquaE1 = '[data-test-id="lab-091-result"]';
    const MAX_RETRIES = 5; // sau 5 lần mà chưa được kết quả <2s thì test fail
    const GT_Pass = 2000;
    /* Tạo hàm DoPasss: Đo load time =>>>Nếu PASS -> dừng =>>> Nếu FAIL ->tự gọi lại chính nó với attempt + 1 =>>>Dừng khi đạt MAX_RETRIES */
    const ĐoPass = (attempt = 1) => { 
      cy.log(`Measure attempt ${attempt}/${MAX_RETRIES}`); // log lại những lần vượt >2s để tính số lần fail 
      cy.get(measureBtn).should('be.visible').click(); // trước khi click chắc chăn button đã xuất hiện
      cy.get(timeEl).should('be.visible').invoke('text').then((t) => {
        /*Chờ UI render xong =>Lấy text thực tế như user thấy*/
        const match = t.match(/(\d+)\s*ms/i); // Validate thông tin lấy được thành 2 group số ... ms
        expect(match, `Time text must contain milliseconds. Got: "${t}"`).to.not.be.null;

        const ms = Number(match[1]); // Lấy chuỗi số 1 từ thông tin tách được ( số)
        cy.log(`Measured: ${ms} ms`);
        // So sánh ms-là số lấy được với GT pass 
        if (ms <= GT_Pass) { // PASS
          cy.get(KetquaE1)
            .should('be.visible')
            .and('have.text', 'Pass');
          // Check Style của text kết quả
          // .and('have.class', 'bg-emerald-200')
          // .and('have.class', 'text-emerald-800');
        } else {
          if (attempt < MAX_RETRIES) { // số lần faill nhỏ hơn số lượt qy định vẫn tiếp tục chạy hàm
            ĐoPass(attempt + 1);
          } else {
            throw new Error( // render ra dòng báo fail cụ thể
              `Load time still > ${GT_Pass}ms after ${MAX_RETRIES} attempts. Last measured: ${ms}ms`
            );
          }
        }
      });
    };

    ĐoPass();
  });
});
