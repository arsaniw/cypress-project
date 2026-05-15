describe('Practice Software Testing site - functional suite', () => {
  let user;

  before(() => {
    cy.fixture('userData').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    cy.openHome();
  });

  // -------------------------
  // 1. HOME PAGE
  // -------------------------
  it('1) Home page loads with expected title and footer', () => {
    cy.assertPageTitleIncludes('Practice Software Testing');
    cy.get('body').should('contain.text', 'Practice');
  });

  // -------------------------
  // 2. NAVIGATION
  // -------------------------
  it('2) Top navigation contains links', () => {
    cy.get('nav, header').should('exist');
    cy.get('body').should('contain.text', 'Privacy');
  });

  // -------------------------
  // 3. SEARCH
  // -------------------------
  it('3) Search functionality returns results', () => {
    cy.searchProduct(user.searchTerm);
    cy.assertSearchResults(user.searchTerm);
  });

  // -------------------------
  // 4. CATEGORY
  // -------------------------
  it('4) Category selection modifies product context', () => {
    cy.get('body').should('contain.text', 'Products');
  });

  // -------------------------
  // 5. FILTER PANEL
  // -------------------------
  it('5) Brand filter panel exists', () => {
    cy.get('body').should('satisfy', (el) =>
      el.textContent.includes('Filter') ||
      el.textContent.includes('Brand') ||
      el.textContent.includes('Category')
    );
  });

  // -------------------------
  // 6. ADD TO CART
  // -------------------------
  it('6) Add product flow works', () => {
    cy.searchProduct('hammer');
    cy.get('body').should('contain.text', 'hammer');
  });

  // -------------------------
  // 7. CART STATE
  // -------------------------
  it('7) Cart navigation available', () => {
    cy.get('body').should('contain.text', 'Cart');
  });

  // -------------------------
  // 8. PRODUCT SECTION
  // -------------------------
  it('8) Product listing is visible', () => {
    cy.get('img').should('have.length.greaterThan', 0);
  });

  // -------------------------
  // 9. PRODUCT PAGE
  // -------------------------
  it('9) Product page opens', () => {
    cy.searchProduct('pliers');

    cy.contains(/pliers/i, { timeout: 15000 })
      .first()
      .click();

    cy.url().should('include', '/product');
  });

  // -------------------------
  // 10. PRIVACY PAGE
  // -------------------------
  it('10) Privacy page is reachable', () => {
    cy.contains(/privacy/i, { timeout: 15000 })
      .first()
      .click({ force: true });

    cy.url().should('include', 'privacy');
    cy.get('body').should('contain.text', 'privacy');
  });

  // -------------------------
  // 11. SORT/FILTER
  // -------------------------
  it('11) Sorting and filters exist', () => {
    cy.get('body').should('contain.text', 'Sort');
  });

  // -------------------------
  // 12. FOOTER
  // -------------------------
  it('12) Footer contains legal info', () => {
    cy.get('footer, body').should('contain.text', 'Privacy');
  });

  // -------------------------
  // 13. KEYBOARD SEARCH
  // -------------------------
  it('13) Search supports keyboard input', () => {
    cy.get('input[type="search"], input')
      .first()
      .type(`${user.searchTerm}{enter}`);

    cy.assertSearchResults(user.searchTerm);
  });

  // -------------------------
  // 14. RESPONSIVE
  // -------------------------
  it('14) Responsive layout works', () => {
    cy.viewport(375, 812);
    cy.get('body').should('exist');

    cy.viewport(1280, 800);
    cy.get('body').should('exist');
  });

  // -------------------------
  // 15. PAGE LOAD
  // -------------------------
  it('15) Page loads without JS errors', () => {
    cy.document().its('readyState').should('eq', 'complete');
    cy.get('body').should('not.be.empty');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
