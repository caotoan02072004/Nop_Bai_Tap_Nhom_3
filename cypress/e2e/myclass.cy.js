describe('My Class', () => {
    beforeEach(() => {
    //cy.session('login', () => {
        cy.visit('https://beta.cheppy.ai/signin')
        // Đăng nhập tài khoản
        cy.get('#user-name').type('thuythanh')
        cy.get('#password').type('123456aA@')
        cy.get('button[type="submit"]').click()
        cy.contains('h2', 'My Class').should('be.visible')
        cy.get('[data-cy=class]').click()
    //})
    })


    it('MC_010_Tạo lớp mới Active thành công', () => {
        // // Truy cập vào trang web
        // cy.visit('https://beta.cheppy.ai/signin')
        // // Đăng nhập tài khoản
        // cy.get('#user-name').type('thuythanh')
        // cy.get('#password').type('123456aA@')
        // cy.get('button[type="submit"]').click()
        // cy.contains('h2', 'My Class').should('be.visible')
        // cy.get('[data-cy=class]').click()

        // Chọn nút New Class
        cy.get('button.ant-btn-primary').click()
        // Nhập tên class
        cy.get('input[name="name"]').type('Lớp 1A1')
        // Chọn Grade
        cy.contains('Choose grade').click({ force: true }) // Mở dropdown Grade
        cy.get('.ant-select-dropdown').contains('.ant-select-item-option-content', 'K-1').click() // Chọn K-1
        // Chọn Institution
        cy.contains('Choose an institution').click({ force: true }) // Mở dropdown Institution
        cy.get('.ant-select-dropdown').contains('.ant-select-item-option-content', 'Cheppy').click() // Chọn Cheppy
        // Chọn Start date
        cy.get('input[placeholder="Select date"]').click() // Mở lịch
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner').contains('1').click() // Chọn ngày 01/01/2026
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
        cy.get('.ant-select-dropdown').contains('.ant-select-item-option-content', 'A1').click() // Chọn A1
        // Chọn Institution
        cy.contains('Choose an institution').click({ force: true }) // Mở dropdown Institution
        cy.get('.ant-select-dropdown').contains('.ant-select-item-option-content', 'Cheppy').click() // Chọn Cheppy
        // Chọn Start date
        cy.get('input[placeholder="Select date"]').click() // Mở lịch
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner').contains('1').click() // Chọn ngày 01/01/2026
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
        cy.get('.ant-select-dropdown').contains('.ant-select-item-option-content', 'K-1').click() // Chọn K-1
        // Chọn Institution
        cy.contains('Choose an institution').click({ force: true }) // Mở dropdown Institution
        cy.get('.ant-select-dropdown').contains('.ant-select-item-option-content', 'Cheppy').click() // Chọn Cheppy
        // Chọn Start date
        cy.get('input[placeholder="Select date"]').click() // Mở lịch
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner').contains('1').click() // Chọn ngày 01/01/2026
        cy.get('button[type = "submit"]').click()
        // Chọn End date
        // Tick checkbox End date
        cy.contains('.ant-checkbox-wrapper', 'End date')
            .find('input[type="checkbox"]')
            .check({ force: true })
        cy.wait(500)
        // Mở datepicker trong đúng form End date
        /*cy.contains('End date')
            .closest('.ant-form-item')
            .within(() => {
                cy.get('input')
                .should('be.visible')
                .click()
        })*/
       cy.get('input[placeholder="Select date"]').eq(1).click()
        // Chọn 30/09/2026
        cy.get('.ant-picker-year-btn').click()
        cy.contains('.ant-picker-year-panel-cell', '2026').click()
        cy.contains('.ant-picker-month-panel-cell', 'Sep').click()
        cy.get('.ant-picker-cell-in-view .ant-picker-cell-inner')
            .contains('30')
            .click()
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
})