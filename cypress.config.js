const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'https://beta.cheppy.ai',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    env: {
      // Đọc từ .env file
      username: process.env.CHEPPY_USERNAME,
      password: process.env.CHEPPY_PASSWORD,
      grant_type: process.env.CHEPPY_GRANT_TYPE,
      client_id: process.env.CHEPPY_CLIENT_ID,
      authenticate: process.env.CHEPPY_AUTH,
      fileUrl: process.env.FILE_URL
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args = launchOptions.args.filter(arg =>
            arg !== '--enable-automation'
          );

          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--disable-features=IsolateOrigins,site-per-process');
          launchOptions.args.push('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

          launchOptions.args.push('--disable-infobars');
          launchOptions.args.push('--start-maximized');

          return launchOptions;
        }

        return launchOptions;
      });
    },
    chromeWebSecurity: false,
    modifyObstructiveCode: true,
    experimentalModifyObstructiveThirdPartyCode: true,
  },
});