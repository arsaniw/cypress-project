# Page Object Model (POM) Architecture Guide

## Overview

The Page Object Model is a design pattern that creates an object-oriented abstraction of the pages being tested. This project implements a comprehensive POM structure for maintainability and scalability.

## Architecture

### Class Hierarchy

```
BasePage
├── HomePage
├── ProductPage
├── CartPage
├── NavigationPage
└── PrivacyPage
```

### BasePage - The Foundation

`BasePage.js` is the parent class containing common functionality:

```javascript
class BasePage {
  constructor() {
    this.pageLoadTimeout = 10000;
  }

  // Common methods all pages inherit
  navigateTo(path)
  clickElement(selector)
  fillInput(selector, value)
  assertPageLoaded()
  assertUrlIncludes(path)
}
```

#### Key Methods in BasePage

| Method | Purpose | Example |
|--------|---------|---------|
| `getSearchInput()` | Locate search field | `this.getSearchInput().type('hammer')` |
| `getNavigationBar()` | Locate nav menu | `this.getNavigationBar().should('exist')` |
| `getButton(text)` | Find button by text | `this.getButton('Add to Cart').click()` |
| `navigateTo(path)` | Navigate to URL | `this.navigateTo('/cart')` |
| `assertElementVisible(selector)` | Assert visibility | `this.assertElementVisible('.product')` |

### HomePage - Home Page Objects

`HomePage.js` extends BasePage with home-specific functionality:

```javascript
class HomePage extends BasePage {
  // Home page specific selectors
  getProductList()
  getCategoryFilter()
  getBrandFilter()
  getSortDropdown()

  // Home page specific actions
  searchProduct(keyword)
  selectCategory(categoryName)
  selectBrand(brandName)
  sortProducts(sortOption)

  // Home page specific assertions
  assertHomePageLoaded()
  assertProductsDisplayed()
  assertSearchResultsContain(keyword)
}
```

#### HomePage Usage Example

```javascript
const homePage = new HomePage();

// Search for a product
homePage.searchProduct('hammer');
homePage.assertSearchResultsContain('hammer');

// Apply filters
homePage.selectCategory('Hand Tools');
homePage.selectBrand('Bahco');

// Verify results
homePage.assertProductsDisplayed();
```

### ProductPage - Product Details

`ProductPage.js` for individual product pages:

```javascript
class ProductPage extends BasePage {
  // Product selectors
  getProductTitle()
  getProductPrice()
  getAddToCartButton()
  getQuantityInput()
  getStockStatus()

  // Actions
  addProductToCart(quantity)
  openRelatedProduct(productName)

  // Assertions
  assertProductPageLoaded(productName)
  assertProductDetailsPresent()
  assertProductInStock()
}
```

#### ProductPage Usage Example

```javascript
const productPage = new ProductPage();

// Open product and verify
productPage.assertProductPageLoaded('Hammer 16oz');
productPage.assertProductDetailsPresent();

// Add to cart
productPage.addProductToCart(2); // Quantity of 2

// Verify stock
productPage.assertProductInStock();
```

### CartPage - Shopping Cart

`CartPage.js` for cart operations:

```javascript
class CartPage extends BasePage {
  // Cart selectors
  getCartItems()
  getCartItemByName(itemName)
  getCartTotal()
  getCheckoutButton()
  getEmptyCartMessage()

  // Actions
  updateQuantity(itemName, quantity)
  removeItem(itemName)
  proceedToCheckout()
  applyCoupon(couponCode)

  // Assertions
  assertCartItemPresent(itemName)
  assertCartEmpty()
  assertCheckoutButtonVisible()
}
```

#### CartPage Usage Example

```javascript
const cartPage = new CartPage();

// Verify items in cart
cartPage.assertCartItemPresent('Hammer');
cartPage.assertCartNotEmpty();

// Manage cart
cartPage.updateQuantity('Hammer', 3);
cartPage.assertItemQuantity('Hammer', 3);

// Checkout
cartPage.proceedToCheckout();
```

### NavigationPage - Header & Footer

`NavigationPage.js` for common navigation:

```javascript
class NavigationPage extends BasePage {
  // Header selectors
  getHeader()
  getNavLinks()
  getLogo()
  getCartIcon()
  getAccountIcon()

  // Footer selectors
  getFooter()
  getFooterLinks()
  getPrivacyPolicyLink()
  getCopyrightText()

  // Actions
  clickLogo()
  clickNavLink(linkText)
  clickFooterLink(linkText)
  clickPrivacyPolicy()

  // Assertions
  assertHeaderPresent()
  assertFooterPresent()
  assertPrivacyLinkPresent()
}
```

#### NavigationPage Usage Example

```javascript
const navigationPage = new NavigationPage();

// Test header
navigationPage.assertHeaderPresent();
navigationPage.clickNavLink('Products');

// Test footer
navigationPage.assertFooterPresent();
navigationPage.clickPrivacyPolicy();
```

### PrivacyPage - Privacy Policy

`PrivacyPage.js` for privacy-specific content:

```javascript
class PrivacyPage extends BasePage {
  // Privacy selectors
  getPageContent()
  getPrivacyPolicySections()
  getDataProtectionSection()
  getCookiesSection()

  // Actions
  scrollToSection(sectionName)

  // Assertions
  assertPrivacyPageLoaded()
  assertDataProtectionMentioned()
  assertCookiesPolicyMentioned()
}
```

## Using POM in Tests

### Traditional Test with POM

```javascript
// cypress/e2e/search.cy.js
const HomePage = require('./pageObjects/HomePage');
const ProductPage = require('./pageObjects/ProductPage');

describe('Search Tests', () => {
  let homePage;
  let productPage;

  before(() => {
    homePage = new HomePage();
    productPage = new ProductPage();
  });

  it('should find hammer product', () => {
    homePage.openHome();
    homePage.searchProduct('hammer');
    homePage.assertSearchResultsContain('hammer');
  });

  it('should open product details', () => {
    homePage.openHome();
    homePage.searchProduct('hammer');
    productPage.assertProductPageLoaded('Hammer');
    productPage.assertProductDetailsPresent();
  });
});
```

### BDD Test with POM

```javascript
// cypress/e2e/step_definitions/search.steps.js
const HomePage = require('../pageObjects/HomePage');

let homePage;

Given('the user opens the home page', () => {
  homePage = new HomePage();
  homePage.openHome();
});

When('the user searches for {string}', (keyword) => {
  homePage.searchProduct(keyword);
});

Then('the search results should contain {string}', (keyword) => {
  homePage.assertSearchResultsContain(keyword);
});
```

## Best Practices

### 1. Separation of Concerns

```javascript
// ✅ GOOD: Selector + Action + Assertion separated
getAddToCartButton() {
  return cy.contains('button', /add to cart/i);
}

addProductToCart() {
  this.getAddToCartButton().click();
}

assertProductAdded() {
  cy.contains('Added to cart').should('be.visible');
}

// ❌ BAD: Mixed concerns
addProduct() {
  cy.contains('button', /add to cart/i).click();
  cy.contains('Added to cart').should('be.visible');
}
```

### 2. DRY Principle

```javascript
// ✅ GOOD: Reusable selector
getProductCard(productName) {
  return cy.contains('.product-card', productName);
}

addProduct(productName) {
  this.getProductCard(productName)
    .find('button.add-to-cart')
    .click();
}

removeProduct(productName) {
  this.getProductCard(productName)
    .find('button.remove')
    .click();
}

// ❌ BAD: Repeated selectors
addProduct(productName) {
  cy.contains('.product-card', productName)
    .find('button.add-to-cart')
    .click();
}

removeProduct(productName) {
  cy.contains('.product-card', productName)
    .find('button.remove')
    .click();
}
```

### 3. Meaningful Names

```javascript
// ✅ GOOD: Clear method names
getCartItemQuantityInput(itemName)
assertProductInStockAndAvailable()
proceedToCheckoutWithValidation()

// ❌ BAD: Ambiguous names
getItem(name)
checkProduct()
goToCheckout()
```

### 4. Chainable Methods

```javascript
// ✅ GOOD: Methods work well with Cypress chains
getCartItems()
  .should('have.length.greaterThan', 0)
  .first()
  .should('contain', 'Hammer');

// Selector methods return cy chains
getButton(text) {
  return cy.contains('button', text);
}

// Can be chained immediately
this.getButton('Delete').click();
```

### 5. Error Handling

```javascript
// ✅ GOOD: Clear error messages
assertProductFound(productName) {
  cy.contains('.product-name', productName, {
    timeout: 10000,
  })
    .should('exist')
    .and('be.visible');
}

// ❌ BAD: Generic assertions
assertExists() {
  cy.get('.something').should('exist');
}
```

## Creating New Page Objects

### Step-by-Step Guide

1. **Identify Page**: What page/section are you testing?

2. **Create Class**:
```javascript
const BasePage = require('./BasePage');

class NewPage extends BasePage {
  constructor() {
    super();
    this.pageUrl = '/new-page';
  }
}

module.exports = NewPage;
```

3. **Add Selectors**:
```javascript
getPageTitle() {
  return cy.get('h1', { timeout: this.pageLoadTimeout });
}

getMainContent() {
  return cy.get('main, .content', { timeout: this.pageLoadTimeout });
}
```

4. **Add Actions**:
```javascript
openPage() {
  this.navigateTo(this.pageUrl);
}

scrollToSection(sectionName) {
  cy.contains('h2', sectionName).scrollIntoView();
}
```

5. **Add Assertions**:
```javascript
assertPageLoaded() {
  this.assertUrlIncludes(this.pageUrl);
  this.getPageTitle().should('be.visible');
}

assertContentPresent() {
  this.getMainContent().should('be.visible');
}
```

## Selector Strategies

### Priority Order

1. **Data attributes** (most stable)
   ```javascript
   cy.get('[data-test="product-title"]')
   ```

2. **Semantic HTML**
   ```javascript
   cy.get('h1, h2, button')
   ```

3. **Aria labels**
   ```javascript
   cy.get('[aria-label="Add to cart"]')
   ```

4. **Class selectors**
   ```javascript
   cy.get('.product-card')
   ```

5. **Contains** (last resort)
   ```javascript
   cy.contains('button', /Add to Cart/i)
   ```

### Selector Examples

```javascript
// ✅ GOOD
getAddToCartButton() {
  return cy.get('[data-testid="add-to-cart"]');
}

// ✅ GOOD
getProductTitle() {
  return cy.get('h1[data-product-id]');
}

// ⚠️ FRAGILE
getDeleteButton() {
  return cy.get('button:nth-child(3)');
}

// ❌ AVOID
getButton() {
  return cy.get('div > span > button');
}
```

## Testing with POM

### Complete Example

```javascript
// cypress/e2e/complete-flow.cy.js
const HomePage = require('./pageObjects/HomePage');
const ProductPage = require('./pageObjects/ProductPage');
const CartPage = require('./pageObjects/CartPage');
const NavigationPage = require('./pageObjects/NavigationPage');

describe('Complete Shopping Flow', () => {
  let homePage, productPage, cartPage, navigationPage;

  before(() => {
    homePage = new HomePage();
    productPage = new ProductPage();
    cartPage = new CartPage();
    navigationPage = new NavigationPage();
  });

  it('should complete a purchase flow', () => {
    // 1. Home page
    homePage.openHome();
    homePage.assertHomePageLoaded();

    // 2. Search
    homePage.searchProduct('hammer');
    homePage.assertSearchResultsContain('hammer');

    // 3. Product details
    productPage.assertProductPageLoaded('Hammer');
    productPage.addProductToCart();

    // 4. Cart
    navigationPage.clickCartIcon();
    cartPage.assertCartItemPresent('Hammer');

    // 5. Checkout
    cartPage.proceedToCheckout();
    cy.url().should('include', '/checkout');
  });
});
```

## Maintenance Tips

1. **Regular Reviews**: Review POM quarterly for improvements
2. **Update Selectors**: When UI changes, update selectors
3. **Add Documentation**: Comment complex selectors
4. **Keep DRY**: Consolidate duplicate code
5. **Version Control**: Track POM changes in git

## Performance Considerations

- Avoid nested loops in POM methods
- Cache frequently used selectors
- Use `cy.within()` for isolated searches
- Implement custom waits for dynamic content

## Troubleshooting

### Selector Not Found
```javascript
// Add debugging
getElement(selector) {
  cy.log(`Searching for: ${selector}`);
  return cy.get(selector, { timeout: this.pageLoadTimeout });
}
```

### Flaky Tests
```javascript
// Use explicit waits
getButton(text) {
  return cy.contains('button', text, {
    timeout: 15000, // Increase timeout
  });
}
```

### Maintenance Burden
```javascript
// Keep methods focused and reusable
// Avoid creating methods for every single click
// Use step definitions for test logic
```

---

**POM ensures tests are:**
- ✅ Maintainable
- ✅ Scalable
- ✅ Readable
- ✅ Reusable
- ✅ Resilient to UI changes
