import 'cypress-plugin-tab';

describe('Test Suite: Authentication (Đăng ký & Quên mật khẩu & OTP)', () => {

  // =================================================================
  // PHẦN 1: TRANG ĐĂNG KÝ (REGISTER) - GIỮ NGUYÊN
  // =================================================================
  context('Màn hình Đăng ký (Register)', () => {
    const REGISTER_URL = 'https://beta.cheppy.ai/register';

    beforeEach(() => {
      cy.visit(REGISTER_URL);
      cy.get('input[name="username"], #username').should('be.visible');
    });

    it('Case 5: Kiểm tra điều hướng bàn phím (Tab order & Focus)', () => {
      cy.get('input[name="username"], #username').click();
      cy.focused().should('satisfy', ($el) => $el.attr('name') === 'username');
      
      cy.focused().tab(); 
      cy.focused().should('satisfy', ($el) => $el.attr('name') === 'email' || $el.attr('type') === 'email');
      
      cy.focused().tab(); 
      cy.focused().should('have.attr', 'name', 'password');
      
      cy.focused().tab();
      cy.focused().then(($el) => {
          if ($el.is('button') || $el.find('svg').length > 0 || $el.hasClass('anticon')) { cy.focused().tab(); }
      });

      cy.focused().should('satisfy', ($el) => {
          const name = $el.attr('name');
          return name && (name.includes('confirm') || name.includes('Confirm'));
      });

      cy.focused().tab();
      cy.focused().then(($el) => {
          if ($el.is('button') || $el.find('svg').length > 0 || $el.hasClass('anticon')) { cy.focused().tab(); }
      });

      cy.focused().should('satisfy', ($el) => $el.attr('type') === 'checkbox' || $el.hasClass('ant-checkbox-input'));
      
      cy.focused().tab(); 
      cy.focused().then(($el) => { if ($el.prop('tagName') === 'A') cy.focused().tab(); });
      cy.focused().then(($el) => { if ($el.prop('tagName') === 'A') cy.focused().tab(); });

      cy.focused().should('satisfy', ($el) => {
          return $el.attr('type') === 'submit' || $el.prop('tagName') === 'BUTTON' || $el.hasClass('ant-btn');
      });
    });
  });

  // =================================================================
  // PHẦN 2: TRANG QUÊN MẬT KHẨU (FORGOT PASSWORD) - GIỮ NGUYÊN
  // =================================================================
  context('Màn hình Quên mật khẩu (Forgot Password)', () => {
    
    const SEL = {
        EMAIL_INPUT: 'input[name="email"]', 
        SEND_BTN: 'button[type="submit"]',
    };

    beforeEach(() => {
        cy.intercept('POST', '**/forgot-password').as('forgotAPI');
        cy.visit('https://beta.cheppy.ai/signin');
        cy.contains(/forgot|quên/i).should('be.visible').click();
        cy.get(SEL.EMAIL_INPUT).should('be.visible');
    });

    it('Case 10: Nhập email hợp lệ -> API trả về 200 OK', () => {
        const validEmail = 'hienlocdat@gmail.com'; 
        cy.get(SEL.EMAIL_INPUT).clear().type(validEmail);
        cy.get(SEL.SEND_BTN).click();
        cy.wait('@forgotAPI').its('response.statusCode').should('eq', 200);
    });

    it('Case 11: Nhập email không tồn tại -> API vẫn trả 200 (Bảo mật)', () => {
        const notFoundEmail = 'email_chua_tung_co@cheppy.ai';
        cy.get(SEL.EMAIL_INPUT).clear().type(notFoundEmail);
        cy.get(SEL.SEND_BTN).click();
        cy.wait('@forgotAPI').its('response.statusCode').should('eq', 200);
    });

    it('Case 12: Nhập email sai định dạng -> Báo lỗi Text trên màn hình', () => {
        cy.get(SEL.EMAIL_INPUT).clear().type('email-sai-dinh-dang');
        cy.get(SEL.EMAIL_INPUT).blur(); 
        cy.get(SEL.SEND_BTN).click(); 
        cy.contains(/valid|hợp lệ|định dạng/i).should('be.visible');
    });

    it('Case 13: Để trống email -> Validate chặn API', () => {
        cy.intercept('POST', '**/forgot-password').as('checkCall');

        cy.get(SEL.EMAIL_INPUT).clear();
        cy.get(SEL.EMAIL_INPUT).blur(); 
        cy.get(SEL.SEND_BTN).click();

        cy.wait(1000); 
        cy.get('@checkCall.all').should('have.length', 0);
    });

    it('Case 14: Nhập email có khoảng trắng -> API trả về 200 OK', () => {
        const emailWithSpace = '  hienlocdat@gmail.com  '; 
        cy.get(SEL.EMAIL_INPUT).clear().type(emailWithSpace);
        cy.get(SEL.SEND_BTN).click();
        cy.wait('@forgotAPI').its('response.statusCode').should('eq', 200);
    });
  });

  // =================================================================
  // PHẦN 3: MÀN HÌNH NHẬP OTP (BOX OTP)
  // =================================================================
  context('Màn hình Nhập OTP (Box OTP)', () => {

    const OTP_SEL = {
        // Selector chính xác để không bắt nhầm input Email
        INPUT: 'input[type="tel"], input[type="number"], input[maxlength="6"], input.ant-otp-input',
        CONFIRM_BTN: 'button[type="submit"]',
        RESEND_TXT: /resend|gửi lại/i 
    };

    beforeEach(() => {
        cy.intercept('POST', '**/forgot-password').as('sendEmail');
        
        cy.visit('https://beta.cheppy.ai/signin');
        cy.contains(/forgot|quên/i).click();
        
        cy.get('input[name="email"]').type('hienlocdat@gmail.com');
        cy.get('button[type="submit"]').click();
        
        cy.wait('@sendEmail').its('response.statusCode').should('eq', 200);
        
        // Đợi UI chuyển đổi hoàn toàn sang màn OTP
        cy.wait(1000);
        cy.get(OTP_SEL.INPUT, { timeout: 15000 }).should('exist');
    });

    // =================================================================
  // PHẦN 3: MÀN HÌNH NHẬP OTP (BOX OTP) - FINAL FIX
  // =================================================================
  context('Màn hình Nhập OTP (Box OTP)', () => {

    const OTP_SEL = {
        // [FIX] Selector thông minh: Lấy input đang hiện, TRỪ ô email ra
        INPUT: 'input:not([name="email"]):visible',
        CONFIRM_BTN: 'button[type="submit"]',
        RESEND_TXT: /resend|gửi lại/i 
    };

    beforeEach(() => {
        // --- CHUẨN BỊ ---
        cy.intercept('POST', '**/forgot-password').as('sendEmail');
        
        cy.visit('https://beta.cheppy.ai/signin');
        cy.contains(/forgot|quên/i).click();
        
        // Nhập email thật
        cy.get('input[name="email"]').type('hienlocdat@gmail.com');
        cy.get('button[type="submit"]').click();
        
        // 1. Đợi API báo thành công
        cy.wait('@sendEmail').its('response.statusCode').should('eq', 200);
        
        cy.contains(/OTP|code|mã/i, { timeout: 15000 }).should('be.visible');

        // 3. Lúc này mới tìm input OTP
        cy.get(OTP_SEL.INPUT, { timeout: 10000 }).should('exist');
    });

    // --- CASE 19: KHÔNG ĐỦ KÝ TỰ ---
    it('Case 19: OTP không đủ ký tự -> Báo lỗi', () => {
        // Nhập 3 số
        cy.get(OTP_SEL.INPUT).first().clear().type('123');
        
        // Click Submit (Force để tránh việc nút bị disable nhẹ)
        cy.get(OTP_SEL.CONFIRM_BTN).click({ force: true });

        // Check text lỗi
        cy.contains(/digits|số|valid|đủ|length/i).should('be.visible');
    });

    // --- CASE 21: ĐỂ TRỐNG ---
    it('Case 21: Để trống OTP -> Báo lỗi Required', () => {
        // Clear input
        cy.get(OTP_SEL.INPUT).first().clear();
        
        // [FIX] Blur (click ra ngoài) để trigger validate của Ant Design
        cy.get(OTP_SEL.INPUT).first().blur(); 
        
        // Click Submit
        cy.get(OTP_SEL.CONFIRM_BTN).click({ force: true });
        
        // Tìm lỗi "Required" hoặc "Nhập mã"
        cy.contains(/enter|nhập|required|trống/i).should('be.visible');
    });

  });

  });

});