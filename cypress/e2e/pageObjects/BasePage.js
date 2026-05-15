/**
 * BasePage class - Contains common methods and selectors used across all pages
 */
class BasePage {
  constructor() {
    this.pageLoadTimeout = 10000;
  }

  // Common selectors
  getSearchInput() {
    return cy.get('input[type="search"], input[placeholder*="Search"], input[id*="search"]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getNavigationBar() {
    return cy.get('nav, header, [role="navigation"]', { timeout: this.pageLoadTimeout });
  }

  getFooter() {
    return cy.get('footer', { timeout: this.pageLoadTimeout });
  }

  getButton(text) {
    return cy.contains('button, a', text, { timeout: this.pageLoadTimeout });
  }

  getLink(text) {
    return cy.contains('a', text, { timeout: this.pageLoadTimeout });
  }

  getHeading(level = 1) {
    return cy.get(`h${level}`, { timeout: this.pageLoadTimeout });
  }

  getBodyText() {
    return cy.get('body');
  }

  // Common actions
  clickElement(selector) {
    return cy.get(selector, { timeout: this.pageLoadTimeout }).click();
  }

  fillInput(selector, value) {
    return cy.get(selector, { timeout: this.pageLoadTimeout }).clear().type(value);
  }

  navigateTo(path) {
    cy.visit(path);
  }

  reloadPage() {
    cy.reload();
  }

  // Common assertions
  assertPageLoaded() {
    cy.document({ timeout: this.pageLoadTimeout }).its('readyState').should('equal', 'complete');
  }

  assertPageTitle(title) {
    cy.title().should('include', title);
  }

  assertUrlIncludes(path) {
    cy.url().should('include', path);
  }

  assertElementVisible(selector) {
    cy.get(selector, { timeout: this.pageLoadTimeout }).should('be.visible');
  }

  assertElementExists(selector) {
    cy.get(selector, { timeout: this.pageLoadTimeout }).should('exist');
  }

  assertTextPresent(text) {
    cy.contains(text, { timeout: this.pageLoadTimeout }).should('exist');
  }

  assertTextVisible(text) {
    cy.contains(text, { timeout: this.pageLoadTimeout }).should('be.visible');
  }

  assertNoJSErrors() {
    cy.window().then((win) => {
      expect(win).to.exist;
    });
  }

  // Utility methods
  waitForElement(selector) {
    cy.get(selector, { timeout: this.pageLoadTimeout }).should('exist');
  }

  switchViewport(width, height) {
    cy.viewport(width, height);
  }

  // Clear storage
  clearStorage() {
    cy.clearCookies();
    cy.clearLocalStorage();
  }
}

module.exports = BasePage;
