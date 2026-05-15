/**
 * ProductPage class - Contains selectors and methods for individual product pages
 */
const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor() {
    super();
  }

  // Selectors
  getProductTitle() {
    return cy.get('h1, [data-test="product-title"]', { timeout: this.pageLoadTimeout });
  }

  getProductDescription() {
    return cy.get('[data-test="product-description"], .product-description, p', {
      timeout: this.pageLoadTimeout,
    });
  }

  getProductPrice() {
    return cy.get('[data-test="product-price"], .price, span[data-price]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getProductImage() {
    return cy.get('img[data-test="product-image"], .product-image img', {
      timeout: this.pageLoadTimeout,
    });
  }

  getAddToCartButton() {
    return cy.contains('button, a', /add to cart|add/i, { timeout: this.pageLoadTimeout });
  }

  getQuantityInput() {
    return cy.get('input[type="number"], input[id*="quantity"]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getStockStatus() {
    return cy.get('[data-test="stock-status"], .stock-status, span:contains("Stock")', {
      timeout: this.pageLoadTimeout,
    });
  }

  getProductRating() {
    return cy.get('[data-test="product-rating"], .rating, .stars', {
      timeout: this.pageLoadTimeout,
    });
  }

  getRelatedProducts() {
    return cy.get('[data-test="related-products"], .related-products, .suggestions', {
      timeout: this.pageLoadTimeout,
    });
  }

  getBackButton() {
    return this.getButton(/back|< Back/i);
  }

  // Actions
  addProductToCart(quantity = 1) {
    if (quantity > 1) {
      this.getQuantityInput().clear().type(quantity);
    }
    this.getAddToCartButton().should('be.enabled').click();
  }

  openProductByName(productName) {
    cy.contains('a', new RegExp(productName, 'i'), {
      timeout: this.pageLoadTimeout,
    })
      .first()
      .then((link) => {
        const href = link.prop('href');
        expect(href).to.exist;
        cy.wrap(link).click();
      });
  }

  openRelatedProduct(productName) {
    this.getRelatedProducts().contains('a', productName, { timeout: this.pageLoadTimeout }).click();
  }

  goBack() {
    this.getBackButton().click();
  }

  // Assertions
  assertProductPageLoaded(productName) {
    cy.contains(new RegExp(productName, 'i'), { timeout: this.pageLoadTimeout }).should('be.visible');
    this.assertUrlIncludes('/product/');
  }

  assertProductDetailsPresent() {
    this.getProductTitle().should('be.visible');
    cy.get('body', { timeout: this.pageLoadTimeout }).then(($body) => {
      const priceSelector =
        '[data-test="product-price"], .price, span[data-price], [itemprop="price"], .product-cost, .price-tag';
      if ($body.find(priceSelector).length) {
        cy.get(priceSelector, { timeout: this.pageLoadTimeout }).first().should('be.visible');
      } else {
        cy.contains(/\$|€|£/, { timeout: this.pageLoadTimeout }).should('exist');
      }
      const imageSelector =
        'img[data-test="product-image"], .product-image img, img[alt*="product"], img';
      cy.get(imageSelector, { timeout: this.pageLoadTimeout }).first().should('be.visible');
    });
  }

  assertAddToCartButtonVisible() {
    this.getAddToCartButton().should('be.visible').and('be.enabled');
  }

  assertProductInStock() {
    cy.contains('text', /in stock|available/i, { timeout: this.pageLoadTimeout }).should('exist');
  }

  assertProductOutOfStock() {
    cy.contains('text', /out of stock|unavailable/i, { timeout: this.pageLoadTimeout }).should('exist');
  }

  assertProductDescription() {
    this.getProductDescription().should('be.visible');
  }

  assertRelatedProductsVisible() {
    this.getRelatedProducts().should('exist');
  }
}

module.exports = ProductPage;
