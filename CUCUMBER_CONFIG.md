# Cypress Cucumber Configuration

This file configures the behavior-driven development (BDD) setup using Cypress and Cucumber.

## Configuration Details

### File: cypress.config.js

```javascript
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    specPattern: 'cypress/e2e/**/*.{cy.js,feature}',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    env: {
      defaultTimeout: 10000,
    },
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
  },
});
```

## Features

### Supported File Types
- `*.cy.js` - Traditional Cypress test files
- `*.feature` - Gherkin feature files for BDD

### Base URL
All tests run against: `https://practicesoftwaretesting.com`

### Timeouts
Default timeout for element operations: 10000ms (10 seconds)

## Writing Feature Files

### Structure
```gherkin
Feature: Feature Description
  Description of the feature

  Background:
    Given common setup steps
    And initial conditions

  Scenario: Scenario Description
    Given preconditions
    When action is performed
    Then expected outcome
    And additional assertion
```

### Example
```gherkin
Feature: Search Functionality
  Users should be able to search for products

  Scenario: Search returns results
    Given the user opens the home page
    When the user searches for "hammer"
    Then the search results should contain "hammer"
    And the page should display product results
```

## Step Definition Locations

Step definitions should be placed in:
```
cypress/e2e/step_definitions/*.steps.js
```

### Naming Convention
- File pattern: `<feature-name>.steps.js`
- Example: `common.steps.js`, `product.steps.js`

## Integration with Page Objects

```javascript
// In step definitions
const HomePage = require('../pageObjects/HomePage');

Given('the user opens the home page', () => {
  const homePage = new HomePage();
  homePage.openHome();
});
```

## Running BDD Tests

### All feature files
```bash
npx cypress run --spec "cypress/e2e/features/*.feature"
```

### Specific feature
```bash
npx cypress run --spec "cypress/e2e/features/homepage.feature"
```

### Interactive mode
```bash
npx cypress open
```

Then select the feature file to run.

## Best Practices

1. **Write Clear Scenarios**: Use simple, descriptive language
2. **DRY Principle**: Reuse steps across scenarios
3. **One Thing Per Scenario**: Test single functionality
4. **Use Backgrounds**: For common setup steps
5. **Organize by Feature**: Group related scenarios
6. **Meaningful Names**: Use action-based naming

## Scenario Guidelines

### Good Scenario
```gherkin
Scenario: User can search for products by name
  Given the user opens the home page
  When the user searches for "hammer"
  Then the search results should contain "hammer"
  And at least one product should be displayed
```

### Avoid Overly Complex Scenarios
```gherkin
# ❌ Too complex
Scenario: User can search, filter, add to cart, and checkout
  ...too many steps...

# ✅ Better approach
Scenario: User can search for products
  ...search only...

Scenario: User can filter by category
  ...filter only...
```

## Environment Variables

Access in step definitions:
```javascript
const timeout = Cypress.env('defaultTimeout');
```

## Debugging

### View step execution
```bash
DEBUG=cypress:launcher npx cypress run
```

### Pause at step
```javascript
Then('a step', () => {
  cy.pause(); // Pauses execution here
  // ... test code
});
```

### Log information
```javascript
When('user performs action', () => {
  cy.log('User is performing action');
  // ... test code
});
```

## File Organization

```
cypress/e2e/
├── features/                    # Feature files
│   ├── homepage.feature
│   ├── products.feature
│   ├── cart.feature
│   └── navigation.feature
├── step_definitions/            # Step implementations
│   ├── common.steps.js
│   ├── product.steps.js
│   └── cart.steps.js
├── pageObjects/                # Page Object Models
│   ├── BasePage.js
│   ├── HomePage.js
│   └── ...
└── [*.cy.js files]            # Traditional Cypress tests
```

## Common Issues & Solutions

### Issue: "Step is undefined"
**Cause**: Step definition not matching feature file step
**Solution**: 
- Verify step text matches exactly
- Check file import paths
- Ensure step file is in correct directory

### Issue: Feature files not detected
**Cause**: Configuration issue
**Solution**:
- Check `specPattern` in cypress.config.js
- Verify cucumber plugin installed
- Restart Cypress

### Issue: Page objects not found
**Cause**: Incorrect require paths
**Solution**:
- Use relative paths: `require('../pageObjects/HomePage')`
- Check directory structure
- Verify file names match

## Performance Tips

1. **Minimize waiting**: Let Cypress handle waits
2. **Reuse selectors**: Use constants for common selectors
3. **Batch assertions**: Group related assertions
4. **Clean up**: Clear storage between tests

## Resources

- Cypress Documentation: https://docs.cypress.io
- Cucumber Documentation: https://cucumber.io
- Cypress Cucumber Preprocessor: https://github.com/badeball/cypress-cucumber-preprocessor
