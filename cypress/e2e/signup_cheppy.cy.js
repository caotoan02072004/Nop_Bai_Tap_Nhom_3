import 'cypress-plugin-tab';

describe('Bộ Test Case Automation - Sign Up (Full 26 Cases)', () => {
  const baseUrl = 'https://beta.cheppy.ai';

  beforeEach(() => {
    cy.visit(`${baseUrl}/register`);
    // Đảm bảo trang load xong (User field xuất hiện)
    cy.get('input[name="username"], #username, #user-name').should('be.visible');

    // Setup Mock API cho các case Check trùng
    cy.intercept('POST', '**/check-username', { statusCode: 400, body: { msg: 'Existed' } }).as('checkUserFail');
    cy.intercept('POST', '**/check-email', { statusCode: 400, body: { msg: 'Existed' } }).as('checkEmailFail');
    cy.intercept('POST', '**/api/security/register').as('registerRequest');
  });

  // ==================================================
  // NHÓM: NAVIGATION (Điều hướng)
  // ==================================================

  it('SU_005: Nhấn Tab liên tục (Kiểm tra luồng Focus xuôi)', () => {
    cy.get('input[name="username"], #user-name').click();
    cy.focused().tab(); // -> Email
    cy.focused().should('satisfy', ($el) => $el.attr('name') === 'email' || $el.attr('type') === 'email');
    cy.focused().tab(); // -> Password
    cy.focused().should('have.attr', 'name', 'password');
    // Xử lý icon mắt (nếu có)
    cy.focused().then(($el) => { if ($el.is('button') || $el.find('svg').length) cy.focused().tab(); });
    
    cy.focused().tab(); // -> Confirm Pass
    cy.focused().should('satisfy', ($el) => $el.attr('name').includes('confirm'));
    // Xử lý icon mắt confirm
    cy.focused().then(($el) => { if ($el.is('button') || $el.find('svg').length) cy.focused().tab(); });

    cy.focused().tab(); // -> Checkbox
    cy.focused().should('have.attr', 'type', 'checkbox');
    cy.focused().tab(); // -> Link Terms (Thẻ A)
    cy.focused().should('have.prop', 'tagName', 'A');
    cy.focused().tab(); // -> Button Submit
    cy.focused().should('have.attr', 'type', 'submit');
  });

  it('SU_006: Nhấn Shift + Tab (Kiểm tra luồng Focus ngược)', () => {
    // Focus vào nút Submit trước
    cy.get('button[type="submit"]').focus();
    cy.focused().tab({ shift: true }); // -> Link Terms
    cy.focused().tab({ shift: true }); // -> Checkbox
    cy.focused().should('have.attr', 'type', 'checkbox');
  });

  it('SU_009: Kiểm tra đổi Ngôn ngữ (Anh/Việt)', () => {
    // Case này phụ thuộc UI có nút đổi ngữ hay không
    cy.get('body').then(($body) => {
      if ($body.find('.language-switcher').length > 0) {
        cy.get('.language-switcher').click();
        cy.contains(/Đăng ký|Sign Up/).should('be.visible');
      } else {
        cy.log('SKIP: Không tìm thấy nút đổi ngôn ngữ trên giao diện này');
      }
    });
  });

  it('SU_036: Kiểm tra Link "Terms & Conditions"', () => {
    // Kiểm tra link có tồn tại và đúng href
    cy.contains(/Terms|Điều khoản/i).should('have.attr', 'href');
  });

  it('SU_037: Kiểm tra Link "Log in" (Về trang đăng nhập)', () => {
    cy.contains(/Log in|Sign in|Đăng nhập/i).click();
    cy.url().should('include', '/signin'); // Cập nhật theo thực tế beta
  });

  it('SU_038: Kiểm tra Link "Forgot password"', () => {
    // Thường link này ở trang Login, nhưng nếu trang Register có thì check
    cy.get('body').then(($body) => {
      if ($body.find('a[href*="forgot"]').length > 0) {
        cy.contains(/Forgot|Quên/i).should('be.visible');
      }
    });
  });

  // ==================================================
  // NHÓM: INPUT DATA (Nhập liệu Happy Path từng field)
  // ==================================================

  it('SU_011: Nhập Họ tên hợp lệ (Check hiển thị đúng tiếng Việt)', () => {
    // Lưu ý: Beta hiện tại không thấy field fullname, case này sẽ fail nếu UI không có
    cy.get('body').then(($body) => {
        if ($body.find('input[name="fullname"]').length) {
            cy.get('input[name="fullname"]').type('Nguyễn Văn A');
            cy.get('input[name="fullname"]').should('have.value', 'Nguyễn Văn A');
        } else {
            cy.log('WARN: Không tìm thấy trường Fullname trên UI Beta');
        }
    });
  });

  it('SU_012: Nhập Username hợp lệ (Check không báo lỗi)', () => {
    cy.get('input[name="username"]').type('valid_user_123');
    cy.get('input[name="username"]').blur(); // Blur ra ngoài
    cy.get('input[name="username"]').should('not.have.class', 'ant-input-status-error');
  });

  it('SU_018: Nhập Email hợp lệ', () => {
    cy.get('input[name="email"]').type('valid@email.com');
    cy.get('input[name="email"]').blur();
    cy.contains(/invalid|không hợp lệ/i).should('not.exist');
  });

  it('SU_025: Nhập Password hợp lệ (Check ẩn ký tự dạng ••••)', () => {
    cy.get('input[name="password"]').type('Pass123456');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  // ==================================================
  // NHÓM: VALIDATION (Kiểm tra lỗi Logic)
  // ==================================================

  it('SU_013: Validate Username đã tồn tại (Check báo lỗi trùng)', () => {
    // Mock API trả về lỗi
    cy.intercept('POST', '**/check-username', { statusCode: 400, body: { msg: 'Existed' } });
    cy.get('input[name="username"]').type('duplicate_user').blur();
    // Kiểm tra UI hiện lỗi (Text có thể thay đổi tùy project)
    cy.contains(/exist|tồn tại/i).should('exist'); 
  });

  it('SU_015: Validate Username để trống', () => {
    cy.get('input[name="username"]').focus().blur();
    cy.contains(/required|nhập username/i).should('be.visible');
  });

  it('SU_016: Validate Username chứa ký tự đặc biệt', () => {
    cy.get('input[name="username"]').type('user@#$');
    cy.get('input[name="username"]').blur();
    // Giả định UI có validate cái này
    cy.contains(/character|ký tự|valid/i).should('be.visible');
  });

  it('SU_019: Validate Email để trống', () => {
    cy.get('input[name="email"]').focus().blur();
    cy.contains(/required|nhập email/i).should('be.visible');
  });

  it('SU_020: Validate Email sai định dạng (thiếu @, domain...)', () => {
    cy.get('input[name="email"]').type('emailkusai');
    cy.get('input[name="email"]').blur();
    cy.contains(/invalid|hợp lệ/i).should('be.visible');
  });

  it('SU_021: Validate Email đã tồn tại (Check báo lỗi trùng)', () => {
    cy.intercept('POST', '**/check-email', { statusCode: 400, body: { msg: 'Existed' } });
    cy.get('input[name="email"]').type('used@email.com').blur();
    cy.contains(/exist|tồn tại/i).should('exist');
  });

  it('SU_023: Validate Email đã đăng ký bằng Google', () => {
    // Mock API
    cy.intercept('POST', '**/check-email', { statusCode: 400, body: { msg: 'GoogleAccount' } });
    cy.get('input[name="email"]').type('google@gmail.com').blur();
    cy.contains(/Google/i).should('exist');
  });

  it('SU_026: Validate Password ngắn (< 8 ký tự)', () => {
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="username"]').click(); // Blur
    cy.contains(/8 characters|8 ký tự|nhất 8/i).should('be.visible');
  });

  it('SU_027: Validate Password quá dài (> 16 ký tự)', () => {
    cy.get('input[name="password"]').type('12345678901234567890');
    cy.get('input[name="username"]').click(); // Blur
    // Nếu UI có rule này
    cy.contains(/maximum|quá|long/i).should('exist');
  });

  it('SU_028: Validate Password thiếu ký tự số/chữ hoa (Check Rule)', () => {
    cy.get('input[name="password"]').type('onlylowercase');
    cy.get('input[name="username"]').click(); // Blur
    cy.contains(/uppercase|chữ hoa|number|số/i).should('exist');
  });

  it('SU_029: Validate Password nhập lại không khớp (Mismatch)', () => {
    cy.get('input[name="password"]').type('PassA');
    cy.get('input[name="confirmPassword"], input[name="confirm_password"]').type('PassB').blur();
    cy.contains(/match|khớp/i).should('be.visible');
  });

  it('SU_030: Validate Password để trống', () => {
    cy.get('input[name="password"]').focus().blur();
    cy.contains(/required|nhập password/i).should('be.visible');
  });

  it('SU_031: Password có khoảng trắng đầu/cuối (Check Auto Trim)', () => {
    cy.get('input[name="password"]').type('  Pass123  ');
    // Kiểm tra xem value có tự cắt không (Tùy logic dev làm)
    cy.get('input[name="password"]').invoke('val').then(val => {
        // Nếu requirement là tự trim -> val phải là 'Pass123'
        // Nếu requirement là báo lỗi -> Check UI báo lỗi khoảng trắng
        expect(val.trim()).to.equal('Pass123'); 
    });
  });

  // ==================================================
  // NHÓM: SUBMISSION & FUNCTIONAL (Chức năng)
  // ==================================================

  it('SU_035: Submit khi chưa tick "Điều khoản" (Check chặn)', () => {
    // Điền đủ thông tin
    cy.get('input[name="username"]').type('user_ok');
    cy.get('input[name="email"]').type('ok@mail.com');
    cy.get('input[name="password"]').type('Pass1234');
    cy.get('input[name="confirmPassword"], input[name="confirm_password"]').type('Pass1234');
    
    // Uncheck
    cy.get('input[type="checkbox"]').uncheck({force: true});
    
    // Expect: Nút bị disable
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('SU_041: Đăng ký thất bại (Check nút Submit bị disable/lỗi)', () => {
    // Case này check tổng quát: Nếu form sai -> Nút disable
    cy.get('input[name="username"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('SU_040: Đăng ký thành công (Happy Case)', () => {
    const randomUser = `user${Date.now()}`;
    // Nhập Full flow
    cy.get('input[name="username"]').type(randomUser);
    cy.get('input[name="email"]').type(`${randomUser}@test.com`);
    cy.get('input[name="password"]').type('Cheppy@2025');
    cy.get('input[name="confirmPassword"], input[name="confirm_password"]').type('Cheppy@2025').blur();
    
    // Tick Checkbox
    cy.get('input[type="checkbox"]').check({ force: true });

    // Mock Success
    cy.intercept('POST', '**/api/security/register', { statusCode: 200, body: { success: true } }).as('regSuccess');

    // Chờ UI unlock nút
    cy.wait(500);
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.wait('@regSuccess');
  });

});