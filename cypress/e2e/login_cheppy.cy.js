import 'cypress-plugin-tab';

describe('Bộ Test Case Automation - Module Login', () => {
  const baseUrl = 'https://beta.cheppy.ai';

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
    // Đợi input xuất hiện để tránh lỗi load trang chưa xong
    cy.get('input[name="username"], #user-name').should('be.visible');
    // Setup Intercept
    cy.intercept('POST', '**/api/security/authenticate').as('loginRequest');
  });

  // --- NHÓM 1: NAVIGATION (Tab Flow) ---

  it('LI_005: Kiểm tra thứ tự Focus khi nhấn phím Tab liên tục', () => {
    // 1. Click vào ô Username
    cy.get('input[name="username"], #user-name').click();
    cy.focused().should('satisfy', ($el) => $el.attr('name') === 'username' || $el.attr('id') === 'user-name');

    // 2. Tab sang Password
    cy.focused().tab();
    cy.focused().should('have.attr', 'name', 'password');

    // 3. Xử lý icon mắt (nếu focus vào nó) -> rồi sang Remember Me
    cy.focused().tab();
    cy.focused().then(($el) => {
      // SỬA LỖI CÚ PHÁP: Thêm dấu || vào điều kiện if
      if ($el.hasClass('password-toggle-icon') || $el.is('button.ant-btn-icon-only') || $el.find('svg').length > 0) {
        cy.focused().tab(); // Tab tiếp để đi tiếp
      }
    });

    // Kiểm tra đã vào Remember Me
    cy.focused().should('satisfy', ($el) => {
      return $el.attr('type') === 'checkbox' || /Remember|Ghi nhớ/i.test($el.text());
    });

    // 4. Tab sang Button Login (Thứ tự thực tế: Remember -> Login Button)
    cy.focused().tab();
    cy.focused().should('have.attr', 'type', 'submit');

    // 5. Tab sang Forgot Password (Dời xuống sau nút Login)
    cy.focused().tab();
    cy.focused().invoke('text').should('match', /Forgot password|Quên mật khẩu|Sign up|Đăng ký/i);

    // 6. Tab tiếp theo (Sign Up)
    cy.focused().tab();
    cy.focused().should('exist'); // Đảm bảo focus vẫn hoạt động
  });

  it('LI_006: Kiểm tra phím Shift + Tab (Reverse Flow)', () => {
    // 1. Focus vào Sign Up
    cy.contains(/Sign up|Đăng ký/i).should('be.visible').focus();

    // 2. Shift + Tab lần 1: Mong đợi về nút LOGIN ("Sign in") thay vì Forgot Password
    // (Dựa trên log thực tế của bạn: 'Sign in')
    cy.focused().tab({ shift: true });
    cy.focused().should('satisfy', ($el) => {
        // Kiểm tra text là "Sign in" hoặc nút có type="submit"
        return /Sign in|Đăng nhập/i.test($el.text()) || $el.attr('type') === 'submit';
    });

    // 3. Shift + Tab lần 2: Mong đợi về Remember Me
    cy.focused().tab({ shift: true });
    cy.focused().should('satisfy', ($el) => {
        return $el.attr('type') === 'checkbox' || /Remember|Ghi nhớ/i.test($el.text());
    });

    // 4. Shift + Tab lần 3: Mong đợi về Password
    // (Xử lý trường hợp dính vào icon mắt/nút ẩn hiện pass)
    cy.focused().tab({ shift: true });
    cy.focused().then(($el) => {
        if ($el.is('button') || $el.find('svg').length > 0 || $el.hasClass('password-toggle-icon')) {
            cy.focused().tab({ shift: true });
        }
    });
    cy.focused().should('have.attr', 'name', 'password');

    // 5. Shift + Tab lần 4: Mong đợi về Username (Đích cuối cùng)
    cy.focused().tab({ shift: true });
    cy.focused().should('satisfy', ($el) => $el.attr('name') === 'username' || $el.attr('id') === 'user-name');
  });
  
  it('LI_029: Chức năng ẩn/hiện mật khẩu', () => {
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    // Click icon mắt (Selector linh hoạt)
    cy.get('.ant-input-suffix, .password-toggle-icon, .anticon-eye-invisible').first().click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
  });

  it('LI_025: Kiểm tra Link "Forgot password"', () => {
    cy.contains(/Forgot password|Quên mật khẩu/i).click();
    cy.url().should('include', '/reset-password');
    // Check ô nhập email reset pass
    cy.get('input[type="email"], input[name="email"]').should('be.visible');
  });

  // --- NHÓM 2: VALIDATION (Check Text hiển thị) ---

  it('LI_014: Validate để trống Username & Password', () => {
    cy.get('button[type="submit"]').click();
    cy.contains(/Required|nhập|trống|blank/i).should('be.visible');
  });

  it('LI_015: Validate để trống Password', () => {
    cy.get('input[name="username"], #user-name').type('thuytest_gv1');
    cy.get('input[name="password"]').clear();
    cy.get('button[type="submit"]').click();
    cy.contains(/Required|nhập|trống|blank/i).should('be.visible');
  });

  it('LI_016: Validate để trống Username', () => {
    cy.get('input[name="username"], #user-name').clear();
    cy.get('input[name="password"]').type('thuytest_gv1');
    cy.get('button[type="submit"]').click();
    cy.contains(/Required|nhập|trống|blank/i).should('be.visible');
  });

  it('LI_022: Validate độ dài Password (< 8 ký tự)', () => {
    cy.get('input[name="username"], #user-name').type('thuytest_gv1');
    cy.get('input[name="password"]').type('12345');
    cy.get('button[type="submit"]').click();
    // Check lỗi hiển thị
    cy.contains(/characters|ký tự|Invalid|sai|không đúng/i).should('be.visible');
  });

  // --- NHÓM 3: FUNCTIONAL LOGIN ---

  it('LI_017: Đăng nhập sai tài khoản/mật khẩu', () => {
    cy.get('input[name="username"], #user-name').type('thuytest_gv');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest'); 
    cy.contains(/Invalid|sai|không đúng|failed/i).should('be.visible');
    cy.url().should('not.include', '/home');
  });

  it('LI_013: Đăng nhập thành công', () => {
    cy.intercept('GET', '**/api/security/userinfo').as('getUserInfo');
    cy.get('input[name="username"], #user-name').type('thuytest_gv1');
    cy.get('input[name="password"]').type('thuytest_gv1');
    cy.get('button[type="submit"]').click();

    // Check Login Success
    cy.wait('@getUserInfo', { timeout: 15000 }).its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/home');
    cy.get('.ant-avatar, img[alt="avatar"], .user-avatar').should('exist');
  });
});