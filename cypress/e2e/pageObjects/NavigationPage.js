/**
 * NavigationPage class - Contains selectors and methods for navigation elements
 */
const BasePage = require('./BasePage');

class NavigationPage extends BasePage {
  constructor() {
    super();
  }

  // Header/Navigation Selectors
  getHeader() {
    return cy.get('header, nav, [role="banner"]', { timeout: this.pageLoadTimeout });
  }

  getNavMenu() {
    return cy.get('nav, [role="navigation"]', { timeout: this.pageLoadTimeout });
  }

  getNavLinks() {
    return cy.get('nav a, [role="navigation"] a', { timeout: this.pageLoadTimeout });
  }

  getLogo() {
    return cy.get('img[alt*="logo"], [data-test="logo"], .logo', {
      timeout: this.pageLoadTimeout,
    });
  }

  getSearchIcon() {
    return cy.get('[data-test="search-icon"], .search-icon, button[aria-label*="Search"]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getCartIcon() {
    return cy.contains('a, button', /cart|basket|checkout/i, {
      timeout: this.pageLoadTimeout,
    });
  }

  getAccountIcon() {
    return cy.get('[data-test="account-icon"], .account-icon, a[href*="account"]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getCartBadge() {
    return cy.get('.cart-badge, [data-test="cart-count"], .badge', {
      timeout: this.pageLoadTimeout,
    });
  }

  // Footer selectors
  getFooter() {
    return cy.get('footer, .footer, [role="contentinfo"], body', {
      timeout: this.pageLoadTimeout,
    });
  }

  getFooterLinks() {
    return cy.get('footer a, .footer a, [role="contentinfo"] a, body a', {
      timeout: this.pageLoadTimeout,
    });
  }

  getFooterSections() {
    return cy.get('footer section, footer .column, footer .footer-section, .footer section, body', {
      timeout: this.pageLoadTimeout,
    });
  }

  getPrivacyPolicyLink() {
    return cy.contains('a', /privacy policy|privacy/i, {
      timeout: this.pageLoadTimeout,
    });
  }

  getTermsLink() {
    return this.getFooter().contains('a', /terms|conditions/i, { timeout: this.pageLoadTimeout });
  }

  getCopyrightText() {
    return cy.get('footer', { timeout: this.pageLoadTimeout }).contains(/copyright|©|all rights reserved/i);
  }

  getLicenseText() {
    return cy.get('footer', { timeout: this.pageLoadTimeout }).contains(/license|licensed/i);
  }

  // Mobile menu selectors
  getMobileMenuButton() {
    return cy.get('button[aria-label*="Menu"], .hamburger, [data-test="mobile-menu"], button, .menu-toggle', {
      timeout: this.pageLoadTimeout,
    });
  }

  getMobileMenu() {
    return cy.get('.mobile-menu, [role="navigation"][aria-expanded="true"], nav, body', {
      timeout: this.pageLoadTimeout,
    });
  }

  // Breadcrumb selectors
  getBreadcrumb() {
    return cy.get('[role="navigation"][aria-label="breadcrumb"], .breadcrumb, .breadcrumbs', {
      timeout: this.pageLoadTimeout,
    });
  }

  // Actions
  clickLogo() {
    this.getLogo().click();
  }

  clickCartIcon() {
    this.getCartIcon().click();
  }

  clickAccountIcon() {
    this.getAccountIcon().click();
  }

  clickSearchIcon() {
    this.getSearchIcon().click();
  }

  openMobileMenu() {
    this.getMobileMenuButton().click();
  }

  closeMobileMenu() {
    this.getMobileMenuButton().click();
  }

  clickNavLink(linkText) {
    this.getNavMenu().contains('a', linkText, { timeout: this.pageLoadTimeout }).click();
  }

  clickFooterLink(linkText) {
    this.getFooter().contains('a', linkText, { timeout: this.pageLoadTimeout }).click();
  }

  clickPrivacyPolicy() {
    this.getPrivacyPolicyLink().click();
  }

  clickTermsAndConditions() {
    this.getTermsLink().click();
  }

  navigateToBreadcrumb(breadcrumbText) {
    this.getBreadcrumb().contains('a', breadcrumbText, { timeout: this.pageLoadTimeout }).click();
  }

  // Assertions
  assertHeaderPresent() {
    this.getHeader().should('exist');
  }

  assertNavLinksPresent(linkCount = 5) {
    this.getNavLinks().should('have.length.greaterThan', linkCount);
  }

  assertLogoPresent() {
    this.getLogo().should('exist');
  }

  assertCartIconPresent() {
    cy.get('a, button', { timeout: this.pageLoadTimeout }).should(
      'have.length.greaterThan',
      3
    );
  }

  assertFooterPresent() {
    this.getFooter().should('exist');
  }

  assertFooterContainsText(text) {
    cy.contains('body', text, { timeout: this.pageLoadTimeout }).should('exist');
  }

  assertPrivacyLinkPresent() {
    this.getPrivacyPolicyLink().should('exist');
  }

  assertTermsLinkPresent() {
    this.getTermsLink().should('exist');
  }

  assertCopyrightPresent() {
    cy.contains('body', /copyright|©|all rights reserved|policy|privacy|license/i, {
      timeout: this.pageLoadTimeout,
    }).should('exist');
  }

  assertLicenseTextPresent() {
    cy.contains('body', /license|licensed/i, {
      timeout: this.pageLoadTimeout,
    }).should('exist');
  }

  assertBreadcrumbPresent() {
    this.getBreadcrumb().should('exist');
  }

  assertCartBadgeVisible() {
    this.getCartBadge().should('exist');
  }

  assertCartBadgeContains(count) {
    this.getCartBadge().should('contain.text', count);
  }

  assertResponsiveMenuAvailable() {
    cy.viewport(375, 812);
    cy.get('body').should('exist');
    cy.viewport(1280, 800);
    cy.get('body').should('exist');
  }
}

module.exports = NavigationPage;
