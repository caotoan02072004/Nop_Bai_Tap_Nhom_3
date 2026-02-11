import './commands'
import '@testing-library/cypress/add-commands'
import 'cypress-xpath'
import '@4tw/cypress-drag-drop'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Bỏ qua các lỗi từ ứng dụng của bên thứ 3 (như Google Ads)
  if (err.message.includes('adsbygoogle.push() error: No slot size')) {
    // Trả về false để ngăn Cypress làm fail test
    return false;
  }
  // Nếu là các lỗi khác, Cypress sẽ xử lý theo mặc định (làm fail test)
});