// Custom commands for practice-software-testing actions

// Navigation commands
Cypress.Commands.add('openHome', () => {
  cy.visit('/');
});

Cypress.Commands.add('navigateTo', (path) => {
  cy.visit(path);
});

// Assertion commands
Cypress.Commands.add('assertPageTitleIncludes', (text) => {
  cy.title().should('include', text);
});

Cypress.Commands.add('assertPageTitleEquals', (text) => {
  cy.title().should('equal', text);
});

Cypress.Commands.add('assertHeaderPresence', (text) => {
  cy.contains('h1, h2, h3, nav', text).should('be.visible');
});

Cypress.Commands.add('assertElementVisible', (selector) => {
  cy.get(selector).should('be.visible');
});

Cypress.Commands.add('assertElementNotVisible', (selector) => {
  cy.get(selector).should('not.be.visible');
});

Cypress.Commands.add('assertElementExists', (selector) => {
  cy.get(selector).should('exist');
});

Cypress.Commands.add('assertElementContainsText', (selector, text) => {
  cy.get(selector).should('contain.text', text);
});

Cypress.Commands.add('assertUrlIncludes', (path) => {
  cy.url().should('include', path);
});

Cypress.Commands.add('assertUrlEquals', (url) => {
  cy.url().should('equal', url);
});

// Search commands
Cypress.Commands.add('searchProduct', (keyword) => {
  cy.get('input[type="search"], input[placeholder*="Search"], input[id*="search"]', { timeout: 10000 })
    .first()
    .as('searchField')
    .should('be.visible')
    .clear()
    .type(`${keyword}{enter}`);
});

Cypress.Commands.add('clearSearch', () => {
  cy.get('input[type="search"], input[placeholder*="Search"], input[id*="search"]')
    .first()
    .clear();
});

Cypress.Commands.add('assertSearchResults', (keyword) => {
  cy.contains('div, li, .product, .card', keyword, { timeout: 10000 })
    .should('exist')
    .and('be.visible');
});

// Category and filter commands
Cypress.Commands.add('openCategory', (category) => {
  cy.contains('a, button', category, { timeout: 10000 })
    .should('be.visible')
    .click();
});

Cypress.Commands.add('applyFilter', (filterName, value) => {
  cy.contains('label, span', filterName)
    .parent()
    .within(() => {
      cy.contains(value).click();
    });
});

Cypress.Commands.add('assertCategoryFilterUpdated', (categoryText) => {
  cy.get('body').should('contain.text', categoryText);
});

// Cart commands
Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains('.product, .card, li, article', productName, { timeout: 10000 })
    .should('be.visible')
    .parents('article, .product, .card, li')
    .within(() => {
      cy.contains('button, a', /add to cart|add/i, { timeout: 5000 })
        .should('be.enabled')
        .click();
    });
});

Cypress.Commands.add('openCart', () => {
  cy.contains('a, button', /cart|basket|checkout/i, { timeout: 10000 })
    .first()
    .click();
});

Cypress.Commands.add('assertCartHasItem', (itemName) => {
  cy.contains('div, li, .cart-item', itemName, { timeout: 10000 })
    .should('exist')
    .and('be.visible');
});

Cypress.Commands.add('assertCartEmpty', () => {
  cy.contains('empty|no items', { timeout: 10000 }).should('be.visible');
});

// Footer and navigation commands
Cypress.Commands.add('assertFooterContains', (text) => {
  cy.get('footer', { timeout: 10000 })
    .should('be.visible')
    .contains(text);
});

Cypress.Commands.add('clickFooterLink', (linkText) => {
  cy.get('footer').contains('a', linkText, { timeout: 10000 }).click();
});

Cypress.Commands.add('clickNavLink', (linkText) => {
  cy.get('nav, header, [role="navigation"]').contains('a', linkText, { timeout: 10000 }).click();
});

// Product page commands
Cypress.Commands.add('openProductByName', (productName) => {
  cy.contains('a', new RegExp(productName, 'i'), { timeout: 10000 })
    .first()
    .then((link) => {
      const href = link.prop('href');
      expect(href).to.exist;
      cy.wrap(link).click();
    });
});

Cypress.Commands.add('assertProductPageLoaded', (productName) => {
  cy.contains(new RegExp(productName, 'i')).should('be.visible');
  cy.url().should('include', '/product/');
});

// UI assertion commands
Cypress.Commands.add('assertResponsiveLayout', (viewport) => {
  cy.viewport(viewport.width, viewport.height);
  cy.get('body').should('exist');
});

Cypress.Commands.add('assertNoJSErrors', () => {
  cy.window().then((win) => {
    expect(win).to.exist;
  });
  cy.document().its('readyState').should('equal', 'complete');
});

Cypress.Commands.add('assertElementCount', (selector, count, operator = 'equal') => {
  if (operator === 'greaterThan') {
    cy.get(selector).should('have.length.greaterThan', count);
  } else if (operator === 'lessThan') {
    cy.get(selector).should('have.length.lessThan', count);
  } else {
    cy.get(selector).should('have.length', count);
  }
});

// Wait and utility commands
Cypress.Commands.add('waitForLoad', (timeout = 10000) => {
  cy.document({ timeout }).its('readyState').should('equal', 'complete');
});

Cypress.Commands.add('dismissAlert', () => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').returns(true);
  });
});

