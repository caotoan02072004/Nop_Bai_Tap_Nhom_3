describe('CB1_Lab 115: Education E2E', () => {
  let data

  before(() => {
    cy.fixture('lab115').then((fixtureData) => {
      data = fixtureData
    })
  })

  it('Lab 115_Education E2E', () => {
    cy.visit('https://autotestsandbox.com/labs/education-course-management-learning-certification')
    cy.get('[data-test-id="lab-115-reset"]').click();

    const name = data.student.name
    const email = data.student.email
    const method = data.payment.method
    const score = data.exam.score

    //----*** Giáo viên đăng nhập data-test-id="lab-115-login-instructor"
    cy.get('[data-test-id="lab-115-login-instructor"]').click();
    //check role
    cy.get('[data-test-id="lab-115-user-badge"]').should('be.visible').and('have.text', 'Instructor')
    //Nhâp liệu
    cy.get('[data-test-id="lab-115-course-name"]').type(data.course.name);
    cy.get('[data-test-id="lab-115-course-description"]').type(data.course.description);
    cy.get('[data-test-id="lab-115-course-category"]').select(data.course.category);
    cy.get('[data-test-id="lab-115-duration-hours"]').clear().type(data.course.durationHours);
    cy.get('[data-test-id="lab-115-tuition-fee"]').clear().type(data.course.tuitionFee);
    //lưu tạm
    cy.get('[data-test-id="lab-115-btn-save"]').click();
    cy.get('[data-test-id="lab-115-course-status"]').should('be.visible').and('have.text', 'DRAFT')
    //publish
    cy.get('[data-test-id="lab-115-btn-publish"]').click();
    cy.get('[data-test-id="lab-115-course-status"]').should('be.visible').and('have.text', 'PUBLISHED')

    //---*** Sinh viên đăng ký khóa học  Student
    //SV đăng nhập
    cy.get('[data-test-id="lab-115-login-student"]').click();
    cy.get('[data-test-id="lab-115-user-badge"]').should('be.visible').and('have.text', 'Student')
    // SV đăng ký
    cy.get('[data-test-id="lab-115-student-name"]').type(name);
    cy.get('[data-test-id="lab-115-student-email"]').type(email);
    cy.get('[data-test-id="lab-115-btn-enroll"]').click();
    // check stt theo bước và thông tin hiển thị như đã nhập
    cy.get('[data-test-id="lab-115-course-status"]')
      .should('be.visible')
      .and('have.text', 'ENROLLED')
    cy.get('[data-test-id="lab-115-student-summary"]')
      .should('be.visible')
      .and('have.text', `${name} (${email})`)
    // Thanh toán khóa học
    cy.get('[data-test-id="lab-115-payment-method"]').select(method);
    cy.get('[data-test-id="lab-115-tuition-fee"]')
      .invoke('val')
      .then((fee) => {
        cy.get('[data-test-id="lab-115-pay-amount"]')
          .clear()
          .type(fee)
          .should('have.value', fee)
      });
    cy.get('[data-test-id="lab-115-btn-pay"]').click();
    // Check lại thông tin sau khi thanh toán
    cy.get('[data-test-id="lab-115-tuition-fee"]')
      .invoke('val')
      .then((fee) => {

        // format tiền: 2999000 → 2,999,000
        const formattedFee = Number(fee).toLocaleString('en-US')

        // 1. Course status
        cy.get('[data-test-id="lab-115-course-status"]')
          .should('have.text', 'PAID')

        // 2. Class status
        cy.get('[data-test-id="lab-115-class-status"]')
          .should('have.text', 'READY_TO_OPEN')

        // 3. Student
        cy.get('[data-test-id="lab-115-student-summary"]')
          .should('have.text', `${name} (${email})`)

        // 4. Payment
        cy.get('[data-test-id="lab-115-payment-summary"]')
          .should('have.text', `${method} - ${formattedFee} VND`)
      })

    //---*** Quản trị viên mở lớp học
    // Admin Đăng nhập
    cy.get('[data-test-id="lab-115-login-admin"]').click();
    cy.get('[data-test-id="lab-115-user-badge"]').should('be.visible').and('have.text', 'Admin')
    // Check trạng thái
    cy.get('[data-test-id="lab-115-course-status"]').should('contain.text', 'PAID')
    cy.get('[data-test-id="lab-115-class-status"]').should('contain.text', 'READY_TO_OPEN')
    cy.get('[data-test-id="lab-115-student-summary"]').should('contain.text', `${name} (${email})`)
    cy.get('[data-test-id="lab-115-payment-summary"]').should('contain.text', 'CASH')
    // Mở lớp
    cy.get('[data-test-id="lab-115-btn-open-class"]').click();
    // Check time line status sau mở lớp
    cy.get('[data-test-id="lab-115-course-status"]').should('contain.text', 'CLASS_OPEN')
    cy.get('[data-test-id="lab-115-class-status"]').should('contain.text', 'OPEN')
    cy.get('[data-test-id="lab-115-student-summary"]').should('contain.text', `${name} (${email})`)
    cy.get('[data-test-id="lab-115-payment-summary"]').should('contain.text', 'CASH')

    //---**** Học sinh vào học bài và làm  bài kiểm tra
    cy.get('[data-test-id="lab-115-login-student"]').click();
    cy.get('[data-test-id="lab-115-user-badge"]').should('be.visible').and('have.text', 'Student')
    // Bắt đầu học
    cy.get('[data-test-id="lab-115-btn-start-learning"]').click();
    cy.get('[data-test-id="lab-115-course-status"]').should('contain.text', 'IN_PROGRESS');
    //-bài 1
    cy.get('[data-test-id="lab-115-lesson-L1"]').click();
    cy.get('[data-test-id="lab-115-lesson-L1"]')
      .should('be.disabled')
      .and('have.text', 'Completed')
    //- bài 2
    cy.get('[data-test-id="lab-115-lesson-L2"]').click();
    cy.get('[data-test-id="lab-115-lesson-L2"]')
      .should('be.disabled')
      .and('have.text', 'Completed')
    //- bài 3
    cy.get('[data-test-id="lab-115-lesson-L3"]').click();
    cy.get('[data-test-id="lab-115-lesson-L3"]')
      .should('be.disabled')
      .and('have.text', 'Completed')
    // Kết quả bài kiểm tra
    cy.get('[data-test-id="lab-115-exam-score"]').type(score);
    cy.get('[data-test-id="lab-115-btn-submit-exam"]').click();
    cy.get('[data-test-id="lab-115-exam-score"]')
      .invoke('val')
      .then((value) => {

        // check input đúng giá trị
        expect(value).to.eq(score)

        // check kết quả hiển thị bên dưới
        cy.contains(/Result:/)
          .should('contain.text', value)
      })
    //EXAM_PASSED
    cy.get('[data-test-id="lab-115-course-status"]').should('contain.text', 'EXAM_PASSED');
    //---*** Quản trị viên cấp chứng chỉ
    // Đăng nhập
    cy.get('[data-test-id="lab-115-login-admin"]').click();
    cy.get('[data-test-id="lab-115-user-badge"]').should('be.visible').and('have.text', 'Admin')
    // Cấp chứng chỉ
    cy.get('[data-test-id="lab-115-btn-issue-certificate"]').click();
    cy.get('[data-test-id="lab-115-certificate-link"]')
      .invoke('text')
      .then((cert) => {
        expect(cert.trim()).to.match(/^CERT-/)
      })

    cy.get('[data-test-id="lab-115-btn-issue-certificate"]')
      .should('be.disabled');

    //---*** Check Time line hiển thị đúng thứ tự

    cy.get('[data-test-id="lab-115-tuition-fee"]')
      .invoke('val')
      .then((fee) => {
        const formattedFee = Number(fee).toLocaleString('en-US')

        cy.get('[data-test-id="lab-115-timeline"]').within(() => {

          cy.contains('Admin | ISSUE_CERTIFICATE | Note: CERT-115-0001')

          cy.contains(`Student | EXAM_PASSED | Note: Score ${score}`)

          cy.contains(`Student | LESSON_COMPLETED | Note: Lesson 3: Review`)
          cy.contains(`Student | LESSON_COMPLETED | Note: Lesson 2: Practice`)
          cy.contains(`Student | LESSON_COMPLETED | Note: Lesson 1: Foundations`)

          cy.contains(`Student | START_LEARNING`)
          cy.contains(`Admin | OPEN_CLASS`)

          cy.contains(`Student | PAY_TUITION | Note: ${method} ${formattedFee} VND`)

          cy.contains(`Student | ENROLL | Note: ${name}`)

          cy.contains(`Instructor | PUBLISH_COURSE`)
          cy.contains(`Instructor | SAVE_DRAFT`)
        })
      })
  })
})

describe('CB_2 - Slider min/max', () => {
  it('Set slider giá trị = 97 và check giá trị hiển thị cùng validate', () => {
    cy.visit('https://autotestsandbox.com/labs/slider-minimum-and-maximum-value');

    const value = 97;

    cy.get('[data-test-id="lab-017-slider"]')
      .invoke('val', value)
      .trigger('input');

    // Verify value
    cy.get('[data-test-id="lab-017-value"]')
      .should('have.text', `${value}`);

    // Verify chip trạng thái
    cy.get('[data-test-id="lab-017-range-chip"]')
      .should('contain.text', 'Outside target');

    // Validate
    cy.get('[data-test-id="lab-017-validate"]').click();

    // Verify status message đúng theo UI thực tế
    cy.get('[data-test-id="lab-017-status"]')
      .should('contain.text', 'Value must be between 20 and 80');
  });
});

describe('CB_3_Toast Queue', () => {
 it('Nhập nội dung, nhập delay và kiểm tra trạng thái hiển thị toast', () => {
    cy.visit('https://autotestsandbox.com/examples/toast-queue')

    const message = 'Toast here'
    const delay = '5000'

    cy.get('[data-test-id="toast-queue-primary"]').clear().type(message)
    cy.get('[data-test-id="toast-queue-secondary"]').clear().type(delay)
    cy.get('[data-test-id="toast-queue-action"]').click()

    // Kiểm tra trạng thái queue/message
    cy.get('[data-test-id="toast-queue-message"]')
      .should('contain.text', `Showing: ${message}`)

    // Kiểm tra toast xuất hiện trong stack
  cy.get('#queue-stack')
  .should('exist')
  .and('contain.text', message)

    // Kiểm tra toast biến mất sau delay
    cy.wait(Number(delay))
    cy.get('#queue-stack')
      .should('not.contain.text', message)
  })
});

describe('TB_4_Shadow DOM Nested', () => {
  const getInnerShadow = () => {
    return cy.get('#nested-shadow-host')
      .shadow()
      .find('#inner-shadow-host')
      .shadow()
  }

  it('Verify alert hiển thị khớp với giá trị nhập và trạng thái message đúng', () => {
    cy.visit('https://autotestsandbox.com/examples/shadow-dom-nested')

    const primary = 'Meo Uno'
    const secondary = 'Tester'

    getInnerShadow()
      .find('[data-test-id="shadow-dom-nested-primary"]')
      .should('be.visible')
      .type(primary)
      .should('have.value', primary)

    getInnerShadow()
      .find('[data-test-id="shadow-dom-nested-secondary"]')
      .should('be.visible')
      .type(secondary)
      .should('have.value', secondary)

    getInnerShadow()
      .find('[data-test-id="shadow-dom-nested-action"]')
      .should('be.visible')
      .click()

    getInnerShadow()
      .find('[data-test-id="shadow-dom-nested-message"]')
      .should('contain.text', primary)
      .and('contain.text', secondary)
      .and('have.text', `Nested shadow submit: ${primary} / ${secondary}`)
  })
})


describe('K_5_Lab 123 - Math CAPTCHA (Basic)', () => {
  it('Nhập kết quả đúng để bypass captcha', () => {
    cy.visit('https://autotestsandbox.com/labs/captcha-math-basic')

    cy.get('[data-test-id="lab-123-challenge"]')
      .should('not.contain.text', 'Loading')
      .invoke('text')
      .then((text) => {
        const cleanText = text.replace('Solve:', '').trim()
        const parts = cleanText.split(/\s+/)

        expect(parts, 'challenge phải có 3 phần tử').to.have.length(3)

        const x = Number(parts[0])
        const op = parts[1]
        const y = Number(parts[2])

        const answer =
          op === '+' ? x + y :
          op === '-' ? x - y :
          op === '*' ? x * y :
          x / y

        cy.get('[data-test-id="lab-123-answer"]')
          .clear()
          .type(`${answer}`)
      })

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('Passed')
    })

    cy.get('[data-test-id="lab-123-verify"]').click()
  })
})

