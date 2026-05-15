const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',

    // IMPORTANT: prevents CI failure on 403
    failOnStatusCode: false,

    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/**/*.feature'
    ],

    supportFile: 'cypress/support/e2e.js',

    video: false,
    screenshotOnRunFailure: true,

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,

    viewportWidth: 1280,
    viewportHeight: 800,
  },
});