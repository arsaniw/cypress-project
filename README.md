# Practice Software Testing - Cypress E2E Test Suite

A comprehensive end-to-end testing suite for [practicesoftwaretesting.com](https://practicesoftwaretesting.com) using Cypress with Page Object Model (POM) and Behavior-Driven Development (BDD) patterns.

## Project Overview

This project implements 15 comprehensive test cases covering:
- ✅ Home page functionality
- ✅ Navigation and footer
- ✅ Search functionality
- ✅ Product browsing and filtering
- ✅ Shopping cart operations
- ✅ Privacy policy pages
- ✅ Responsive design
- ✅ Keyboard navigation

## Project Structure

```
cypress-project/
├── .github/
│   └── workflows/              # CI/CD Pipeline configurations
│       ├── cypress-tests.yml   # Main test workflow
│       ├── nightly-tests.yml   # Scheduled nightly runs
│       └── manual-test-run.yml # Manual test execution
├── cypress/
│   ├── e2e/
│   │   ├── features/          # BDD Cucumber feature files
│   │   │   ├── homepage.feature
│   │   │   ├── products.feature
│   │   │   ├── cart.feature
│   │   │   └── navigation.feature
│   │   ├── step_definitions/  # Step implementations
│   │   │   └── common.steps.js
│   │   ├── pageObjects/       # Page Object Model classes
│   │   │   ├── BasePage.js
│   │   │   ├── HomePage.js
│   │   │   ├── ProductPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── NavigationPage.js
│   │   │   └── PrivacyPage.js
│   │   ├── practice_site.cy.js      # Traditional Cypress tests
│   │   └── practice_site_pom.cy.js  # POM-based tests
│   ├── fixtures/
│   │   └── userData.json       # Test data fixtures
│   └── support/
│       ├── commands.js         # Custom Cypress commands
│       └── e2e.js             # Support file
├── cypress.config.js           # Cypress configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Requirements Implemented

### 1. Fixtures, Assertions, and Custom Commands [10 marks]
- ✅ Enhanced `userData.json` with comprehensive test data
- ✅ 30+ custom commands in `support/commands.js`
- ✅ Organized assertions for common UI patterns
- ✅ Navigation, search, cart, and product-specific commands
- ✅ Response and accessibility validation commands

### 2. Page Object Modeling [25 marks]
- ✅ **BasePage.js**: Base class with common functionality
  - Element locators
  - Navigation methods
  - Assertion helpers
  - Storage management

- ✅ **HomePage.js**: Home page specific objects
  - Search functionality
  - Category and brand filters
  - Product listings
  - Sort controls

- ✅ **ProductPage.js**: Product details page
  - Product information
  - Add to cart functionality
  - Stock status
  - Related products

- ✅ **CartPage.js**: Shopping cart page
  - Cart items management
  - Price calculations
  - Checkout process

- ✅ **NavigationPage.js**: Header and footer
  - Navigation links
  - Cart icon
  - Footer links
  - Responsive menu

- ✅ **PrivacyPage.js**: Privacy policy page
  - Policy content verification
  - Legal information

### 3. BDD Cucumber [25 marks]
- ✅ **Feature Files** (4 total):
  - `homepage.feature` - 15 scenarios covering all test cases
  - `products.feature` - Product search and filtering
  - `cart.feature` - Shopping cart operations
  - `navigation.feature` - Navigation and footer

- ✅ **Step Definitions**:
  - 40+ reusable step definitions
  - Given/When/Then format
  - Integration with Page Object Model
  - Automatic cleanup

- ✅ **Cucumber Setup**:
  - `@badeball/cypress-cucumber-preprocessor` integration
  - Feature file support in cypress.config.js
  - Gherkin syntax support

### 4. GitHub and CI/CD Pipelines [10 marks]
- ✅ **Main Workflow** (`cypress-tests.yml`):
  - Runs on push and PR
  - Chrome browser testing
  - Node.js 16.x
  - Artifact uploads
  - Screenshot/video collection

- ✅ **Nightly Schedule** (`nightly-tests.yml`):
  - Scheduled daily at 2 AM UTC
  - Manual trigger support
  - Result archival with 30-day retention
  - Failure notifications

- ✅ **Manual Test Run** (`manual-test-run.yml`):
  - Browser selection (Chrome, Firefox, Edge)
  - Custom spec patterns
  - Recording options
  - Summary reporting

## Setup Instructions

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd cypress-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npx cypress --version
   ```

## Running Tests

### Run Traditional Cypress Tests
```bash
npm test
# or for specific file
npx cypress run --spec "cypress/e2e/practice_site.cy.js"
```

### Run POM-based Tests
```bash
npx cypress run --spec "cypress/e2e/practice_site_pom.cy.js"
```

### Run BDD Tests (Feature Files)
```bash
npx cypress run --spec "cypress/e2e/features/*.feature"
```

### Run All Tests
```bash
npx cypress run
```

### Open Cypress Interactive Mode
```bash
npm run cypress:open
```

### Run Specific Feature
```bash
npx cypress run --spec "cypress/e2e/features/homepage.feature"
```

### Run with Specific Browser
```bash
npx cypress run --browser firefox
# or
npx cypress run --browser edge
```

## Test Data

Test data is defined in `cypress/fixtures/userData.json`:

```json
{
  "searchTerm": "hammer",
  "category": "Hand Tools",
  "brand": "Bahco",
  "price": {
    "min": 10,
    "max": 100
  },
  "products": {
    "hammer": "hammer",
    "pliers": "pliers",
    "screwdriver": "screwdriver"
  }
}
```

## Custom Commands Reference

### Navigation
- `cy.openHome()` - Open home page
- `cy.navigateTo(path)` - Navigate to specific path

### Search & Products
- `cy.searchProduct(keyword)` - Search for product
- `cy.clearSearch()` - Clear search input
- `cy.openProductByName(name)` - Open product details
- `cy.addProductToCart(name)` - Add product to cart

### Assertions
- `cy.assertPageTitleIncludes(text)` - Verify page title
- `cy.assertUrlIncludes(path)` - Verify URL
- `cy.assertElementVisible(selector)` - Check element visibility
- `cy.assertNoJSErrors()` - Verify no JS errors

## Page Object Methods

### HomePage
```javascript
homePage.openHome()
homePage.searchProduct(keyword)
homePage.selectCategory(categoryName)
homePage.selectBrand(brandName)
homePage.assertHomePageLoaded()
```

### ProductPage
```javascript
productPage.addProductToCart(quantity)
productPage.openRelatedProduct(name)
productPage.assertProductPageLoaded(name)
productPage.assertProductDetailsPresent()
```

### CartPage
```javascript
cartPage.assertCartItemPresent(itemName)
cartPage.removeItem(itemName)
cartPage.proceedToCheckout()
cartPage.assertCartEmpty()
```

### NavigationPage
```javascript
navigationPage.clickNavLink(linkText)
navigationPage.clickPrivacyPolicy()
navigationPage.assertHeaderPresent()
navigationPage.assertFooterPresent()
```

## BDD Examples

### Running a specific scenario
```bash
npx cypress run --spec "cypress/e2e/features/homepage.feature" 
```

### Running with specific tags (if implemented)
```bash
npx cypress run --env tags="@smoke"
```

## CI/CD Integration

### GitHub Actions

The project includes three workflows:

1. **cypress-tests.yml** (Main)
   - Triggers: Push to main/develop, PR
   - Runs: Traditional + BDD tests
   - Browsers: Chrome
   - Artifacts: Screenshots, videos

2. **nightly-tests.yml**
   - Triggers: Daily at 2 AM UTC
   - Runs: Full test suite
   - Archives: 30-day retention

3. **manual-test-run.yml**
   - Triggers: Manual workflow dispatch
   - Options: Browser, spec, recording
   - Reports: Summary to GitHub

### Setting Up Workflows

1. Ensure `.github/workflows/` files exist
2. Repository should have default branch configured
3. Workflows automatically activate on push/PR
4. Manual workflows can be triggered from Actions tab

## Test Reporting

Test results are captured as artifacts:
- `cypress/screenshots/` - Failure screenshots
- `cypress/videos/` - Test recordings
- `cypress/reports/` - Test reports (if configured)

## Troubleshooting

### Issue: Cypress can't find modules
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Issue: Feature files not recognized
**Solution:**
- Ensure `@badeball/cypress-cucumber-preprocessor` is installed
- Check `cypress.config.js` has proper setup
- Restart Cypress

### Issue: Page objects import errors
**Solution:**
- Verify relative paths in step definitions
- Check file structure matches expectations

### Issue: Tests timeout
**Solution:**
- Increase `pageLoadTimeout` in BasePage
- Check network connectivity
- Verify site is accessible

## Best Practices

1. **Use Page Objects**: Always use POM for new tests
2. **Custom Commands**: Create commands for repeated actions
3. **Fixtures**: Use fixture data for test variables
4. **Waits**: Let Cypress handle waits automatically
5. **Assertions**: Use explicit assertions, not implicit waits
6. **Cleanup**: Always clean cookies/storage after tests

## Contributing

When adding new tests:

1. Create Page Object if new page type
2. Add fixture data if needed
3. Create step definitions for BDD
4. Add feature file scenarios
5. Update README with new commands

## CI/CD Features

- ✅ Automatic test runs on push/PR
- ✅ Scheduled nightly runs
- ✅ Manual test execution
- ✅ Multiple browser support
- ✅ Artifact collection
- ✅ Failure notifications
- ✅ Test reporting
- ✅ Video recording

## Performance Metrics

- Test Count: 15 test cases
- Coverage: HomePage, Products, Cart, Navigation, Privacy
- Average Runtime: ~2-3 minutes per test suite
- Browsers Supported: Chrome, Firefox, Edge

## Dependencies

```json
{
  "cypress": "^15.13.0",
  "@badeball/cypress-cucumber-preprocessor": "^20.0.0",
  "@bahmutov/cypress-esbuild-preprocessor": "^2.2.2"
}
```

## License

This project is created for learning and practice purposes.

## Contact & Support

For issues or questions:
1. Check the troubleshooting section
2. Review Cypress documentation: https://docs.cypress.io
3. Check Cucumber docs: https://cucumber.io

---

**Last Updated:** 2024
**Version:** 1.0.0
