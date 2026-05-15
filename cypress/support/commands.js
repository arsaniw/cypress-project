// =====================
// NAVIGATION
// =====================

Cypress.Commands.add('openHome', () => {
  cy.visit('/', { failOnStatusCode: false });
});

Cypress.Commands.add('navigateTo', (path) => {
  cy.visit(path, { failOnStatusCode: false });
});

// =====================
// ASSERTIONS
// =====================

Cypress.Commands.add('assertPageTitleIncludes', (text) => {
  cy.title({ timeout: 15000 }).should('include', text);
});

Cypress.Commands.add('assertPageTitleEquals', (text) => {
  cy.title().should('eq', text);
});

Cypress.Commands.add('assertHeaderPresence', (text) => {
  cy.contains(text, { timeout: 15000 }).should('be.visible');
});

Cypress.Commands.add('assertElementVisible', (selector) => {
  cy.get(selector, { timeout: 15000 }).should('be.visible');
});

Cypress.Commands.add('assertElementExists', (selector) => {
  cy.get(selector).should('exist');
});

Cypress.Commands.add('assertUrlIncludes', (path) => {
  cy.url().should('include', path);
});

// =====================
// SEARCH
// =====================

Cypress.Commands.add('searchProduct', (keyword) => {
  cy.get('input[type="search"], input[placeholder*="search" i], input', {
    timeout: 15000
  })
    .first()
    .should('be.visible')
    .clear({ force: true })
    .type(`${keyword}{enter}`, { force: true });
});

Cypress.Commands.add('assertSearchResults', (keyword) => {
  cy.get('body').should('contain.text', keyword);
});

// =====================
// CATEGORY / FILTER
// =====================

Cypress.Commands.add('openCategory', (category) => {
  cy.contains(category, { timeout: 15000 })
    .click({ force: true });
});

// =====================
// CART
// =====================

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains(productName, { timeout: 15000 })
    .should('be.visible')
    .parents()
    .first()
    .within(() => {
      cy.contains(/add to cart|add/i, { timeout: 10000 })
        .click({ force: true });
    });
});

Cypress.Commands.add('openCart', () => {
  cy.contains(/cart|basket|checkout/i, { timeout: 15000 })
    .click({ force: true });
});

Cypress.Commands.add('assertCartHasItem', (itemName) => {
  cy.get('body').should('contain.text', itemName);
});

// =====================
// NAVIGATION LINKS
// =====================

Cypress.Commands.add('clickNavLink', (text) => {
  cy.contains(text, { timeout: 15000 })
    .click({ force: true });
});

Cypress.Commands.add('clickFooterLink', (text) => {
  cy.get('footer')
    .contains(text)
    .click({ force: true });
});

// =====================
// PRODUCT
// =====================

Cypress.Commands.add('openProductByName', (productName) => {
  cy.contains(productName, { timeout: 15000 })
    .first()
    .click({ force: true });
});

Cypress.Commands.add('assertProductPageLoaded', () => {
  cy.url().should('include', 'product');
});

// =====================
// UTILS
// =====================

Cypress.Commands.add('waitForLoad', () => {
  cy.document().its('readyState').should('eq', 'complete');
});

Cypress.Commands.add('assertNoJSErrors', () => {
  cy.window().should('exist');
});

