# Quick Start Guide - Cypress E2E Testing

Get up and running with the Cypress E2E test suite for Practice Software Testing website in 5 minutes!

---

## ⚡ 5-Minute Setup

### Step 1: Clone & Install (2 minutes)
```bash
# Clone repository
git clone <repository-url>
cd cypress-project

# Install dependencies
npm install
```

### Step 2: Verify Installation (1 minute)
```bash
# Check if Cypress is installed
npx cypress --version

# Should output: Cypress X.X.X
```

### Step 3: Run Tests (2 minutes)
```bash
# Option 1: Run all tests
npm test

# Option 2: Open Cypress interactive
npm run test:open

# Option 3: Run only traditional tests
npm run test:traditional

# Option 4: Run only BDD tests
npm run test:bdd
```

---

## 🎯 Common Commands

### Run Tests
```bash
npm test                      # Run all tests headless
npm run test:open            # Open Cypress interactive mode
npm run test:traditional     # Traditional tests only
npm run test:bdd             # BDD feature tests only
npm run test:chrome          # Run with Chrome browser
npm run test:firefox         # Run with Firefox browser
npm run test:headless        # Headless mode
npm run test:mobile          # Mobile viewport (375x812)
npm run test:debug           # Debug mode with logs
npm run ci                   # CI mode (headless, chrome)
```

### Interactive Mode
```bash
npm run test:open
# Then:
# 1. Select test file
# 2. Choose browser
# 3. Watch tests execute
# 4. Real-time debugging
```

---

## 📂 Project Structure (Quick Reference)

```
📁 cypress-project
├── 📁 cypress/
│   ├── 📁 e2e/
│   │   ├── 📁 features/          ← Feature files (.feature)
│   │   ├── 📁 step_definitions/  ← Step definitions (.steps.js)
│   │   ├── 📁 pageObjects/       ← Page Object classes
│   │   ├── practice_site.cy.js   ← Traditional tests
│   │   └── practice_site_pom.cy.js
│   ├── 📁 fixtures/              ← Test data (userData.json)
│   └── 📁 support/               ← Custom commands, helpers
├── 📁 .github/workflows/         ← GitHub Actions CI/CD
├── cypress.config.js             ← Main config
├── package.json                  ← Dependencies & scripts
└── README.md                     ← Full documentation
```

---

## 🧪 Understanding the 3 Test Approaches

### 1️⃣ Traditional Cypress Tests
**File**: `practice_site.cy.js`  
**What**: Direct Cypress syntax  
**Use**: Quick testing, debugging  
**Run**: `npm run test:traditional`

```javascript
it('1) Home page loads with expected title', () => {
  cy.openHome();
  cy.assertPageTitleIncludes('Practice Software Testing');
  cy.get('body').should('contain.text', 'Practice');
});
```

### 2️⃣ Page Object Model Tests
**File**: `practice_site_pom.cy.js`  
**What**: Tests using page objects  
**Use**: Maintainable, reusable  
**Benefits**: Easy to maintain, clear structure

```javascript
const homePage = new HomePage();
homePage.searchProduct('hammer');
homePage.assertSearchResults('hammer');
```

### 3️⃣ BDD Feature Tests
**Files**: `features/*.feature`  
**What**: Gherkin syntax (human-readable)  
**Use**: Stakeholder communication  
**Run**: `npm run test:bdd`

```gherkin
Scenario: Search functionality returns results
  When the user searches for "hammer"
  Then the search results should contain "hammer"
```

---

## 📊 What Gets Tested? (15 Test Cases)

| # | Test Case | Type | Status |
|---|-----------|------|--------|
| 1 | Home page loads | Traditional | ✅ |
| 2 | Navigation links | Traditional | ✅ |
| 3 | Search functionality | Traditional | ✅ |
| 4 | Category filtering | Traditional | ✅ |
| 5 | Brand filter panel | Traditional | ✅ |
| 6 | Add to cart | Traditional | ✅ |
| 7 | Checkout available | Traditional | ✅ |
| 8 | Sustainability section | Traditional | ✅ |
| 9 | Product details page | Traditional | ✅ |
| 10 | Privacy page access | Traditional | ✅ |
| 11 | Sorting & filters | Traditional | ✅ |
| 12 | Footer content | Traditional | ✅ |
| 13 | Keyboard navigation | Traditional | ✅ |
| 14 | Responsive design | Traditional | ✅ |
| 15 | Performance & JS errors | Traditional | ✅ |

---

## 🔍 Key Features Explained

### Custom Commands (30+)
Reusable functions that simplify test code:

```javascript
// Instead of:
cy.get('input[type="search"]').type('hammer').type('{enter}');

// Use:
cy.searchProduct('hammer');
```

**Categories**:
- Navigation: `cy.openHome()`, `cy.navigateTo()`
- Search: `cy.searchProduct()`, `cy.assertSearchResults()`
- Cart: `cy.addProductToCart()`, `cy.openCart()`
- Assertions: `cy.assertPageTitleIncludes()`, `cy.assertElementVisible()`
- Utilities: `cy.waitForElement()`, `cy.switchViewport()`

### Page Objects (6 Classes)
Organize selectors and methods by page:

```
BasePage (base class)
├── HomePage (search, filters, products)
├── ProductPage (product details)
├── CartPage (shopping cart)
├── NavigationPage (header, footer)
└── PrivacyPage (privacy policy)
```

### Test Data Fixtures
Centralized test data in `userData.json`:

```json
{
  "searchTerm": "hammer",
  "category": "Hand Tools",
  "brand": "Bahco",
  "price": { "min": 0, "max": 100 }
}
```

---

## 🚀 Running Your First Test

### Method 1: Interactive (Recommended for Learning)
```bash
npm run test:open
```
1. Click on `practice_site.cy.js`
2. Watch test run in real-time
3. See each step highlighted
4. Inspect elements in DevTools

### Method 2: Command Line
```bash
npm test
```
- Runs all tests headless
- Shows results in terminal
- Saves screenshots if failed
- Useful for CI/CD

### Method 3: Specific Test Only
```bash
npx cypress run --spec "cypress/e2e/practice_site.cy.js" --grep "Home page"
```

---

## 📱 Responsive Testing

### Desktop (Default)
```bash
npm test
# 1280x800 resolution
```

### Mobile
```bash
npm run test:mobile
# 375x812 resolution (iPhone size)
```

### Custom Viewport
```bash
npx cypress run --config viewportWidth=1920,viewportHeight=1080
```

---

## 🐛 Debugging Tests

### View Logs
```bash
npm run test:debug
# Shows detailed logs during execution
```

### Pause Execution
```javascript
// In your test file:
it('test name', () => {
  cy.openHome();
  cy.pause();  // Execution pauses here
  cy.searchProduct('hammer');
});
```

### Time Travel (Interactive Mode)
1. Open `npm run test:open`
2. Hover over commands in log
3. Inspect page state at that point

---

## 🌐 BDD Feature Tests

### View Features
```bash
# Files in cypress/e2e/features/
- homepage.feature
- products.feature
- cart.feature
- navigation.feature
```

### Run Single Feature
```bash
npx cypress run --spec "cypress/e2e/features/homepage.feature"
```

### Read Feature File Example
```gherkin
Feature: Homepage functionality

  Scenario: Search functionality returns results
    Given the user opens the home page
    When the user searches for "hammer"
    Then the search results should contain "hammer"
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm install` completed without errors
- [ ] `npx cypress --version` shows version
- [ ] `npm run test:open` opens Cypress
- [ ] Can see test files listed
- [ ] Running one test shows success/failure
- [ ] Screenshots/videos exist if test fails

---

## 🆘 Troubleshooting

### Problem: `Cannot find module 'cypress'`
```bash
# Solution:
npm install cypress
```

### Problem: Tests timeout
```javascript
// In cypress.config.js, increase timeout:
defaultCommandTimeout: 15000  // from 10000
pageLoadTimeout: 60000        // from 30000
```

### Problem: Feature tests don't run
```bash
# Verify config:
npm install @badeball/cypress-cucumber-preprocessor
npm install @bahmutov/cypress-esbuild-preprocessor

# Check .cypress-cucumber-preprocessorrc.json exists
```

### Problem: Custom commands not found
```javascript
// Verify in cypress/support/e2e.js:
import './commands';  // This line must exist
```

---

## 📚 Documentation

For more information, see:
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Comprehensive testing documentation
- [CI_CD_GUIDE.md](CI_CD_GUIDE.md) - GitHub Actions CI/CD setup
- [README.md](README.md) - Project overview

---

## 🎓 Next Steps

1. Run `npm test` to execute all tests
2. Run `npm run test:open` to use interactive mode
3. Read the full [TESTING_GUIDE.md](TESTING_GUIDE.md)
4. Explore the page objects in `cypress/e2e/pageObjects/`
5. Check out the feature files in `cypress/e2e/features/`

---

## 📞 Support

For more help:
1. Check this Quick Start
2. Read full documentation
3. Check Cypress docs: https://docs.cypress.io

**Happy Testing! 🚀**
```bash
npx cypress run --browser firefox
npx cypress run --browser edge
```

### Run Specific Feature
```bash
npx cypress run --spec "cypress/e2e/features/products.feature"
```

## Project Structure Overview

```
cypress-project/
├── cypress/
│   ├── e2e/
│   │   ├── features/           # BDD scenarios
│   │   ├── step_definitions/   # BDD implementation
│   │   ├── pageObjects/        # Page Object Models
│   │   ├── practice_site.cy.js # Traditional tests
│   │   └── practice_site_pom.cy.js # POM-based tests
│   ├── fixtures/               # Test data
│   └── support/                # Custom commands
├── .github/workflows/          # CI/CD pipelines
├── cypress.config.js           # Cypress configuration
└── package.json               # Dependencies
```

## Test Organization

### 15 Test Cases Covered

1. ✅ Home page loads with title and footer
2. ✅ Top navigation with toolshop & privacy links
3. ✅ Search functionality returns results
4. ✅ Category selection modifies products
5. ✅ Brand filter panel interactive
6. ✅ Add product to cart
7. ✅ Checkout link available
8. ✅ Sustainability section visible
9. ✅ Product details page opens
10. ✅ Privacy page reachable
11. ✅ Sorting controls present
12. ✅ Footer with links
13. ✅ Keyboard navigation
14. ✅ Responsive menu
15. ✅ Fast load with no JS errors

## Test Files

### Traditional Cypress
- `practice_site.cy.js` - 15 standard tests

### Page Object Model
- `practice_site_pom.cy.js` - Same 15 tests using POM

### BDD Feature Files
- `features/homepage.feature` - 15 scenarios
- `features/products.feature` - Product tests
- `features/cart.feature` - Cart tests
- `features/navigation.feature` - Navigation tests

## Key Features

### Page Objects (5 classes)
- **BasePage**: Common functionality
- **HomePage**: Home page actions
- **ProductPage**: Product details
- **CartPage**: Shopping cart
- **NavigationPage**: Header/footer
- **PrivacyPage**: Privacy policy

### Custom Commands (30+)
Built-in helpers for:
- Navigation
- Searching
- Filtering
- Cart operations
- Assertions

### CI/CD Pipelines (3 workflows)
- **Main**: Run on push/PR
- **Nightly**: Scheduled daily
- **Manual**: On-demand runs

## Test Data

Edit test data in `cypress/fixtures/userData.json`:

```json
{
  "searchTerm": "hammer",
  "category": "Hand Tools",
  "brand": "Bahco",
  "products": {
    "hammer": "hammer",
    "pliers": "pliers",
    "screwdriver": "screwdriver"
  }
}
```

## Debugging Tests

### See detailed output
```bash
npx cypress run --spec "cypress/e2e/practice_site.cy.js" --headed
```

### Interactive debugging
1. Open `npm run cypress:open`
2. Select test
3. Use DevTools (right-click → Inspect)

### Add manual pause
```javascript
cy.pause(); // Pauses test execution
```

### View logs
```javascript
cy.log('Important info here');
```

## Troubleshooting

### Tests timeout
- Increase `defaultTimeout` in `cypress.config.js`
- Check network connectivity
- Verify site is up

### Can't find elements
- Use `cy.debug()` to inspect
- Check selectors in Inspector
- Verify element is visible

### Feature files not running
- Install deps: `npm install`
- Restart Cypress
- Check file extension is `.feature`

## Next Steps

1. **Read README.md** for complete documentation
2. **Check POM_GUIDE.md** for Page Object patterns
3. **Review CUCUMBER_CONFIG.md** for BDD details
4. **Explore features/** directory for test scenarios

## Tips & Tricks

### Run tests in parallel
```bash
npx cypress run --parallel
```

### Generate report
```bash
npx cypress run --reporter json
```

### Record test video
```bash
npx cypress run --record
```

### Run headless (no GUI)
```bash
npx cypress run
```

## Documentation Links

- [Cypress Docs](https://docs.cypress.io)
- [Cucumber Docs](https://cucumber.io)
- [Page Objects](./POM_GUIDE.md)
- [BDD Setup](./CUCUMBER_CONFIG.md)

## Support

Check troubleshooting section in README.md for common issues.

---

**You're all set! Happy testing!** 🎉
