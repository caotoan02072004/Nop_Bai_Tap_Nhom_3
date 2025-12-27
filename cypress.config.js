const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://beta.cheppy.ai',
    env: {
      // Đọc từ .env file
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
      grant_type: process.env.CYPRESS_GRANT_TYPE,
      client_id: process.env.CYPRESS_CLIENT_ID
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});