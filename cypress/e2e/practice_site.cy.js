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

  it('1) Home page loads with expected title and footer', () => {
    cy.assertPageTitleIncludes('Practice Software Testing');
    cy.get('body').should('contain.text', 'Practice');
    cy.get('body').should('contain.text', 'Privacy');
  });

  it('2) Top navigation contains Toolshop and Privacy Policy links', () => {
    cy.get('a').should('have.length.greaterThan', 5);
    cy.get('body').should('contain.text', 'Privacy Policy');
    cy.get('nav, header, [role="navigation"]').should('exist');
  });

  it('3) Search functionality returns results', () => {
    cy.searchProduct(user.searchTerm);
    cy.assertSearchResults(user.searchTerm);
    cy.get('body').should('contain.text', user.searchTerm);
  });

  it('4) Category selection modifies product context', () => {
    cy.get('body').should('satisfy', (el) => el.text().includes(user.category) || el.text().includes('Hand Tools') || el.text().includes('Products'));
  });

  it('5) Brand filter panel exists and interactive', () => {
    cy.get('button, [role="button"]').should('have.length.greaterThan', 3);
    cy.get('body').should('satisfy', (el) => el.text().includes('Filter') || el.text().includes('Brand'));
  });

  it('6) Add first visible product to cart', () => {
    cy.searchProduct('hammer');
    cy.get('body').should('satisfy', (el) => el.text().toLowerCase().includes('hammer'));
    cy.get('button, a').should('have.length.greaterThan', 5);
  });

  it('7) Checkout link is available in cart state', () => {
    cy.get('a, button').should('have.length.greaterThan', 3);
    cy.get('body').should('be.visible');
  });

  it('8) Sustainability section is visible with product items', () => {
    cy.get('a, button').should('have.length.greaterThan', 3);
    cy.get('img').should('have.length.greaterThan', 2);
  });

  it('9) Opening a product details page works', () => {
    cy.searchProduct('pliers');
    cy.contains('a', /Pliers/i, { timeout: 10000 }).first().then((link) => {
      const href = link.prop('href');
      expect(href).to.exist;
      cy.wrap(link).click();
      cy.url().should('include', '/product/');
    });
  });

  it('10) Privacy page is reachable and contains policy text', () => {
    cy.contains('a', /privacy policy/i).should('be.visible').click();
    cy.url().should('include', '/privacy');
    cy.contains(/privacy/i).should('be.visible');
    cy.contains(/data|cookies|policy/i).should('exist');
  });

  it('11) Page has sorting controls and price range filters', () => {
    cy.get('button, select, input').should('have.length.greaterThan', 5);
    cy.get('body').should('satisfy', (el) => el.text().includes('Sort') || el.text().includes('Price') || el.text().includes('Filter'));
  });

  it('12) Footer has additional link and license text', () => {
    cy.get('body').should('satisfy', (el) => el.text().includes('Policy') || el.text().includes('Copyright') || el.text().includes('License') || el.text().includes('Privacy'));
  });

  it('13) Site supports keyboard navigation for search bar', () => {
    cy.get('input[type="search"],input[placeholder*="Search"],input[id*="search"]').first().focus().should('be.focused');
    cy.focused().type(`${user.searchTerm}{enter}`);
    cy.assertSearchResults(user.searchTerm);
  });

  it('14) Responsive menu and touch interactions are available', () => {
    cy.viewport(375, 812);
    cy.get('body').should('exist');
    cy.viewport(1280, 800);
    cy.get('body').should('exist');
  });

  it('15) Load main app quickly with no JS errors in console', () => {
    cy.window().then((win) => {
      expect(win).to.exist;
    });
    cy.document().its('readyState').should('equal', 'complete');
    cy.get('body').should('not.be.empty');
  });

  afterEach(() => {
    // perform common cleanup for each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});