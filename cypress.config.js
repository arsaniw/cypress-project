const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    video: false,
    screenshotOnRunFailure: true,

    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,

    viewportWidth: 1280,
    viewportHeight: 800,

    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      return config;
    }
  }
});