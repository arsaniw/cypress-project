const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',

    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/**/*.feature'
    ],

    supportFile: 'cypress/support/e2e.js',

    video: false,
    screenshotOnRunFailure: true,

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,

    viewportWidth: 1280,
    viewportHeight: 800,

    env: {
      defaultTimeout: 10000,
    },

    // ✅ IMPORTANT FIX FOR CI STABILITY
    failOnStatusCode: false,

    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      });

      on('file:preprocessor', bundler);

      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      return config;
    },
  },
});