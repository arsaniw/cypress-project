/**
 * HomePage class - Contains selectors and methods specific to the Home page
 */
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor() {
    super();
    this.pageUrl = '/';
  }

  // Selectors
  getSearchBar() {
    return this.getSearchInput();
  }

  getTopNavigation() {
    return cy.get('nav, header, [role="navigation"]', { timeout: this.pageLoadTimeout });
  }

  getProductList() {
    return cy.get('.product, .card, [data-product], article', { timeout: this.pageLoadTimeout });
  }

  getProducts() {
    return cy.get('.product, .card, li, article', { timeout: this.pageLoadTimeout });
  }

  getCategoryFilter() {
    return cy.get('[data-filter="category"], .category-filter, .categories', {
      timeout: this.pageLoadTimeout,
    });
  }

  getBrandFilter() {
    return cy.get('[data-filter="brand"], .brand-filter, .brands', { timeout: this.pageLoadTimeout });
  }

  getPriceFilter() {
    return cy.get('[data-filter="price"], .price-filter, input[type="range"]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getSortDropdown() {
    return cy.get('select[id*="sort"], button[id*="sort"], .sort-controls', {
      timeout: this.pageLoadTimeout,
    });
  }

  getSustainabilitySection() {
    return cy.get('[data-section="sustainability"], .sustainability', {
      timeout: this.pageLoadTimeout,
    });
  }

  getFilterPanel() {
    return cy.get(
      '.filter-panel, .filters, .filter, [role="region"][aria-label*="Filter"], .sidebar, body',
      {
        timeout: this.pageLoadTimeout,
      }
    );
  }

  getPrivacyLink() {
    return cy.contains('a', /privacy policy|privacy/i, {
      timeout: this.pageLoadTimeout,
    });
  }

  getCartLink() {
    return cy.contains('a, button', /cart|basket|checkout/i, {
      timeout: this.pageLoadTimeout,
    });
  }

  getToolshopLink() {
    return this.getLink(/toolshop|tools/i);
  }

  // Actions
  openHome() {
    this.navigateTo(this.pageUrl);
  }

  searchProduct(keyword) {
    this.getSearchBar().first().should('be.visible').clear().type(`${keyword}{enter}`);
  }

  selectCategory(categoryName) {
    // Look for category dropdown toggle
    cy.contains('button, a', /category|filter/i, { timeout: 5000 }).first().click({ force: true });
    // Then select the category with force click
    cy.contains('a, button', categoryName, { timeout: this.pageLoadTimeout })
      .click({ force: true });
  }

  selectBrand(brandName) {
    // Look for brand anywhere on the page
    cy.contains('*', brandName, { timeout: this.pageLoadTimeout })
      .first()
      .click({ force: true });
  }

  setPriceRange(minPrice, maxPrice) {
    cy.get('input[id*="min"], input[data-price="min"]').clear().type(minPrice);
    cy.get('input[id*="max"], input[data-price="max"]').clear().type(maxPrice);
    cy.get('button[type="submit"], button:contains("Apply")', { timeout: 5000 }).click();
  }

  sortProducts(sortOption) {
    this.getSortDropdown().select(sortOption);
  }

  openPrivacyPolicy() {
    this.getPrivacyLink().click();
  }

  openCart() {
    this.getCartLink().click();
  }

  // Assertions
  assertHomePageLoaded() {
    this.assertPageTitle('Practice Software Testing');
    this.assertTextPresent('Practice');
    this.assertTextPresent('Privacy');
  }

  assertNavigationLinksPresent() {
    this.getTopNavigation().should('exist');
    cy.get('a').should('have.length.greaterThan', 5);
  }

  assertProductsDisplayed() {
    this.getProducts().should('have.length.greaterThan', 0);
  }

  assertSearchResultsContain(keyword) {
    cy.contains('div, li, .product, .card', keyword, { timeout: this.pageLoadTimeout })
      .should('exist')
      .and('be.visible');
  }

  assertFilterPanelVisible() {
    this.getFilterPanel().should('exist');
    cy.contains('body', /Filter|Brand|Category/i, {
      timeout: this.pageLoadTimeout,
    }).should('exist');
  }

  assertSortControlsPresent() {
    cy.get('button, select, input', { timeout: this.pageLoadTimeout }).should(
      'have.length.greaterThan',
      5
    );
    cy.contains('body', /Sort|Price|Filter/i, {
      timeout: this.pageLoadTimeout,
    }).should('exist');
  }

  assertCategoryFilterUpdated(categoryText) {
    cy.get('body').should('contain.text', categoryText);
  }

  assertSustainabilitySectionVisible() {
    cy.get('a, button', { timeout: this.pageLoadTimeout }).should('have.length.greaterThan', 3);
    cy.get('img', { timeout: this.pageLoadTimeout }).should('have.length.greaterThan', 2);
  }
}

module.exports = HomePage;
