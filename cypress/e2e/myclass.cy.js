describe('My Class', () => {
    beforeEach(() => {
        cy.visit('https://beta.cheppy.ai/signin')
        // Đăng nhập tài khoản
        cy.get('#user-name').type('thuythanh')
        cy.get('#password').type('123456aA@')
        cy.get('button[type="submit"]').click()
        cy.contains('h2', 'My Class').should('be.visible')
        cy.get('[data-cy=class]').click()
    })

    it('MC_010_Tạo lớp mới Active thành công', () => {
        // Chọn nút New Class
        cy.get('button.ant-btn-primary').click()
        // Nhập tên class
        cy.get('input[name="name"]').type('Lớp 1A1')
        // Chọn Grade
        cy.contains('Choose grade').click({ force: true }) // Mở dropdown Grade
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'K-1')
            .click() // Chọn K-1
        // Chọn Institution
        cy.contains('Choose an institution').click({ force: true }) // Mở dropdown Institution
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'Cheppy')
            .click() // Chọn tổ chức Cheppy
        // Chọn Start date
        cy.get('input[placeholder="Select date"]').click() // Mở lịch
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner')
            .contains('1').click() // Chọn ngày 01/01/2026
        cy.get('button[type = "submit"]').click()
        // Kiểm tra Expected Result
        cy.contains('.ant-message-notice-content', 'Class is created successfully.', {timeout: 10000 }).should('be.visible')
        cy.contains('.p-4', 'Lớp 1A1')
            .within(() => {
                cy.contains('Lớp 1A1')
                cy.contains('K-1')
                cy.contains('0 Student')
                cy.contains('Active')
            })
    })

    it('MC_011_Tạo lớp mới Active thành công', () => {
        // Chọn nút New Class
        cy.get('button.ant-btn-primary').click()
        // Nhập tên class
        cy.get('input[name="name"]').type('Lớp 1A2')
        // Tick vào checkbox CEFR Level
        cy.contains('.ant-checkbox-wrapper', 'CEFR level')
            .find('input[type="checkbox"]')
            .check({ force: true })
        // Chọn Level
        cy.contains('Choose CEFR level').click({ force: true }) // Mở dropdown Level
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'A1')
            .click() // Chọn A1
        // Chọn Institution
        cy.contains('Choose an institution').click({ force: true }) // Mở dropdown Institution
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'Cheppy')
            .click() // Chọn tổ chức Cheppy
        // Chọn Start date
        cy.get('input[placeholder="Select date"]').click() // Mở lịch
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner')
            .contains('1')
            .click() // Chọn ngày 01/01/2026
        cy.get('button[type = "submit"]').click()
        // Kiểm tra Expected Result
        cy.contains('.ant-message-notice-content', 'Class is created successfully.', {timeout: 10000 }).should('be.visible')
        cy.contains('.p-4', 'Lớp 1A2')
            .within(() => {
                cy.contains('Lớp 1A2')
                cy.contains('A1')
                cy.contains('0 Student')
                cy.contains('Active')
            })
    })

    it('MC_012_Tạo lớp mới Active thành công', () => {
        // Chọn nút New Class
        cy.get('button.ant-btn-primary').click()
        // Nhập tên class
        cy.get('input[name="name"]').type('Lớp 1A3')
        // Chọn Grade
        cy.contains('Choose grade').click({ force: true }) // Mở dropdown Grade
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'K-1')
            .click() // Chọn K-1
        // Chọn Institution
        cy.contains('Choose an institution').click({ force: true }) // Mở dropdown Institution
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'Cheppy')
            .click() // Chọn tổ chức Cheppy
        // Chọn Start date
        cy.get('input[placeholder="Select date"]').click() // Mở lịch
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner')
            .contains('1')
            .click() // Chọn ngày 01/01/2026
        //cy.get('button[type = "submit"]').click()
        // Chọn End date
        cy.contains('.ant-checkbox-wrapper', 'End date')
            .find('input[type="checkbox"]')
            .check({ force: true })
        cy.contains('label', 'End date')
            .closest('.w-full')
            .find('.ant-picker input')
            .click()
        cy.get('.ant-picker-dropdown:visible')
        .within(() => {
            // chọn năm
            cy.get('.ant-picker-year-btn').click();
            cy.contains('.ant-picker-cell-inner', '2026').click();
            // chọn tháng
            cy.contains('.ant-picker-cell-inner', 'Sep').click();
            // chọn ngày
            cy.get('[title="2026-09-30"]').click();
        });
        // Chọn nút Add
        cy.get('button[type = "submit"]').click()
        // Kiểm tra Expected Result
        cy.contains('.ant-message-notice-content', 'Class is created successfully.', {timeout: 10000 }).should('be.visible')
        cy.contains('.p-4', 'Lớp 1A3')
            .within(() => {
                cy.contains('Lớp 1A3')
                cy.contains('K-1')
                cy.contains('0 Student')
                cy.contains('Active')
            })
    })

    it('MC_013_Tạo lớp mới Scheduled thành công', () => {
        // Chọn nút New Class
        cy.get('button.ant-btn-primary').click()
        // Nhập tên class
        cy.get('input[name="name"]').type('Lớp 2A1')
        // Chọn Grade
        cy.contains('Choose grade').click({ force: true }) // Mở dropdown Grade
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'K-2')
            .click() // Chọn K-2
        // Chọn Institution
        cy.contains('Choose an institution').click({ force: true }) // Mở dropdown Institution
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'Cheppy')
            .click() // Chọn tổ chức Cheppy
        // Chọn Start date
        // Mở lịch
        cy.get('input[placeholder="Select date"]').click()
        // Chọn ngày 25/01/2026
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner')
            .contains('25')
            .click()
        cy.get('button[type = "submit"]').click()
        // Kiểm tra Expected Result
        cy.contains('.ant-message-notice-content', 'Class is created successfully.', {timeout: 10000 }).should('be.visible')
        cy.contains('.p-4', 'Lớp 2A1')
            .within(() => {
                cy.contains('Lớp 2A1')
                cy.contains('K-2')
                cy.contains('0 Student')
                cy.contains('Scheduled')
            })
    })

    it('MC_014_Tạo lớp mới Completed thành công', () => {
        // Chọn nút New Class
        cy.get('button.ant-btn-primary').click()
        // Nhập tên class
        cy.get('input[name="name"]').type('Lớp 3A1')
        // Chọn Grade
        cy.contains('Choose grade').click({ force: true }) // Mở dropdown Grade
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'K-3')
            .click() // Chọn K-3
        // Chọn Institution
        cy.contains('Choose an institution').click({ force: true }) // Mở dropdown Institution
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'Cheppy')
            .click() // Chọn tổ chức Cheppy
        // Chọn Start date
        // Mở lịch
        cy.get('input[placeholder="Select date"]').click()
        // Chọn ngày 01/01/2026
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner')
            .contains('1')
            .click()
        // Chọn End date
        cy.contains('.ant-checkbox-wrapper', 'End date')
            .find('input[type="checkbox"]')
            .check({ force: true })
        cy.contains('label', 'End date')
            .closest('.w-full')
            .find('.ant-picker input')
            .click()
        cy.get('.ant-picker-dropdown:visible')
        .within(() => {
            // chọn năm
            cy.get('.ant-picker-year-btn').click();
            cy.contains('.ant-picker-cell-inner', '2026').click();
            // chọn tháng
            cy.contains('.ant-picker-cell-inner', 'Jan').click();
            // chọn ngày
            cy.get('[title="2026-01-01"]').click();
        });  
        cy.get('button[type = "submit"]').click()
        // Kiểm tra Expected Result
        cy.contains('.ant-message-notice-content', 'Class is created successfully.', {timeout: 10000 }).should('be.visible')
        cy.contains('.p-4', 'Lớp 3A1')
            .within(() => {
                cy.contains('Lớp 3A1')
                cy.contains('K-3')
                cy.contains('0 Student')
                cy.contains('Ended')
            })
    })

    
    it('MC_015_Edit thành phần của lớp từ Quick action', () => {
        cy.contains('.p-4', 'Lớp 1A1')
            .within(() => {
                cy.get('[data-icon="ellipsis"]')
                .closest('button')
                .click() 
            })
        cy.get('.ant-dropdown:visible')
            .contains('.ant-dropdown-menu-item', 'Edit')
            .click()
        cy.get('input[name="name"]')
            .clear()
            .type('Lớp 1A1 test')
        // Tick vào checkbox CEFR Level
        cy.contains('.ant-checkbox-wrapper', 'CEFR level')
            .find('input[type="checkbox"]')
            .check({ force: true })
        // Chọn Level
        cy.contains('Choose CEFR level').click({ force: true }) // Mở dropdown Level
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'A1')
            .click() // Chọn A1
        cy.contains('button', 'Cancel').click()
        cy.contains('.p-4', 'Lớp 1A1')
            .within(() => {
                cy.contains('Lớp 1A1')
                cy.contains('K-1')
                cy.contains('0 Student')
                cy.contains('Active')
            })
    })

    it('MC_016_Edit thành phần của lớp từ Quick action', () => {
        // Chọn Quick action - Edit
        cy.contains('.p-4', 'Lớp 1A1')
            .within(() => {
                cy.get('[data-icon="ellipsis"]')
                .closest('button')
                .click() 
            })
        cy.get('.ant-dropdown:visible')
            .contains('.ant-dropdown-menu-item', 'Edit')
            .click()
        // Edit class name
        cy.get('input[name="name"]')
            .clear()
            .type('Lớp 1A1 test')
        // Tick vào checkbox CEFR Level
        cy.contains('.ant-checkbox-wrapper', 'CEFR level')
            .find('input[type="checkbox"]')
            .check({ force: true })
        // Chọn Level
        cy.contains('Choose CEFR level').click({ force: true }) // Mở dropdown Level
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'A1')
            .click() // Chọn A1
        // Chọn nút Update
        cy.contains('button', 'Update').click()
        //Expected result
        cy.contains('.ant-message-notice-content', 'Class is updated successfully.', {timeout: 10000 }).should('be.visible')
        cy.contains('.p-4', 'Lớp 1A1 test')
            .within(() => {
                cy.contains('Lớp 1A1 test')
                cy.contains('A1')
                cy.contains('0 Student')
                cy.contains('Active')
            })
    })

    it('MC_017_Edit thành phần của lớp từ màn Ovrview', () => {
        cy.contains('.p-4', 'Lớp 2A1').click()
            // .within(() => {
            //     cy.get('[data-icon="ellipsis"]')
            //     .closest('button')
            //     .click() 
            // })
        // Chọn nút Edit
        cy.contains('Class Information')
            .parents('div')
            .contains('button', 'Edit')
            .click()
        // Edit class name
        cy.get('input[name="name"]')
            .clear()
            .type('Lớp 2A1 test')
        // Tick vào checkbox CEFR Level
        cy.contains('.ant-checkbox-wrapper', 'CEFR level')
            .find('input[type="checkbox"]')
            .check({ force: true })
        // Chọn Level
        cy.contains('Choose CEFR level').click({ force: true }) // Mở dropdown Level
        cy.get('.ant-select-dropdown')
            .contains('.ant-select-item-option-content', 'A1')
            .click() // Chọn A1
        // Chọn nút Update
        cy.contains('button', 'Update').click()
        //Expected result
        cy.contains('.ant-message-notice-content', 'Class is updated successfully.', {timeout: 10000 }).should('be.visible')
    })

    it('MC_018_Kiểm tra hoạt dộng của action Change status', () => {
        // Chọn Quick action - Change status
        cy.contains('.p-4', 'Lớp 1A1 test')
            .within(() => {
                cy.get('[data-icon="ellipsis"]')
                .closest('button')
                .click() 
            })
        cy.get('.ant-dropdown:visible')
            .contains('.ant-dropdown-menu-item', 'Change status')
            .click()
        // Chọn nút Cancel
        cy.contains('button', 'Cancel').click()
        // Expected result
        cy.contains('.p-4', 'Lớp 1A1 test')
            .within(() => {
                cy.contains('Lớp 1A1 test')
                cy.contains('A1')
                cy.contains('0 Student')
                cy.contains('Active')
            })
    })

    it('MC_019_Kiểm tra hoạt dộng của action Change status', () => {
        // Chọn Quick action - Change status
        cy.contains('.p-4', 'Lớp 1A1 test')
            .within(() => {
                cy.get('[data-icon="ellipsis"]')
                .closest('button')
                .click() 
            })
        cy.get('.ant-dropdown:visible')
            .contains('.ant-dropdown-menu-item', 'Change status')
            .click()
        // Chọn nút Confirm
        cy.contains('button', 'Confirm').click()
        // Expected result
        cy.contains('.p-4', 'Lớp 1A1 test')
            .within(() => {
                cy.contains('Lớp 1A1 test')
                cy.contains('A1')
                cy.contains('0 Student')
                cy.contains('Ended')
            })
    })

    it('MC_020_Kiểm tra hoạt dộng của action Change status', () => {
        // Chọn Quick action - Change status
        cy.contains('.p-4', 'Lớp 1A1 test')
            .within(() => {
                cy.get('[data-icon="ellipsis"]')
                .closest('button')
                .click() 
            })
        cy.get('.ant-dropdown:visible')
            .contains('.ant-dropdown-menu-item', 'Change status')
            .click()
        // Chọn nút Confirm
        cy.contains('button', 'Confirm').click()
        // Expected result
        cy.contains('.p-4', 'Lớp 1A1 test')
            .within(() => {
                cy.contains('Lớp 1A1 test')
                cy.contains('A1')
                cy.contains('0 Student')
                cy.contains('Active')
            })
    })

    it('MC_021_Kiểm tra hoạt dộng của action Change status', () => {
        // Chọn Quick action - Change status
        cy.contains('.p-4', 'Lớp 2A1 test')
            .within(() => {
                cy.get('[data-icon="ellipsis"]')
                .closest('button')
                .click() 
            })
        cy.get('.ant-dropdown:visible')
            .contains('.ant-dropdown-menu-item', 'Change status')
            .click()
        // Chọn nút Confirm
        cy.contains('button', 'Confirm').click()
        // Expected result
        cy.contains('.p-4', 'Lớp 2A1 test')
            .within(() => {
                cy.contains('Lớp 2A1 test')
                cy.contains('A1')
                cy.contains('0 Student')
                cy.contains('Active')
            })
    })

    it('MC_022_Kiểm tra hoạt dộng của nút Delete', () => {
        // Chọn Quick action - Change status
        cy.contains('.p-4', 'Lớp 3A')
            .within(() => {
                cy.get('[data-icon="ellipsis"]')
                .closest('button')
                .click() 
            })
        cy.get('.ant-dropdown:visible')
            .contains('.ant-dropdown-menu-item', 'Delete')
            .click()
        // Chọn nút Cancel
        cy.contains('button', 'Cancel').click()
        // Expected result
        cy.contains('.p-4', 'Lớp 3A')
            .within(() => {
                cy.contains('Lớp 3A')
                cy.contains('K-3')
                cy.contains('0 Student')
                cy.contains('Ended')
            })
    })

    it('MC_023_Kiểm tra hoạt dộng của nút Delete', () => {
        // Chọn Quick action - Change status
        cy.contains('.p-4', 'Lớp 3A')
            .within(() => {
                cy.get('[data-icon="ellipsis"]')
                .closest('button')
                .click() 
            })
        cy.get('.ant-dropdown:visible')
            .contains('.ant-dropdown-menu-item', 'Delete')
            .click()
        // Chọn nút Cancel
        cy.contains('button', 'Delete').click()
        // Lớp 3A không tồn tại
        cy.contains('.p-4', 'Lớp 3A').should('not.exist')
    })

    it('MC_024_Cancel khi add học sinh vào lớp', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add studetn
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Add existing account').click()
        // Nhập thông tin học sinh thuytest_hs1
        cy.get('input[placeholder="Enter username or email"]').type('thuytest_hs1')
        cy.contains('Hs one (thuytest_hs1@gmail.com)').click()
        // Chọn nút Cancel
        cy.contains('button', 'Cancel').click()
    })
    
    it('MC_025_Thêm học sinh đã có tài khoản bằng username', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add studetn
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Add existing account').click()
        // Nhập thông tin học sinh thuytest_hs1
        cy.get('input[placeholder="Enter username or email"]').type('thuytest_hs1')
        cy.get('.absolute.top-full')
            .should('be.visible')
            .within(() => {
                cy.contains('.text-sm', 'Hs one')
                .should('be.visible')
                .click();
            });
        cy.get('.ant-modal-footer')
        .contains('button', 'Add')
        .should('be.enabled')
        .click();
        //Expected result
        cy.get('.ant-message-notice-content', { timeout: 10000 })
            .should('contain.text', 'The student account list has been added successfully!')
        cy.contains('span', 'Hs one')
            .should('be.visible')
    })

    it('MC_026_Thêm học sinh đã có tài khoản bằng email', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add studetn
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Add existing account').click()
        // Nhập thông tin học sinh thuytest_hs1
        cy.get('input[placeholder="Enter username or email"]').type('thuythanh@thuy.com')
        cy.get('.absolute.top-full')
            .should('be.visible')
            .within(() => {
                cy.contains('.text-sm', 'Thùy Thanh')
                .should('be.visible')
                .click();
            });
        cy.get('.ant-modal-footer')
        .contains('button', 'Add')
        .should('be.enabled')
        .click();
        //Expected result
        cy.get('.ant-message-notice-content', { timeout: 10000 })
            .should('contain.text', 'The student account list has been added successfully!')
        cy.contains('span', 'Thùy Thanh')
            .should('be.visible')
    })

    it('MC_027_Cancel khi tạo tài khoản của học sinh', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add studetn
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Create new account').click()
        // Nhập thông tin học sinh thuytest_hs1
        cy.get('input[placeholder="Enter name"]').type('Thanh Thùy one')
        cy.get('input[placeholder="Enter email"]').eq(0).type('pphthanhthuy1@thuy.com')
        cy.get('input[placeholder="Enter name"]').eq(1).type('Thanh Thùy two')
        // Chọn nút Cancel
        cy.contains('button', 'Cancel').click()
        // Đóng popup
        cy.contains('span','Add student').should('be.visible')
    })

    it('MC_028_Cancel khi tạo tài khoản của học sinh', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add studetn
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Create new account').click()
        // Nhập thông tin học sinh thuytest_hs1
        cy.get('input[placeholder="Enter name"]').type('Thanh Thùy one')
        cy.get('input[placeholder="Enter email"]').eq(0).type('pphthanhthuy1@thuy.com')
        cy.get('input[placeholder="Enter name"]').eq(1).type('Thanh Thùy two')
        // Chọn nút Create
        cy.contains('button', 'Create').click()
        // Chọn nút Cancel
        cy.contains('button', 'Cancel').click()
        // Đóng popup, quay lại Popup Create new account
        cy.contains('span','Create new account').should('be.visible')
    })

    it('MC_029_Thêm học sinh bằng tạo tài khoản mới', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add studetn
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Create new account').click()
        // Nhập thông tin học sinh thuytest_hs1
        cy.get('input[placeholder="Enter name"]').type('Thanh Thùy one')
        cy.get('input[placeholder="Enter email"]').eq(0).type('pphthanhthuy1@thuy.com')
        cy.get('input[placeholder="Enter name"]').eq(1).type('Thanh Thùy two')
        // Chọn nút Create
        cy.contains('button', 'Create').click()
        // Chọn nút Cancel
        cy.contains('button', 'Create').click()
        // Đóng popup, quay lại Popup Create new account
        cy.contains('.ant-message-notice-content', 'The student account list has been created successfully!').should('be.visible')
    })

    it('MC_030_Thêm học sinh bằng upload file sai định dạng', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add studetn
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Create new account').click()
        // Chọn sang tab Upload
        cy.get('[data-cy="upload"]').click()
        // Chọn vào click to upload
        cy.contains('span', 'click to upload.').click()
        cy.get('input[type="file"]')
            .should('exist')
            .selectFile('cypress/fixtures/example.json', { force: true })
        // Hiển thị thông báo Only Excel files are allowed (.xlsx, .xls, .csv)
        cy.contains('.ant-message-notice-content', 'Only Excel files are allowed (.xlsx, .xls, .csv)').should('be.visible')
    })

    it('MC_031_Cancel khi tạo tài khoản học sinh bằng upload file', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add student
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Create new account').click()
        // Chọn sang tab Upload
        cy.get('[data-cy="upload"]').click()
        // Chọn vào click to upload
        cy.contains('span', 'click to upload.').click()
        cy.get('input[type="file"]')
            .should('exist')
            .selectFile('cypress/fixtures/student-template.xlsx', { force: true })
        // Đóng popup
        cy.contains('.ant-message-notice-content', 'Selected file: student-template.xlsx').should('be.visible')
        cy.contains('button', 'Cancel').click()
        cy.contains('span','Add student').should('be.visible')
    })

    it('MC_032_Cancel khi tạo tài khoản học sinh bằng upload file', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add student
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Create new account').click()
        // Chọn sang tab Upload
        cy.get('[data-cy="upload"]').click()
        // Chọn vào click to upload
        cy.contains('span', 'click to upload.').click()
        cy.get('input[type="file"]')
            .should('exist')
            .selectFile('cypress/fixtures/student-template.xlsx', { force: true })
        // Chọn nút Upload và Cancel
        cy.contains('.ant-message-notice-content', 'Selected file: student-template.xlsx').should('be.visible')
        cy.contains('button', 'Create').click()
        cy.contains('.ant-message-notice-content', 'Uploaded and created accounts successfully').should('be.visible')
        cy.contains('button', 'Cancel').click()
        // Quay về popup Create new account
        cy.contains('span','Create new account').should('be.visible')
    })

    it('MC_033_Thêm học sinh bằng upload file đúng', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Chọn nút Add student
        cy.contains('button', 'Add Students').click()
        // Chọn vào Add existing students
        cy.contains('Create new account').click()
        // Chọn sang tab Upload
        cy.get('[data-cy="upload"]').click()
        // Chọn vào click to upload
        cy.contains('span', 'click to upload.').click()
        cy.get('input[type="file"]')
            .should('exist')
            .selectFile('cypress/fixtures/student-template.xlsx', { force: true })
        // Chọn nút Upload và Cancel
        cy.contains('.ant-message-notice-content', 'Selected file: student-template.xlsx').should('be.visible')
        cy.contains('button', 'Create').click()
        cy.contains('.ant-message-notice-content', 'Uploaded and created accounts successfully').should('be.visible')
        cy.contains('button', 'Create').click()
        // Tạo và add thành công học sinh vào lớp
        cy.contains('.ant-message-notice-content', 'The student account list has been created successfully!').should('be.visible')

    })

    it('MC_034_Cancel xóa học sinh khỏi lớp', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        cy.contains('td', 'hocsinhone')
            .parents('tr')
            .find('svg')
            .filter('[viewBox="0 0 24 24"]')
            .parent()
            .click()
        // Chọn action Remove
        cy.contains('span', 'Remove').click()
        // Chọn nút Cancel
        cy.contains('button', 'Cancel').click()

    })

    it('MC_035_Xóa thành công học sinh khỏi lớp', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        cy.contains('td', 'hocsinhone')
            .parents('tr')
            .find('svg')
            .filter('[viewBox="0 0 24 24"]')
            .parent()
            .click()
        // Chọn action Remove
        cy.contains('span', 'Remove').click()
        // Chọn nút Cancel
        cy.contains('button', 'Remove').click()
        // Hiển thị thông báo Deleted successfully.
        cy.contains('.ant-message-notice-content', 'Deleted successfully.').should('be.visible')

    })

    it('MC_036_Search kết quả thành công', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Nhập vào box Search
        cy.get('input[placeholder="Quick search"]').eq(1).type('Thanh Thùy')
        // Trả ra kết quả học sinh có tên là hoc sinh one
        const keyword = 'test test one'

        cy.get('tbody tr').each(($row) => {
        cy.wrap($row)
            .find('td')
            .eq(1) // cột Full Name (No.=0, Full Name=1)
            .find('span')
            .invoke('text')
            .then(text => {
            expect(text.toLowerCase()).to.include(keyword)
            })
        })
    })

    it('MC_037_Search không có kết quả', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab Student
        cy.get('[data-cy="STUDENTS"]').click()
        // Nhập vào box Search
        cy.get('input[placeholder="Quick search"]').eq(1).type('hoc sinh @@')
        // Trả ra No data
        cy.contains('.ant-empty-description', 'No data')
            .should('be.visible')
    })

    it('MC_038_Assign mission mới thành công cho lớp', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab ASSIGNMENTS
        cy.get('[data-cy="ASSIGNMENTS"]').click()
        // Chọn vào nút New Assignment
        cy.get('[data-cy="add-new-assignment"]').click()
        // Chọn mission
        cy.contains('div', 'Tasty Food Word Hunt').click()
        // Chọn nút Back
        cy.get('[data-cy="back-button"]').click()
        // Hiển thị thư mục có name là Shared with me
        cy.contains('Shared with me').should('be.visible')
    })

    it('MC_039_Assign mission mới thành công cho lớp', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab ASSIGNMENTS
        cy.get('[data-cy="ASSIGNMENTS"]').click()
        // Chọn vào nút New Assignment
        cy.get('[data-cy="add-new-assignment"]').click()
        // Chọn mission
        cy.contains('div', 'Tasty Food Word Hunt').click()
        // Chọn nút Continue
        cy.get('[data-cy="next-button"]').click()
        // Chọn Apply to all stages
        cy.contains('button', 'Apply to all Stages').click()
        // Chọn nút Create new assignment
        cy.get('[data-cy="next-button"]').click()
        // Hiển thị thông báo thành công
        cy.contains('.ant-message-notice-content', 'Assignment created successfully').should('be.visible')
        cy.contains('Tasty Food Word Hunt').should('be.visible')
    })

    it('MC_040_Assign mission mới thành công cho lớp', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab ASSIGNMENTS
        cy.get('[data-cy="ASSIGNMENTS"]').click()
        // Chọn vào nút New Assignment
        cy.get('[data-cy="add-new-assignment"]').click()
        // Chọn mission
        cy.contains('div', 'Tasty Food Word Hunt').click()
        // Chọn nút Continue
        cy.get('[data-cy="next-button"]').click()
        // Chọn Start date là ngày tương lai
        cy.get('input[placeholder="Select date"]')
            .clear()
            .eq(0)
            .type('01/01/2027 00:00')
        cy.contains('button', 'OK').click()
        // Chọn Apply to all stages
        cy.contains('button', 'Apply to all Stages').click()
        // Chọn nút Create new assignment
        cy.get('[data-cy="next-button"]').click()
        // Hiển thị thông báo thành công
        cy.contains('.ant-message-notice-content', 'Assignment created successfully').should('be.visible')
        cy.contains('Tasty Food Word Hunt').should('be.visible')
    })

    it('MC_041_Assign mission mới thành công cho lớp', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab ASSIGNMENTS
        cy.get('[data-cy="ASSIGNMENTS"]').click()
        // Chọn vào nút New Assignment
        cy.get('[data-cy="add-new-assignment"]').click()
        // Chọn mission
        cy.contains('div', 'Tasty Food Word Hunt').click()
        // Chọn nút Continue
        cy.get('[data-cy="next-button"]').click()
        // Chọn Start date là ngày quá khứ
        cy.get('input[placeholder="Select date"]')
            .clear()
            .eq(0)
            .type('01/01/2026 00:00')
        cy.contains('button', 'OK').click()
        // Chọn End date là quá khứ
        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[aria-invalid="false"][size="18"]')
            .eq(1)
            .type('01/01/2026 23:59')
        cy.contains('button', 'OK').click({force: true})
        // Chọn Apply to all stages
        cy.contains('button', 'Apply to all Stages').click()
        // Chọn nút Create new assignment
        cy.get('[data-cy="next-button"]').click()
        // Hiển thị thông báo thành công
        cy.contains('.ant-message-notice-content', 'Assignment created successfully').should('be.visible')
        cy.contains('Tasty Food Word Hunt').should('be.visible')
    })

    it('MC_042_Assign mission mới thành công cho lớp', () => {
        cy.contains('.p-4', 'Lớp 1A1 test').click()
        // Chọn tab ASSIGNMENTS
        cy.get('[data-cy="ASSIGNMENTS"]').click()
        // Chọn vào nút New Assignment
        cy.get('[data-cy="add-new-assignment"]').click()
        // Chọn mission
        cy.contains('div', 'Tasty Food Word Hunt').click()
        // Chọn nút Continue
        cy.get('[data-cy="next-button"]').click()
        // Chọn Duration
        cy.get('input[type="checkbox"]')
            .eq(1)
            .click()
        cy.get('input[name="duration"]')
            .clear()
            .type(5)
        // Chọn Attempt Limit
        cy.get('input[type="checkbox"]')
            .eq(2)
            .click()
        cy.get('input[name="attemptLimit"]')
            .clear()
            .type(5)
        // Chọn Mistake Limit
        cy.get('input[type="checkbox"]')
            .eq(3)
            .type('5')
        cy.get('input[name="mistakeLimit"]').type(5)
        // Chọn Apply to all stages
        cy.contains('button', 'Apply to all Stages').click()
        // Chọn nút Create new assignment
        cy.get('[data-cy="next-button"]').click()
        // Hiển thị thông báo thành công
        cy.contains('.ant-message-notice-content', 'Assignment created successfully').should('be.visible')
        cy.contains('Tasty Food Word Hunt').should('be.visible')
    })

});
