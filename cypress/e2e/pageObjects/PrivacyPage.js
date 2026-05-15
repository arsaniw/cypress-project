/**
 * PrivacyPage class - Contains selectors and methods for the Privacy Policy page
 */
const BasePage = require('./BasePage');

class PrivacyPage extends BasePage {
  constructor() {
    super();
    this.pageUrl = '/privacy';
  }

  // Selectors
  getPageTitle() {
    return cy.get('h1, [data-test="page-title"]', { timeout: this.pageLoadTimeout });
  }

  getPageContent() {
    return cy.get('main, .content, article', { timeout: this.pageLoadTimeout });
  }

  getPrivacyPolicySections() {
    return cy.get('h2, h3, [data-section]', { timeout: this.pageLoadTimeout });
  }

  getDataProtectionSection() {
    return cy.contains('h2, h3, span', /data|protection|privacy/i, {
      timeout: this.pageLoadTimeout,
    });
  }

  getCookiesSection() {
    return cy.contains('h2, h3, span', /cookies/i, { timeout: this.pageLoadTimeout });
  }

  getPolicyText() {
    return cy.get('p, span, div', { timeout: this.pageLoadTimeout });
  }

  getContactLink() {
    return cy.contains('a', /contact|email/i, { timeout: this.pageLoadTimeout });
  }

  getLastUpdatedDate() {
    return cy.contains(/last updated|updated on|last modified/i, {
      timeout: this.pageLoadTimeout,
    });
  }

  // Actions
  openPrivacyPage() {
    this.navigateTo(this.pageUrl);
  }

  scrollToSection(sectionName) {
    cy.contains('h2, h3', new RegExp(sectionName, 'i'), {
      timeout: this.pageLoadTimeout,
    }).scrollIntoView();
  }

  clickContactLink() {
    this.getContactLink().click();
  }

  // Assertions
  assertPrivacyPageLoaded() {
    this.assertUrlIncludes('/privacy');
    cy.contains('body', /privacy/i, { timeout: this.pageLoadTimeout }).should('exist');
  }

  assertPrivacyPolicyVisible() {
    this.getPageContent().should('be.visible');
  }

  assertPrivacyContentExists() {
    cy.contains(/privacy|data|cookies|policy/i, {
      timeout: this.pageLoadTimeout,
    }).should('exist');
  }

  assertDataProtectionMentioned() {
    cy.contains(/data|protection/i, { timeout: this.pageLoadTimeout }).should('exist');
  }

  assertCookiesPolicyMentioned() {
    cy.contains(/cookies|tracking/i, { timeout: this.pageLoadTimeout }).should('exist');
  }

  assertPolicySectionsPresent() {
    this.getPrivacyPolicySections().should('have.length.greaterThan', 0);
  }

  assertLastUpdatedDatePresent() {
    this.getLastUpdatedDate().should('exist');
  }

  assertContactInformationPresent() {
    this.getContactLink().should('exist');
  }
}

module.exports = PrivacyPage;
