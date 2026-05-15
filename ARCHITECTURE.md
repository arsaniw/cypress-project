# Architecture Overview

## Project Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│         Cypress E2E Testing Framework                        │
│        (practicesoftwaretesting.com)                         │
└─────────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ▼                ▼                ▼
    ┌─────────┐     ┌──────────┐    ┌──────────┐
    │Traditional│     │Page Object│   │BDD/Cucumber│
    │ Tests    │     │Model     │    │Features  │
    └─────────┘     └──────────┘    └──────────┘
         │                │                │
         │         ┌──────┴──────┐        │
         │         │             │        │
         ▼         ▼             ▼        ▼
    ┌─────────────────────────────────────────┐
    │      Custom Commands & Fixtures          │
    │    (30+ commands, test data)             │
    └─────────────────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────────────────┐
    │      Cypress Configuration              │
    │  (Support, Hooks, Timeouts)            │
    └─────────────────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────────────────┐
    │   GitHub Actions CI/CD Pipelines        │
    │  (3 workflows, automated testing)       │
    └─────────────────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────────────────┐
    │   Test Results & Reports                │
    │  (Screenshots, videos, logs)            │
    └─────────────────────────────────────────┘
```

## Component Hierarchy

```
Test Execution Layer
├── Traditional Cypress Tests (practice_site.cy.js)
├── POM-Based Tests (practice_site_pom.cy.js)
└── BDD Feature Files (features/*.feature)

Page Object Layer
├── BasePage (common functionality)
├── HomePage (home page operations)
├── ProductPage (product details)
├── CartPage (shopping cart)
├── NavigationPage (header/footer)
└── PrivacyPage (policy page)

Support Layer
├── Custom Commands (30+ helpers)
├── Test Data/Fixtures (userData.json)
├── Step Definitions (40+ steps)
└── e2e.js (support configuration)

Infrastructure Layer
├── Cypress Configuration
├── Cucumber Preprocessor
├── esbuild Bundler
└── Node.js Runtime

CI/CD Layer
├── Main Workflow (push/PR)
├── Nightly Schedule
└── Manual Trigger
```

## Test Organization

```
cypress/
│
├── e2e/
│   ├── pageObjects/          ◄── Page Object Model Classes
│   │   ├── BasePage.js
│   │   ├── HomePage.js
│   │   ├── ProductPage.js
│   │   ├── CartPage.js
│   │   ├── NavigationPage.js
│   │   └── PrivacyPage.js
│   │
│   ├── step_definitions/     ◄── BDD Step Implementations
│   │   └── common.steps.js
│   │
│   ├── features/             ◄── Gherkin Feature Files
│   │   ├── homepage.feature
│   │   ├── products.feature
│   │   ├── cart.feature
│   │   └── navigation.feature
│   │
│   ├── practice_site.cy.js   ◄── Traditional Tests
│   └── practice_site_pom.cy.js ◄── POM-Based Tests
│
├── fixtures/                 ◄── Test Data
│   └── userData.json
│
└── support/                  ◄── Cypress Support Files
    ├── commands.js           ◄── Custom Commands (30+)
    └── e2e.js
```

## Data Flow

```
Feature File (Gherkin)
        │
        ▼
Step Definition (Given/When/Then)
        │
        ▼
Page Object Method Call
        │
        ▼
Custom Command or Cypress API
        │
        ▼
Assertion/Action
        │
        ▼
Test Result (Pass/Fail)
        │
        ▼
GitHub Actions (CI/CD)
        │
        ▼
Artifacts & Reports
```

## Custom Commands Architecture

```
┌────────────────────────────────────────────┐
│         Custom Commands (30+)              │
├────────────────────────────────────────────┤
│                                            │
│  Navigation Commands (5)                   │
│  ├── openHome()                           │
│  ├── navigateTo(path)                     │
│  ├── clickNavLink(text)                   │
│  ├── clickFooterLink(text)                │
│  └── openPrivacy()                        │
│                                            │
│  Search Commands (4)                       │
│  ├── searchProduct(keyword)               │
│  ├── clearSearch()                        │
│  ├── assertSearchResults(keyword)         │
│  └── openProductByName(name)              │
│                                            │
│  Filter Commands (4)                       │
│  ├── applyFilter(name, value)             │
│  ├── selectCategory(category)             │
│  ├── selectBrand(brand)                   │
│  └── setPriceRange(min, max)              │
│                                            │
│  Cart Commands (4)                         │
│  ├── addProductToCart(name)               │
│  ├── openCart()                           │
│  ├── assertCartHasItem(item)              │
│  └── assertCartEmpty()                    │
│                                            │
│  Assertion Commands (8)                    │
│  ├── assertPageTitleIncludes(text)        │
│  ├── assertUrlIncludes(path)              │
│  ├── assertElementVisible(selector)       │
│  ├── assertNoJSErrors()                   │
│  └── ... (4 more)                         │
│                                            │
└────────────────────────────────────────────┘
```

## Page Object Hierarchy

```
┌─────────────────────────────────────────┐
│         BasePage                         │
│  (Common functionality for all pages)    │
│  - getSearchInput()                      │
│  - getNavigationBar()                    │
│  - navigateTo(path)                      │
│  - assertPageLoaded()                    │
│  - ...15 more methods                    │
└─────────────────────────────────────────┘
         │
    ┌────┼────┬────────┬──────────┬─────────┐
    │    │    │        │          │         │
    ▼    ▼    ▼        ▼          ▼         ▼
 ┌──────┐ ┌──────┐ ┌─────────┐ ┌─────┐ ┌──────┐
 │Home  │ │Prod  │ │CartPage│ │Nav  │ │Privacy│
 │Page  │ │Page  │ │        │ │Page │ │Page  │
 └──────┘ └──────┘ └─────────┘ └─────┘ └──────┘

Selectors → Actions → Assertions (Consistent Pattern)
```

## Test Execution Flow

```
┌─────────────────────────────────┐
│     Test Execution Start         │
└─────────────────────────────────┘
            │
            ▼
    ┌───────────────┐
    │ Fixture Load  │
    │ (userData)    │
    └───────────────┘
            │
            ▼
    ┌───────────────────────┐
    │ Initialize Page Objs  │
    │ (Create instances)    │
    └───────────────────────┘
            │
            ▼
    ┌───────────────────────┐
    │ Before Each Hook      │
    │ (Open home page)      │
    └───────────────────────┘
            │
            ▼
    ┌────────────────────────────┐
    │ Execute Test               │
    │ (Call POM methods/commands)│
    └────────────────────────────┘
            │
            ▼
    ┌────────────────────────────┐
    │ After Each Hook            │
    │ (Clear cookies/storage)    │
    └────────────────────────────┘
            │
            ▼
    ┌────────────────────────────┐
    │ Test Result                │
    │ (Pass/Fail/Skipped)        │
    └────────────────────────────┘
            │
            ▼
    ┌────────────────────────────┐
    │ Generate Artifacts         │
    │ (Screenshots/Videos)       │
    └────────────────────────────┘
```

## CI/CD Pipeline Flow

```
GitHub Event
     │
     ├─→ Push/PR → cypress-tests.yml
     │                 │
     │                 ├─→ Install Dependencies
     │                 ├─→ Run Traditional Tests
     │                 ├─→ Run BDD Tests
     │                 └─→ Upload Artifacts
     │
     ├─→ Schedule (2 AM UTC) → nightly-tests.yml
     │                 │
     │                 ├─→ Install Dependencies
     │                 ├─→ Run Full Test Suite
     │                 ├─→ Archive Results (30 days)
     │                 └─→ Notify on Failure
     │
     └─→ Manual Dispatch → manual-test-run.yml
                  │
                  ├─→ Select Browser
                  ├─→ Select Test Spec
                  ├─→ Run Tests
                  └─→ Report Summary
```

## Test Coverage Matrix

```
Test Case           │ Traditional │ POM │ BDD │ Type
────────────────────┼─────────────┼─────┼─────┼─────────────
Home page loads     │      ✓      │  ✓  │  ✓  │ All 15
Navigation          │      ✓      │  ✓  │  ✓  │ required
Search function     │      ✓      │  ✓  │  ✓  │ test cases
Category filter     │      ✓      │  ✓  │  ✓  │ covered
Brand filter        │      ✓      │  ✓  │  ✓  │ in multiple
Add to cart         │      ✓      │  ✓  │  ✓  │ formats
Checkout available  │      ✓      │  ✓  │  ✓  │
Sustainability      │      ✓      │  ✓  │  ✓  │
Product details     │      ✓      │  ✓  │  ✓  │
Privacy page        │      ✓      │  ✓  │  ✓  │
Sort/filter         │      ✓      │  ✓  │  ✓  │
Footer content      │      ✓      │  ✓  │  ✓  │
Keyboard nav        │      ✓      │  ✓  │  ✓  │
Responsive          │      ✓      │  ✓  │  ✓  │
Load speed/JS       │      ✓      │  ✓  │  ✓  │
```

## Dependency Tree

```
cypress-project/
│
├── package.json
│   ├── cypress@15.13.0
│   ├── @badeball/cypress-cucumber-preprocessor@20.0.0
│   └── @bahmutov/cypress-esbuild-preprocessor@2.2.2
│
├── cypress.config.js
│   ├── Cucumber Preprocessor Plugin
│   ├── esbuild Bundler
│   └── Feature File Support
│
├── .github/workflows/
│   ├── cypress-tests.yml
│   ├── nightly-tests.yml
│   └── manual-test-run.yml
│
└── Project Files
    ├── Page Objects (6)
    ├── Step Definitions (1)
    ├── Feature Files (4)
    ├── Test Files (2)
    ├── Custom Commands (30+)
    ├── Fixtures (1)
    └── Support Files (2)
```

## Features Summary

```
┌────────────────────────────────────────────────────┐
│    Cypress E2E Testing Suite Features             │
├────────────────────────────────────────────────────┤
│                                                    │
│  ✓ 15 Comprehensive Test Cases                    │
│  ✓ 3 Testing Approaches                           │
│    - Traditional Cypress                          │
│    - Page Object Model                            │
│    - BDD/Cucumber                                 │
│  ✓ 6 Page Object Classes                          │
│  ✓ 30+ Custom Commands                            │
│  ✓ 40+ BDD Step Definitions                       │
│  ✓ 4 Feature Files (28 scenarios)                 │
│  ✓ 3 GitHub Actions Workflows                     │
│  ✓ Comprehensive Documentation                    │
│  ✓ Multi-browser Support                          │
│  ✓ Automated Test Reporting                       │
│  ✓ Screenshot Capture                             │
│  ✓ Video Recording                                │
│  ✓ Schedule & Manual Trigger                      │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

This architecture ensures:
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new tests
- **Reusability**: DRY principle applied
- **Automation**: Full CI/CD integration
- **Documentation**: Comprehensive guides
