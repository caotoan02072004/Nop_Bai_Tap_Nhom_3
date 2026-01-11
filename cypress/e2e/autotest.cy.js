const SELECTORS = {
    // Common
    statusSignin: '[data-test-id="lab-109-user-status"]',
    orderStatus: '[data-test-id="lab-109-order-status"]',

    // Buyer buy
    signInBuyerBtn: '[data-test-id="lab-109-login-buyer"]',
    signInOtherBuyerBtn: '[data-test-id="lab-109-login-other"]',
    signInWarehouseBtn: '[data-test-id="lab-109-login-warehouse"]',
    buyOnlineBtn: '[data-test-id="lab-109-buy"]',
    stockValue: '[data-test-id="lab-109-stock"]',

    // Admin delivered
    signInAdminBtn: '[data-test-id="lab-109-login-admin"]',
    deliveredInput: '[data-test-id="lab-109-delivered-days"]',
    markDeliveredBtn: '[data-test-id="lab-109-mark-delivered"]',

    // Buyer return 
    returnReasonInput: '[data-test-id="lab-109-return-reason"]',
    evidenceFileInput: '[data-test-id="lab-109-return-evidence"]',
    refundMethodSelect: '[data-test-id="lab-109-return-method"]',
    submitReturnBtn: '[data-test-id="lab-109-submit-return"]',

    // Order summary
    summaryReturnReason: '[data-test-id="lab-109-return-reason"]',
    summaryEvidence: '[data-test-id="lab-109-summary-evidence"]',
    summaryRefundMethod: '[data-test-id="lab-109-summary-refund-method"]',

    // error
    returnError: '[data-test-id="lab-109-return-error"]',
    permissionError: '[data-test-id="lab-109-status"]',
    approveReturnBtn: '[data-test-id="lab-109-approve"]',
    markItemReceivedBtn: '[data-test-id="lab-109-mark-received"]',

    refundTransaction: '[data-test-id="lab-109-refund-id"]',
    refundMethod: '[data-test-id="lab-109-refund-method"]',
    refundStatus: '[data-test-id="lab-109-refund-status"]'
};


describe('TEST', () => {

    beforeEach(() => {
        cy.visit('https://autotestsandbox.com/labs/async-refund-return-workflow');
    });

    it('TC_29 - Buyer mua sản phẩm P011 thành công', () => {

        // ===== PRE-CONDITION =====
        // Buyer chưa đăng nhập
        cy.get(SELECTORS.statusSignin)
            .should('be.visible')
            .and('contain.text', 'Not signed in');

        // Lấy tồn kho ban đầu
        cy.get(SELECTORS.stockValue)
            .should('be.visible')
            .invoke('text')
            .then(text => {
                const stockBefore = Number(text);

                // ===== ACTION =====
                // Đăng nhập Buyer
                cy.get(SELECTORS.signInBuyerBtn)
                    .should('be.visible')
                    .click();

                // Buyer đã đăng nhập
                cy.get(SELECTORS.statusSignin)
                    .should('not.contain.text', 'Not signed in');

                // Mua hàng online
                cy.get(SELECTORS.buyOnlineBtn)
                    .should('be.visible')
                    .click();

                // ===== EXPECTED RESULT =====
                // Trạng thái đơn hàng = PAID
                cy.get(SELECTORS.orderStatus, { timeout: 20000 })
                    .should('be.visible')
                    .and('contain.text', 'PAID');

                // Tồn kho giảm đúng 1
                cy.get(SELECTORS.stockValue)
                    .invoke('text')
                    .then(afterText => {
                        const stockAfter = Number(afterText);
                        expect(stockAfter).to.eq(stockBefore - 1);
                    });
            });
    });

    function createPaidOrderAsBuyer() {
        cy.get(SELECTORS.signInBuyerBtn).click();
        cy.get(SELECTORS.buyOnlineBtn).click();
        cy.get(SELECTORS.orderStatus, { timeout: 20000 })
            .should('contain.text', 'PAID');
    }

    it('TC_30 - Admin đánh dấu đơn đã giao', () => {

        createPaidOrderAsBuyer();

        // Trạng thái đơn hàng ban đầu là PAID
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'PAID');

        // ===== ACTION =====
        // Đăng nhập Admin
        cy.get(SELECTORS.signInAdminBtn)
            .should('be.visible')
            .click();

        cy.get(SELECTORS.statusSignin)
            .should('not.contain.text', 'Not signed in');

        // Nhập Delivered days ago = 3
        cy.get(SELECTORS.deliveredInput)
            .should('be.visible')
            .clear()
            .type('3');

        // Nhấn Mark DELIVERED
        cy.get(SELECTORS.markDeliveredBtn)
            .should('be.visible')
            .click();

        cy.get(SELECTORS.orderStatus, { timeout: 20000 })
            .should('be.visible')
            .and('contain.text', 'DELIVERED');
    });

    function createPaidOrderAsBuyer() {
        cy.get(SELECTORS.signInBuyerBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        cy.get(SELECTORS.buyOnlineBtn).should('be.visible').click();

        cy.get(SELECTORS.orderStatus, { timeout: 20000 })
            .should('be.visible')
            .and('contain.text', 'PAID');
    }

    function markDeliveredAsAdmin(daysAgo = 3) {

        cy.get(SELECTORS.signInAdminBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        cy.get(SELECTORS.deliveredInput).should('be.visible').clear().type(String(daysAgo));
        cy.get(SELECTORS.markDeliveredBtn).should('be.visible').click();

        cy.get(SELECTORS.orderStatus, { timeout: 20000 })
            .should('be.visible')
            .and('contain.text', 'DELIVERED');
    }

    it('TC_31 - Buyer submit return request thành công (DELIVERED <=7 days)', () => {

        // ===== PRE-CONDITION SETUP (độc lập, không phụ thuộc it khác) =====
        createPaidOrderAsBuyer();
        markDeliveredAsAdmin(3);

        // ===== START TC_31 =====
        // về Buyer để return
        // cy.reload();

        cy.get(SELECTORS.signInBuyerBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        // Verify precondition: DELIVERED
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');

        // 2) Nhập Return reason
        const reason = 'Không còn nhu cầu';
        cy.get(SELECTORS.returnReasonInput)
            .should('be.visible')
            .clear()
            .type(reason);

        // 3) Upload Evidence file
        // Cần có file: cypress/fixtures/evidence.png
        cy.get(SELECTORS.evidenceFileInput)
            .should('exist')
            .selectFile('cypress/fixtures/evidence.jpg', { force: true });

        // 4) Chọn refund method WALLET
        cy.get(SELECTORS.refundMethodSelect)
            .should('be.visible')
            .select('WALLET');

        // 5) Submit return request
        cy.get(SELECTORS.submitReturnBtn)
            .should('be.visible')
            .click();

        // ===== EXPECTED RESULT =====
        // 1) Status = RETURN_REQUESTED
        cy.get(SELECTORS.orderStatus, { timeout: 20000 })
            .should('be.visible')
            .and('contain.text', 'RETURN_REQUESTED');

    });

    it('TC_32 - Người mua trả hàng không thành công do thiếu Lý do trả hàng (DELIVERED <=7 days)', () => {

        // ===== PRE-CONDITION SETUP (độc lập, không phụ thuộc it khác) =====
        createPaidOrderAsBuyer();
        markDeliveredAsAdmin(3);

        // ===== START TC_31 =====
        // về Buyer để return
        // cy.reload();

        cy.get(SELECTORS.signInBuyerBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        // Verify precondition: DELIVERED
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');


        // 2) Upload Evidence file
        // Cần có file: cypress/fixtures/evidence.png
        cy.get(SELECTORS.evidenceFileInput)
            .should('exist')
            .selectFile('cypress/fixtures/evidence.jpg', { force: true });

        // 4) Chọn refund method WALLET
        cy.get(SELECTORS.refundMethodSelect)
            .should('be.visible')
            .select('WALLET');

        // 5) Submit return request
        cy.get(SELECTORS.submitReturnBtn)
            .should('be.visible')
            .click();


        cy.get(SELECTORS.returnError)
            .should('be.visible')
            .and('contain.text', 'Return reason is required');

        // 2) Trạng thái đơn hàng KHÔNG đổi
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');
    });

    it('TC_33 - Người mua trả hàng không thành công do thiếu File bằng chứng', () => {

        // ===== PRE-CONDITION SETUP (độc lập, không phụ thuộc it khác) =====
        createPaidOrderAsBuyer();
        markDeliveredAsAdmin(3);

        cy.get(SELECTORS.signInBuyerBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        // Verify precondition: DELIVERED
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');

        const reason = 'Không còn nhu cầu';
        cy.get(SELECTORS.returnReasonInput)
            .should('be.visible')
            .clear()
            .type(reason);

        // 4) Chọn refund method WALLET
        cy.get(SELECTORS.refundMethodSelect)
            .should('be.visible')
            .select('WALLET');

        // 5) Submit return request
        cy.get(SELECTORS.submitReturnBtn)
            .should('be.visible')
            .click();


        cy.get(SELECTORS.returnError)
            .should('be.visible')
            .and('contain.text', 'Evidence file is required.');

        // 2) Trạng thái đơn hàng KHÔNG đổi
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');
    });

    it('TC_34 - Delivered days ago > 7 → Return window expired', () => {

        // ===== PRE-CONDITION SETUP =====
        // 1) Buyer mua hàng → PAID
        createPaidOrderAsBuyer();

        // 2) Admin mark DELIVERED với days = 8 (>7)
        markDeliveredAsAdmin(8);

        // ===== START TEST =====
        // Buyer đăng nhập để trả hàng
        cy.get(SELECTORS.signInBuyerBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        // Verify trạng thái ban đầu
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');

        // 5) Nhập return reason
        const reason = 'Không còn nhu cầu';
        cy.get(SELECTORS.returnReasonInput)
            .should('be.visible')
            .clear()
            .type(reason);

        // 6) Upload evidence file
        cy.get(SELECTORS.evidenceFileInput)
            .should('exist')
            .selectFile('cypress/fixtures/evidence.jpg', { force: true });

        // 7) Chọn refund method = WALLET
        cy.get(SELECTORS.refundMethodSelect)
            .should('be.visible')
            .select('WALLET')
            .should('have.value', 'WALLET');

        // 8) Submit return request
        cy.get(SELECTORS.submitReturnBtn)
            .should('be.visible')
            .click();

        // ===== EXPECTED RESULT =====
        // 1) Hiển thị message quá hạn
        cy.get(SELECTORS.returnError)
            .should('be.visible')
            .and('contain.text', 'Return window expired (7 days)');

        // 2) Trạng thái đơn hàng không đổi
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');
    });

    it('TC_35 -Người mua khác trả hàng không thành công do bị chặn quyền', () => {

        // ===== PRE-CONDITION SETUP =====
        // 1) Buyer mua hàng → PAID
        createPaidOrderAsBuyer();

        // 2) Admin mark DELIVERED với days = 8 (>7)
        markDeliveredAsAdmin(3);

        // ===== START TEST =====
        // Buyer đăng nhập để trả hàng
        cy.get(SELECTORS.signInOtherBuyerBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        // Verify trạng thái ban đầu
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');

        // 5) Nhập return reason
        const reason = 'Không còn nhu cầu';
        cy.get(SELECTORS.returnReasonInput)
            .should('be.visible')
            .clear()
            .type(reason);

        // 6) Upload evidence file
        cy.get(SELECTORS.evidenceFileInput)
            .should('exist')
            .selectFile('cypress/fixtures/evidence.jpg', { force: true });

        // 7) Chọn refund method = WALLET
        cy.get(SELECTORS.refundMethodSelect)
            .should('be.visible')
            .select('WALLET')
            .should('have.value', 'WALLET');

        // 8) Submit return request
        cy.get(SELECTORS.submitReturnBtn)
            .should('be.visible')
            .click();


        cy.get(SELECTORS.permissionError)
            .should('be.visible')
            .and('contain.text', 'Access denied for this order.');

        // 2) Trạng thái đơn hàng không đổi
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'DELIVERED');
    });

    it('TC_36 - Admin chấp nhận trả hàng', () => {


        createPaidOrderAsBuyer();
        markDeliveredAsAdmin(3);
        submitReturnAsBuyer();

        // ===== START TEST =====
        // Buyer đăng nhập để trả hàng
        cy.get(SELECTORS.signInAdminBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        // Verify trạng thái ban đầu
        cy.get(SELECTORS.orderStatus)
            .should('be.visible')
            .and('contain.text', 'RETURN_REQUESTED');


        // Approve return
        cy.get(SELECTORS.approveReturnBtn)
            .should('be.visible')
            .click();

        // ===== EXPECTED RESULT =====
        cy.get(SELECTORS.orderStatus, { timeout: 20000 })
            .should('be.visible')
            .and('contain.text', 'RETURN_APPROVED');
    });

    function submitReturnAsBuyer() {
        const reason = 'Không còn nhu cầu';

        cy.get(SELECTORS.signInBuyerBtn).should('be.visible').click();
        cy.get(SELECTORS.statusSignin).should('not.contain.text', 'Not signed in');

        cy.get(SELECTORS.returnReasonInput)
            .should('be.visible')
            .clear()
            .type(reason);

        cy.get(SELECTORS.evidenceFileInput)
            .should('exist')
            .selectFile('cypress/fixtures/evidence.jpg', { force: true });

        cy.get(SELECTORS.refundMethodSelect)
            .should('be.visible')
            .select('WALLET')
            .should('have.value', 'WALLET');

        cy.get(SELECTORS.submitReturnBtn)
            .should('be.visible')
            .click();

        cy.get(SELECTORS.orderStatus, { timeout: 20000 })
            .should('be.visible')
            .and('contain.text', 'RETURN_REQUESTED');
    }

    it('TC_37 - Warehouse mark item received → refund & inventory complete', () => {

        // ===== PRE-CONDITION SETUP =====
        createPaidOrderAsBuyer();
        markDeliveredAsAdmin(3);

        submitReturnAsBuyer();
        // approveReturnAsAdmin();

        cy.get('[data-test-id="lab-109-login-admin"]').click();
        cy.get('[data-test-id="lab-109-approve"]').click();

        cy.get(SELECTORS.orderStatus, { timeout: 20000 })
            .should('contain.text', 'RETURN_APPROVED');


        // 1) Sign in as Warehouse
        cy.get(SELECTORS.signInWarehouseBtn)
            .should('be.visible')
            .click();

        cy.get(SELECTORS.statusSignin)
            .should('not.contain.text', 'Not signed in');

        // Verify trạng thái ban đầu
        cy.get(SELECTORS.orderStatus)
            .should('contain.text', 'RETURN_APPROVED');

        // Lưu tồn kho trước
        cy.get(SELECTORS.stockValue)
            .invoke('text')
            .then(text => {
                const stockBefore = Number(text);

                // 2) Mark item received
                cy.get(SELECTORS.markItemReceivedBtn)
                    .should('be.visible')
                    .click();


                // 4) Order status = REFUNDED
                cy.get(SELECTORS.orderStatus)
                    .should('contain.text', 'REFUNDED');

                // 5) Inventory +1
                cy.get(SELECTORS.stockValue)
                    .invoke('text')
                    .then(afterText => {
                        const stockAfter = Number(afterText);
                        expect(stockAfter).to.eq(stockBefore + 1);
                    });

                // 6) Refund + inventory details
                cy.get(SELECTORS.refundStatus)
                    .should('contain.text', 'REFUNDED');

                cy.get(SELECTORS.refundTransaction)
                    .should('contain.text', 'RF-109-0001');

                cy.get(SELECTORS.refundMethod)
                    .should('contain.text', 'WALLET');
            });
    });

});
