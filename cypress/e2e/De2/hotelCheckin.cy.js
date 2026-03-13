describe("Hotel Checkin", () => {

  beforeEach(() => {
    cy.visit("https://autotestsandbox.com/labs/hotel-guest-checkin-checkout-services-payment")
  })

  it("Checkin → Service → Checkout → Payment", () => {

    cy.fixture("hotelData").then((data) => {

      data.forEach((d) => {
        // STEP 1: Click Sign in as Receptionist
        cy.contains("Sign in as Receptionist").click()

        // Verify đã sign in thành công
        cy.contains("Signed in as reception01.").should("be.visible")

        // STEP 2: Đăng ký nhận phòng

        cy.get('[data-test-id="lab-111-booking-code"]')
        .type(d.BookingCode)

        cy.get('[data-test-id="lab-111-room-number"]')
        .select(d.roomNumber)

        cy.get('[data-test-id="lab-111-guest-full-name"]')
        .type(d.guestName)

        cy.get('[data-test-id="lab-111-guest-id-number"]')
        .type(d.nationalid)

        cy.get('[data-test-id="lab-111-guest-phone"]')
        .type(d.phone)

        cy.get('[data-test-id="lab-111-checkin-datetime"]')
        .type(d.checkinDatetime)

        cy.get('[data-test-id="lab-111-planned-checkout-datetime"]')
        .type(d.plannedCheckout)

        cy.get('[data-test-id="lab-111-num-guests"]')
        .type(d.depositAmount)

        cy.get('[data-test-id="lab-111-btn-confirm-checkin"]').click()

       // verify checkin thành công
      cy.contains("CHECKED_IN").should("be.visible")

        // STEP 3: Thêm dịch vụ

        cy.get('[data-test-id="lab-111-btn-add-service"]').click()

        cy.get('[data-test-id="lab-111-service-type"]')
        .select(d.serviceType)

        cy.get('[data-test-id="lab-111-btn-add-service-confirm"]').click()

        // Verify service đã thêm
        cy.contains("Service added").should("be.visible")

        // STEP 4: Checkout

        cy.get('[data-test-id="lab-111-actual-checkout-datetime"]')
        .type(d.actualCheckout)
        
        cy.get('[data-test-id="lab-111-btn-confirm-checkout"]').click()

       // Verify trạng thái checkout
        cy.contains("Check-out successful").should("be.visible")

        // STEP 5: Payment

        cy.get('[data-test-id="lab-111-payment-method"]')
        .select(d.paymentMethod)

        cy.get('[data-test-id="lab-111-pay-amount"]')
        .type(d.payAmount)

        cy.get('[data-test-id="lab-111-btn-pay"]').click()

        // Verify trạng thái payment
        cy.contains("Payment successful").should("be.visible")

        // STEP 5: Verify timeline

       cy.get('[data-test-id="lab-111-timeline"] li')
      .should('have.length', 4)

      cy.get('[data-test-id="lab-111-timeline"] li').eq(3)
     .should('contain', 'CHECKED_IN')

cy.get('[data-test-id="lab-111-timeline"] li').eq(2)
  .should('contain', 'SERVICE_ADDED')

cy.get('[data-test-id="lab-111-timeline"] li').eq(1)
  .should('contain', 'CHECKED_OUT')

cy.get('[data-test-id="lab-111-timeline"] li').eq(0)
  .should('contain', 'PAID')
      })

    })

  })

}),


describe("Focus Trap", () => {

  it("alert hiển thị đúng nội dung first in trap đã nhập", () => {

    // STEP 1: Truy cập trang
    cy.visit("https://autotestsandbox.com/examples/focus-trap")

    // STEP 2: Nhập Outside input
    cy.get('[data-test-id="focus-trap-primary"]')
      .type("KO")

    // STEP 3: Nhập Secondary note
    cy.get('[data-test-id="focus-trap-secondary"]')
      .type("This is secondary note")

    // STEP 4: Nhấn Open trap
    cy.contains("Open trap").click()


    // STEP 5
const firstTrapText = "Hello Cypress"

cy.get('input[placeholder="First in trap"]').type(firstTrapText)

cy.window().then((win) => {
  cy.stub(win, "alert").as("alert")
})

cy.contains("Save").click()

cy.get("@alert").should(
  "have.been.calledWith",
  "Saved value: Hello Cypress"
)

})
  }),

describe("Dropdown with dynamic options from API", () => {
  it("Load options", () => {
    cy.visit("https://autotestsandbox.com/labs/dropdown-with-dynamic-options-from-api")

    // Click load options
    cy.contains('button', 'Load options').click()

    // Kiểm tra trạng thái
    cy.get('[data-test-id="lab-012-status"]')
    .should('be.visible')
    .and('have.text', 'Loaded 5 options')

    // Kiểm tra số lượng option
    cy.get("select option").should("have.length", 5)

    //  Nhấn nút giả lập lỗi
    cy.contains('button', 'Simulate failure').click()

    // Kiểm tra thông báo lỗi
    cy.get('[data-test-id="lab-012-status"]')
      .should("be.visible")
      .and("have.text", "API error: failed to load options")
  })
}),

describe("Rename file before upload", () => {

  beforeEach(() => {
    cy.visit("https://autotestsandbox.com/labs/rename-file-before-upload")
  })

  it("Upload file với tên mới nhưng giữ nguyên đuôi file", () => {

    // Chọn file
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/Kim Oanh.txt', { force: true })

    // Nhập tên mới (không kèm extension)
    cy.get('[data-test-id="lab-066-name"]')
      .clear()
      .type("Oanh Xinh")

    // Click upload
    cy.contains('button', 'Upload').click()

    // Expected Result: hiển thị tên file mới + đuôi gốc
    cy.get('[data-test-id="lab-066-final"]')
      .should("be.visible")
      .and("contain", "Oanh Xinh.txt")

  })
}),

describe("Handle API Rate Limit 429", () => {

  it("Verify success request and rate limit 429", () => {

    cy.visit("https://autotestsandbox.com/labs/handle-api-rate-limit-429")

    // intercept API
    cy.intercept("GET", "**/api/**").as("sendRequest")

    // Nhấn gửi request lần đầu
    cy.contains("Send request").click()

    // Kiểm tra trạng thái thành công
    cy.wait("@sendRequest").its("response.statusCode")
      .should("eq", 200)

    cy.contains("Request succeeded.").should("be.visible")

    // click nhiều lần
Cypress._.times(10, () => {
  cy.contains('Send request').click()
})

cy.wait('@sendRequest').should((interception) => {
  expect(interception.response.statusCode).to.be.oneOf([200, 429])
})

    cy.contains("Too many requests").should("be.visible")

  })
})