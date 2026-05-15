
// Ignore uncaught errors from the website (important for CI stability)
Cypress.on('uncaught:exception', () => {
  return false;
});

// Safe home visit (fixes 403 crash handling)
Cypress.Commands.add('openHome', () => {
  cy.visit('/', {
    failOnStatusCode: false,
  });
});
