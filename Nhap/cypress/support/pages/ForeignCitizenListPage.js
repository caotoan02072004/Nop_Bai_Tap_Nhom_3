export default  class ForeignCitizenListPage {
  visit() {
    cy.visit("https://dd3a.devlead.top/cskv-ct/nguoi-nuoc-ngoai/quan-ly-nguoi-nuoc-ngoai");
  }

  // form tìm kiếm : form.ant-form.f-search
  searchForm() {
    return cy.get("form.ant-form.f-search", { timeout: 20000 });
  }

  // ----- field getters theo formcontrolname -----
  nationalitySelect() {
    return this.searchForm().find('app-select[formcontrolname="nationalityCode"] nz-select');
  }
  fullNameInput() {
    return this.searchForm().find('app-input[formcontrolname="fullName"] input');
  }
  citizenIdInput() {
    return this.searchForm().find('app-input[formcontrolname="citizenId"] input');
  }
  localPoliceSelect() {
    return this.searchForm().find('app-select[formcontrolname="localPoliceId"] nz-select');
  }
  approvalStatusSelect() {
    return this.searchForm().find('app-select[formcontrolname="approvalStatus"] nz-select');
  }
  localIdSelect() {
    return this.searchForm().find('app-select[formcontrolname="localId"] nz-select');
  }

  // tỉnh/thành + phường/xã đang disabled (ant-select-disabled) => chỉ assert hiển thị
  provinceDisabledValue() {
    return this.searchForm().find(".province nz-select.ant-select-disabled nz-select-item");
  }
  wardDisabledValue() {
    return this.searchForm().find(".ward nz-select.ant-select-disabled nz-select-item");
  }

  btnRefresh() {
    return this.searchForm().contains("button", /Làm mới/i);
  }
  btnSearch() {
    // type="submit" + text "Tìm kiếm"
    return this.searchForm().contains("button", /Tìm kiếm/i);
  }

  btnAddNew() {
    return cy.contains("button", /Thêm mới/i, { timeout: 20000 });
  }

  // ---------- helpers ----------
  selectByText(selectEl, optionText) {
    cy.wrap(selectEl).scrollIntoView().click({ force: true });
    cy.get(".ant-select-item-option-content", { timeout: 20000 })
      .contains(new RegExp(optionText, "i"))
      .click({ force: true });
  }

  clearAll() {
    // “Làm mới” là cách đúng nhất vì reset cả select
    this.btnRefresh().click({ force: true });
  }

  fillSearch(data = {}) {
    if (data.nationalityCode) this.selectByText(this.nationalitySelect(), data.nationalityCode);
    if (data.fullName !== undefined)
      this.fullNameInput().scrollIntoView().clear({ force: true }).type(String(data.fullName), { force: true });

    if (data.citizenId !== undefined)
      this.citizenIdInput().scrollIntoView().clear({ force: true }).type(String(data.citizenId), { force: true });

    if (data.localPoliceId) this.selectByText(this.localPoliceSelect(), data.localPoliceId);
    if (data.approvalStatus) this.selectByText(this.approvalStatusSelect(), data.approvalStatus);
    if (data.localId) this.selectByText(this.localIdSelect(), data.localId);
  }

  submitSearch() {
    this.btnSearch().should("be.visible").click({ force: true });
  }

  // ---------- result area (bạn chỉnh selector theo table thật) ----------
  // Mình để generic: ít nhất assert “có kết quả” hoặc “không có dữ liệu”
  assertHasAnyResult() {
    cy.get("body").then($b => {
      const hasNoData = $b.find(".ant-empty").length > 0;
      if (hasNoData) {
        cy.log("Có ant-empty (no data) - không pass assertHasAnyResult");
      }
    });
    // Nếu table dùng Ant Table:   
    cy.get(".ant-table-tbody tr", { timeout: 20000 }).its("length").should("be.greaterThan", 0);
  }

  assertNoData() {
    // AntD empty
    cy.get(".ant-empty", { timeout: 20000 }).should("be.visible");
  }
}