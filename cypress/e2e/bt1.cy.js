import { testData, testUsers } from "../fixtures/bt1";

describe("bt1", () => {
  beforeEach(() => {
    cy.visit(
      "https://autotestsandbox.com/labs/healthcare-multi-stage-treatment",
    );
  });
  it("Lab 120: Healthcare Expert E2E: Admission -> Lab Orders -> Delayed Ressults -> Protocol Update -> Doctor Change -> Record Lock", () => {
    //login
    cy.get('[data-test-id="username"]')
      .clear()
      .type(testUsers.reception.username);
    cy.get('[data-test-id="password"]')
      .clear()
      .type(testUsers.reception.password);
    cy.get('[data-test-id="btn-login"]').should("be.visible").click();
    cy.get('[data-test-id="lab-120-role-badge"]').should(
      "have.text",
      "Reception",
    );

    //Admission
    cy.get('[data-test-id="patient-full-name"]')
      .clear()
      .should("be.visible")
      .type(testData.Admission.fullName);
    cy.get('[data-test-id="dob"]')
      .clear()
      .should("be.visible")
      .type(testData.Admission.dateOfBirth);
    cy.get('[data-test-id="gender"]')
      .should("be.visible")
      .select(testData.Admission.gender);
    cy.get('[data-test-id="national-id"]')
      .clear()
      .should("be.visible")
      .type(testData.Admission.nationalID);
    cy.get('[data-test-id="phone"]')
      .clear()
      .should("be.visible")
      .type(testData.Admission.phone);

    cy.get('[data-test-id="address"]')
      .clear()
      .should("be.visible")
      .type(testData.Admission.address);
    cy.get('[data-test-id="admission-reason"]')
      .clear()
      .should("be.visible")
      .type(testData.Admission.admissionReason);
    cy.get('[data-test-id="triage-level"]')
      .should("be.visible")
      .select(testData.Admission.triageLevel);
    cy.get('[data-test-id="initial-department"]')
      .should("be.visible")
      .select(testData.Admission.initialDepartment);
    cy.get('[data-test-id="btn-admit"]').should("be.visible").click();
    cy.get('[data-test-id="lab-120-admission-status"]').should(
      "have.text",
      "ADMITTED",
    );

    cy.contains("ADMITTED").should("be.visible");

    //Lab Orders
    //login
    cy.get('[data-test-id="username"]').clear().type(testUsers.doctor.username);
    cy.get('[data-test-id="password"]').clear().type(testUsers.doctor.password);
    cy.get('[data-test-id="btn-login"]').should("be.visible").click();
    cy.get('[data-test-id="lab-120-role-badge"]').should("have.text", "Doctor");

    // nhập
    cy.get('[data-test-id="lab-priority"]')
      .should("be.visible")
      .select(testData.labOrders.priority);
    cy.get('input[type="checkbox"][value="CRP"]').check().should("be.checked");
    cy.get('[data-test-id="btn-submit-lab-order"]').click();
    cy.get('[data-test-id="lab-120-lab-status"]').should(
      "have.text",
      "LAB_PENDING",
    );

    cy.contains("ADMITTED").should("be.visible");
    cy.contains("ADMITTED").should("be.visible");

    //Delayed Ressults
    //login
    cy.get('[data-test-id="username"]')
      .clear()
      .type(testUsers.labTech.username);
    cy.get('[data-test-id="password"]')
      .clear()
      .type(testUsers.labTech.password);
    cy.get('[data-test-id="btn-login"]').should("be.visible").click();
    cy.get('[data-test-id="lab-120-role-badge"]').should(
      "have.text",
      "LabTech",
    );
    //kq
    cy.get('[data-test-id="result-status"]')
      .should("be.visible")
      .select(testData.labTech.resultStatus);
    cy.get('[data-test-id="result-summary"]')
      .should("be.visible")
      .type(testData.labTech.clinicalNote);
    cy.get('[data-test-id="btn-publish-result"]').should("be.visible").click();
    cy.get('[data-test-id="lab-120-logout"]').should("be.visible").click();
    //Protocol Update
    //login
    cy.get('[data-test-id="username"]').clear().type(testUsers.doctor.username);
    cy.get('[data-test-id="password"]').clear().type(testUsers.doctor.password);
    cy.get('[data-test-id="btn-login"]').should("be.visible").click();
    cy.get('[data-test-id="lab-120-role-badge"]').should("have.text", "Doctor");
    
    cy.get('[data-test-id="diagnosis"]').should("be.visible");
 
 
  });
});
