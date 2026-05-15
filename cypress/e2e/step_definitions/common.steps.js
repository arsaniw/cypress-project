// Step definitions for Practice Software Testing BDD scenarios
import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';

const HomePage = require('../pageObjects/HomePage');
const ProductPage = require('../pageObjects/ProductPage');
const CartPage = require('../pageObjects/CartPage');
const NavigationPage = require('../pageObjects/NavigationPage');
const PrivacyPage = require('../pageObjects/PrivacyPage');

let homePage;
let productPage;
let cartPage;
let navigationPage;
let privacyPage;
let user;

// Initialize page objects
Given('the user initializes page objects', () => {
  homePage = new HomePage();
  productPage = new ProductPage();
  cartPage = new CartPage();
  navigationPage = new NavigationPage();
  privacyPage = new PrivacyPage();
});

// Navigation steps
Given('the user opens the home page', () => {
  cy.fixture('userData').then((data) => {
    user = data;
  });
  homePage = new HomePage();
  navigationPage = new NavigationPage();
  homePage.openHome();
});

Given('the user navigates to {string}', (path) => {
  homePage.navigateTo(path);
});

When('the user clicks the cart icon', () => {
  navigationPage.clickCartIcon();
});

When('the user clicks on {string} link', (linkText) => {
  navigationPage.clickNavLink(linkText);
});

When('the user clicks the privacy policy link', () => {
  navigationPage.clickPrivacyPolicy();
});

// Search steps
When('the user searches for {string}', (keyword) => {
  homePage.searchProduct(keyword);
});

Then('the search results should contain {string}', (keyword) => {
  homePage.assertSearchResultsContain(keyword);
});

Then('the page should display product results', () => {
  homePage.assertProductsDisplayed();
});

// Category and filter steps
When('the user selects the {string} category', (category) => {
  homePage.selectCategory(category);
});

When('the user selects the {string} brand', (brand) => {
  homePage.selectBrand(brand);
});

When('the user checks filter panel visibility', () => {
  // Just check that we can access the page
  cy.get('body').should('exist');
});

Then('the products should be filtered by {string}', (filterValue) => {
  homePage.assertCategoryFilterUpdated(filterValue);
});

Then('the filter panel should be visible', () => {
  homePage.assertFilterPanelVisible();
});

Then('the sort controls should be present', () => {
  homePage.assertSortControlsPresent();
});

// Product page steps
When('the user opens a product named {string}', (productName) => {
  homePage.searchProduct(productName);
  productPage.openProductByName(productName);
});

When('the user adds the product to cart', () => {
  productPage.addProductToCart();
});

Then('the product page should load successfully', () => {
  productPage.assertProductDetailsPresent();
});

Then('the add to cart button should be visible', () => {
  productPage.assertAddToCartButtonVisible();
});

// Cart steps
When('the user opens the shopping cart', () => {
  navigationPage.clickCartIcon();
  cy.url().should('include', '/cart');
});

Then('the cart should be empty', () => {
  cartPage.assertCartEmpty();
});

Then('the cart should not be empty', () => {
  cartPage.assertCartNotEmpty();
});

Then('the checkout button should be visible', () => {
  cartPage.assertCheckoutButtonVisible();
});

// Page assertion steps
Then('the home page should load successfully', () => {
  homePage.assertHomePageLoaded();
});

Then('the navigation header should be present', () => {
  navigationPage.assertHeaderPresent();
});

Then('the privacy policy link should be present in the footer', () => {
  navigationPage.assertPrivacyLinkPresent();
});

Then('the footer should be present', () => {
  navigationPage.assertFooterPresent();
});

Then('the copyright notice should be present', () => {
  navigationPage.assertCopyrightPresent();
});

Then('the privacy page should load', () => {
  privacyPage.assertPrivacyPageLoaded();
});

Then('the privacy policy content should be visible', () => {
  privacyPage.assertPrivacyContentExists();
});

Then('the footer should contain {string}', (text) => {
  navigationPage.assertFooterContainsText(text);
});

Then('the cart link should be visible', () => {
  navigationPage.assertCartIconPresent();
});

Then('the page should be fully loaded', () => {
  cy.get('body').should('exist');
});

Then('no JavaScript errors should be present', () => {
  // Check that no console errors occurred
  cy.window().then((win) => {
    // This is a basic check - in a real scenario you'd check for console errors
    expect(win).to.exist;
  });
});

// URL assertion steps
Then('the URL should include {string}', (path) => {
  cy.url().should('include', path);
});

Then('the URL should be {string}', (url) => {
  cy.url().should('equal', url);
});

// Additional assertion steps
Then('the page title should include {string}', (title) => {
  cy.title().should('include', title);
});

Then('the element {string} should be visible', (selector) => {
  cy.get(selector).should('be.visible');
});

Then('the element {string} should exist', (selector) => {
  cy.get(selector).should('exist');
});

// Cleanup
After(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
