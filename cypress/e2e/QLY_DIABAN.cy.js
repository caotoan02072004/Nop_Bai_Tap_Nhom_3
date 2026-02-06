import AreaPage from '../../Nhap/cypress/support/pages/AreaPage';
import AreaSearchPage from '../../Nhap/cypress/support/pages/AreaSearchPage';
import ApprovalAreaPage from '../../Nhap/cypress/support/pages/ApprovalAreaPage';
import CitizenStructureModalPage from '../../Nhap/cypress/support/pages/CitizenStructureModalPage';
import ApprovalAreaSearchPage from '../../Nhap/cypress/support/pages/ApprovalAreaSearchPage';
import ApprovalAreaEditPage from '../../Nhap/cypress/support/pages/ApprovalAreaEditPage';

describe('Quản lý địa bàn', () => {
    let areaPage;
    let areaSearchPage;
    let approvalAreaPage;
    let citizenStructureModalPage;
    let approvalAreaSearchPage;
    let approvalAreaEditPage;

    let testData, testData2, testData3, testData4;
    areaPage = new AreaPage();
    areaSearchPage = new AreaSearchPage();
    approvalAreaPage = new ApprovalAreaPage();
    citizenStructureModalPage = new CitizenStructureModalPage();
    approvalAreaSearchPage = new ApprovalAreaSearchPage();
    approvalAreaEditPage = new ApprovalAreaEditPage();


    beforeEach(() => {
        // Dữ liệu test khai báo 1 lần
        testData = { code: 'KHUPHO.040', name: 'Địa bàn 1767943567353' }; // KHUPHO.040 Địa bàn 1767943567353
        testData2 = { code: 'KHUPHO.040', name: 'Địa bàn 1767943567353' };
        testData3 = {
            householdRegistrationNumberInput: '0195379136', //0195379139
            idNumberInput: '010827179200',//010831274800
            LocalId: 'địa bàn test 4321',
            CharacteristicResidence: 'Nhà trọ',
            CharacteristicOwnership: 'Chính chủ',
            Purpose: 'Để ở',
            Household: 'Hộ gia đình',
        };
        testData4 = {
            code: 'KHUPHO.043', ///KHUPHO.045
            name: 'Thôn Meme',//Địa bàn 1767943647699
            localTypeId: 'Khu phố',
            newname: 'Thôn 123',
            statusSelect: 'Không sử dụng',
        };

        // Đăng nhập 1 lần cho toàn bộ các test
        cy.checkTokenAndLogin('030302003834', 'DevTest@123456');
    });


    it('Đăng nhập và mở trang yêu cầu địa bàn', () => {
        cy.visit('https://dd3a.devlead.top/cskv-ct/danh-muc-dia-ban/yeu-cau-thay-doi-dia-ban');
        cy.get('.task-bar', { timeout: 20000 }).should('be.visible');
    });

    it('Thêm mới địa bàn thành công', () => {
        cy.visit('https://dd3a.devlead.top/cskv-ct/danh-muc-dia-ban/yeu-cau-thay-doi-dia-ban');
        cy.contains('button', 'Thêm mới').click();

        areaPage.fillGeneralInfo({
            name: 'Thôn Mây',
            localType: 'Thôn',
            status: 'Đang sử dụng',
            boundary: true
        });

        areaPage.fillLeaderInfo({
            idNumber: '010822911200',
            fullName: 'LƯU THỊ KHẢI',
            termStart: '2020',
            termEnd: '2025'
        });

        areaPage.datePicker.selectDate('19051959');
        cy.get('body').click(0, 0, { force: true });

        areaPage.submitButton().click({ force: true });
        cy.contains('Xác thực thành công', { timeout: 10000 }).should('be.visible');
    });

    it('Gửi yêu cầu bổ sung, cập nhật địa bàn', () => {
        cy.visit('https://dd3a.devlead.top/cskv-ct/danh-muc-dia-ban/yeu-cau-thay-doi-dia-ban');

        areaSearchPage
            .fillSearchInfo({ code: testData.code, name: testData.name })
            .search();

        areaSearchPage.clickSend();

        // Xác nhận modal gửi thông tin
        cy.get('.ant-modal')
            .should('be.visible')
            .within(() => {
                cy.contains('Xác nhận gửi thông tin địa bàn').should('be.visible');
                cy.contains('button', 'Đồng ý').click();
            });

        // Kiểm tra trạng thái
        cy.contains('td', testData.code)
            .parents('tr')
            .find('.ant-tag')
            .should('exist');
    });

    it('Phê duyệt yêu cầu bổ sung, cập nhật địa bàn', () => {
        cy.visit('https://dd3a.devlead.top/cskv-ct/danh-muc-dia-ban/phe-duyet-yeu-cau-thay-doi-dia-ban');

        approvalAreaPage.search({
            code: testData2.code,
            name: testData2.name
        });

        approvalAreaPage.rowByCode(testData2.code).should('exist');
        approvalAreaPage.statusOfRow(testData2.code).should('contain.text', 'Chờ duyệt');

        approvalAreaPage.btnApprove(testData2.code).click();
        approvalAreaPage.confirmApprove();

        cy.contains('Phê duyệt thành công', { timeout: 10000 }).should('be.visible');
    });

    it('Cấu trúc dữ liệu hộ nhân khẩu gắn với địa bàn', () => {
        cy.visit('https://dd3a.devlead.top/cskv-ct/cau-truc-du-lieu/danh-sach-cau-truc-du-lieu');

        citizenStructureModalPage
            .fillSearchInfo({
                householdRegistrationNumber: testData3.householdRegistrationNumberInput,
                idNumber: testData3.idNumberInput
            })
            .search();

        citizenStructureModalPage
            .rowByCode(testData3.householdRegistrationNumberInput)
            .should('exist');

        citizenStructureModalPage
            .openStructure(testData3.householdRegistrationNumberInput)
            .selectLocalId(testData3.LocalId)
            .selectCharacteristicResidence(testData3.CharacteristicResidence)
            .selectCharacteristicOwnership(testData3.CharacteristicOwnership)
            .selectPurpose(testData3.Purpose)
            .selectHousehold(testData3.Household)
            .clickSave();
    });

    it('Dừng hoạt động địa bàn', () => {
        cy.visit('https://dd3a.devlead.top/cskv-ct/danh-muc-dia-ban/yeu-cau-thay-doi-dia-ban')
        cy.get('.task-bar', { timeout: 20000 }).should('be.visible');
        approvalAreaSearchPage
            .fillSearchInfo({
                code: testData4.code,
                name: testData4.name,
                // localTypeId: testData4.localTypeId
            })
            .clickSearch()
            .clickEdit(testData4.code);
        approvalAreaEditPage
            .modalShouldBeVisible()
            .fillNewName(testData4.newname)
        approvalAreaEditPage
            .selectStatus(testData4.statusSelect)
            .clickSave();
        cy.contains('Lưu dữ liệu thành công', { timeout: 10000 }).should('be.visible')
    })
})


