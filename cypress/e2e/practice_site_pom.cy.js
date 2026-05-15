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
    homePage.openHome(); // MUST include failOnStatusCode fix inside
  });

  it('1) Home page loads', () => {
    homePage.assertHomePageLoaded();
  });

  it('2) Navigation exists', () => {
    navigationPage.assertHeaderPresent();
  });

  it('3) Search works', () => {
    homePage.searchProduct(user.searchTerm);
    homePage.assertSearchResultsContain(user.searchTerm);
  });

  it('4) Products exist', () => {
    homePage.assertProductsDisplayed();
  });

  it('5) Filter panel exists', () => {
    homePage.assertFilterPanelVisible();
  });

  it('6) Search hammer', () => {
    homePage.searchProduct('hammer');
    homePage.assertSearchResultsContain('hammer');
  });

  it('7) Cart icon exists', () => {
    navigationPage.assertCartIconPresent();
  });

  it('8) Sustainability section exists', () => {
    homePage.assertSustainabilitySectionVisible();
  });

  it('9) Open product page', () => {
    homePage.searchProduct('pliers');
    productPage.openProductByName('pliers');
    productPage.assertProductPageLoaded('pliers');
  });

  it('10) Privacy page works', () => {
    navigationPage.clickPrivacyPolicy();
    privacyPage.assertPrivacyPageLoaded();
  });

  it('11) Sorting exists', () => {
    homePage.assertSortControlsPresent();
  });

  it('12) Footer exists', () => {
    navigationPage.assertFooterPresent();
  });

  it('13) Keyboard search', () => {
    homePage.getSearchBar()
      .first()
      .focus()
      .type(`${user.searchTerm}{enter}`);

    homePage.assertSearchResultsContain(user.searchTerm);
  });

  it('14) Responsive layout', () => {
    navigationPage.assertResponsiveMenuAvailable();
  });

  it('15) App loads cleanly', () => {
    homePage.assertPageLoaded();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
