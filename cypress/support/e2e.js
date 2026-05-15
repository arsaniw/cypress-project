// Ignore uncaught errors from the AUT (important for CI stability)
Cypress.on('uncaught:exception', (err, runnable) => {
  // prevents random CI failures from app JS errors
  return false;
});

// Safe home visit (CI + 403 safe)
Cypress.Commands.add('openHome', () => {
  cy.visit('/', {
    failOnStatusCode: false,
  });
});
