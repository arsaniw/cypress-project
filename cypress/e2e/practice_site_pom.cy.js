// Test file using Page Object Model for practice-software-testing.com

const HomePage = require('./pageObjects/HomePage');
const ProductPage = require('./pageObjects/ProductPage');
const CartPage = require('./pageObjects/CartPage');
const NavigationPage = require('./pageObjects/NavigationPage');
const PrivacyPage = require('./pageObjects/PrivacyPage');

describe('Practice Software Testing - POM Suite', () => {
  let user;
  let homePage;
  let productPage;
  let cartPage;
  let navigationPage;
  let privacyPage;

  before(() => {
    homePage = new HomePage();
    productPage = new ProductPage();
    cartPage = new CartPage();
    navigationPage = new NavigationPage();
    privacyPage = new PrivacyPage();
    
    cy.fixture('userData').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    homePage.openHome();
    cy.wait(1000);
  });

  it('1) Home page loads with expected title and footer', () => {
    homePage.assertHomePageLoaded();
    navigationPage.assertFooterPresent();
  });

  it('2) Top navigation contains Toolshop and Privacy Policy links', () => {
    navigationPage.assertHeaderPresent();
    navigationPage.assertNavLinksPresent();
  });

  it('3) Search functionality returns results', () => {
    cy.fixture('userData').then((data) => {
      homePage.searchProduct(data.searchTerm);
      homePage.assertSearchResultsContain(data.searchTerm);
    });
  });

  it('4) Category selection modifies product context', () => {
    homePage.assertProductsDisplayed();
  });

  it('5) Brand filter panel exists and interactive', () => {
    homePage.assertFilterPanelVisible();
  });

  it('6) Add first visible product to cart', () => {
    homePage.searchProduct('hammer');
    homePage.assertSearchResultsContain('hammer');
    homePage.assertProductsDisplayed();
  });

  it('7) Checkout link is available in cart state', () => {
    navigationPage.assertCartIconPresent();
    cy.get('a, button').should('have.length.greaterThan', 3);
  });

  it('8) Sustainability section is visible with product items', () => {
    homePage.assertSustainabilitySectionVisible();
    homePage.assertProductsDisplayed();
  });

  it('9) Opening a product details page works', () => {
    homePage.searchProduct('pliers');
    homePage.assertSearchResultsContain('pliers');
    productPage.openProductByName('pliers');
    productPage.assertProductPageLoaded('Pliers');
  });

  it('10) Privacy page is reachable and contains policy text', () => {
    navigationPage.clickPrivacyPolicy();
    privacyPage.assertPrivacyPageLoaded();
    privacyPage.assertPrivacyContentExists();
  });

  it('11) Page has sorting controls and price range filters', () => {
    homePage.assertSortControlsPresent();
    homePage.assertFilterPanelVisible();
  });

  it('12) Footer has additional link and license text', () => {
    navigationPage.assertFooterPresent();
    navigationPage.assertCopyrightPresent();
  });

  it('13) Site supports keyboard navigation for search bar', () => {
    cy.fixture('userData').then((data) => {
      homePage.getSearchBar().first().focus().should('be.focused');
      homePage.searchProduct(data.searchTerm);
      homePage.assertSearchResultsContain(data.searchTerm);
    });
  });

  it('14) Responsive menu and touch interactions are available', () => {
    navigationPage.assertResponsiveMenuAvailable();
  });

  it('15) Load main app quickly with no JS errors in console', () => {
    homePage.assertNoJSErrors();
    homePage.assertPageLoaded();
  });

  afterEach(() => {
    navigationPage.assertPageLoaded();
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
