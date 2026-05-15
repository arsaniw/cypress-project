/**
 * CartPage class - Contains selectors and methods specific to the Shopping Cart page
 */
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor() {
    super();
    this.pageUrl = '/cart';
  }

  // Selectors
  getCartItems() {
    return cy.get('[data-test="cart-item"], .cart-item, tr[data-product-id]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getCartItemByName(itemName) {
    return cy.contains('[data-test="cart-item"], .cart-item, tr', itemName, {
      timeout: this.pageLoadTimeout,
    });
  }

  getCartItemQuantity(itemName) {
    return this.getCartItemByName(itemName).parent().find('input[type="number"]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getRemoveButton(itemName) {
    return cy.contains('button, a', /remove|delete/i, { timeout: this.pageLoadTimeout }).filter(
      `:contains("${itemName}")`.parent()
    );
  }

  getCartTotal() {
    return cy.get('[data-test="cart-total"], .total, .grand-total', {
      timeout: this.pageLoadTimeout,
    });
  }

  getSubtotal() {
    return cy.get('[data-test="subtotal"], .subtotal', { timeout: this.pageLoadTimeout });
  }

  getTax() {
    return cy.get('[data-test="tax"], .tax, .sales-tax', { timeout: this.pageLoadTimeout });
  }

  getCheckoutButton() {
    return this.getButton(/checkout|proceed to checkout|buy/i);
  }

  getContinueShoppingButton() {
    return this.getButton(/continue shopping/i);
  }

  getEmptyCartMessage() {
    return cy.contains('empty|no items|cart is empty', { timeout: this.pageLoadTimeout });
  }

  getPromoCodeInput() {
    return cy.get('input[id*="promo"], input[placeholder*="Promo"]', {
      timeout: this.pageLoadTimeout,
    });
  }

  getApplyPromoButton() {
    return this.getButton(/apply|use code/i);
  }

  // Actions
  openCart() {
    this.navigateTo(this.pageUrl);
  }

  updateQuantity(itemName, newQuantity) {
    this.getCartItemQuantity(itemName).clear().type(newQuantity);
  }

  removeItem(itemName) {
    this.getCartItemByName(itemName)
      .parent()
      .contains('button, a', /remove|delete/i, { timeout: this.pageLoadTimeout })
      .click();
  }

  proceedToCheckout() {
    this.getCheckoutButton().click();
  }

  continueShopping() {
    this.getContinueShoppingButton().click();
  }

  applyCoupon(couponCode) {
    this.getPromoCodeInput().type(couponCode);
    this.getApplyPromoButton().click();
  }

  // Assertions
  assertCartItemPresent(itemName) {
    this.getCartItemByName(itemName).should('exist').and('be.visible');
  }

  assertCartItemNotPresent(itemName) {
    cy.contains('[data-test="cart-item"], .cart-item', itemName, {
      timeout: this.pageLoadTimeout,
    }).should('not.exist');
  }

  assertCartEmpty() {
    this.getEmptyCartMessage().should('be.visible');
    this.getCartItems().should('have.length', 0);
  }

  assertCartNotEmpty() {
    this.getCartItems().should('have.length.greaterThan', 0);
  }

  assertCartTotalUpdated() {
    this.getCartTotal().should('be.visible');
  }

  assertCheckoutButtonVisible() {
    this.getCheckoutButton().should('be.visible').and('be.enabled');
  }

  assertMultipleItemsInCart(count) {
    this.getCartItems().should('have.length.greaterThan', count);
  }

  assertItemQuantity(itemName, quantity) {
    this.getCartItemQuantity(itemName).should('have.value', quantity);
  }
}

module.exports = CartPage;
