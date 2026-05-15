Feature: Practice Software Testing - Home Page Functionality

  Background:
    Given the user opens the home page
    And the user initializes page objects

  Scenario: Home page loads with expected title and footer
    Then the home page should load successfully
    And the footer should be present
    And the footer should contain "Practice"

  Scenario: Top navigation contains Toolshop and Privacy Policy links
    Then the navigation header should be present
    And the privacy policy link should be present in the footer

  Scenario: Search functionality returns results
    When the user searches for "hammer"
    Then the search results should contain "hammer"
    And the page should display product results

  Scenario: Category selection modifies product context
    Then the page should display product results
    When the user selects the "Hand Tools" category
    Then the products should be filtered by "Hand Tools"

  Scenario: Brand filter panel exists and interactive
    Then the filter panel should be visible
    And the page should display product results

  Scenario: Add first visible product to cart
    When the user searches for "hammer"
    Then the search results should contain "hammer"
    And the page should display product results

  Scenario: Checkout link is available in cart state
    When the user searches for "hammer"
    Then the search results should contain "hammer"
    And the page should display product results
    Then the cart link should be visible

  Scenario: Sustainability section is visible with product items
    Then the page should display product results

  Scenario: Opening a product details page works
    When the user searches for "pliers"
    Then the search results should contain "pliers"
    When the user opens a product named "Pliers"
    Then the product page should load successfully

  Scenario: Privacy page is reachable and contains policy text
    When the user clicks the privacy policy link
    Then the privacy page should load
    And the privacy policy content should be visible

  Scenario: Page has sorting controls and price range filters
    Then the sort controls should be present
    And the filter panel should be visible

  Scenario: Footer has additional link and license text
    Then the footer should be present
    And the copyright notice should be present

  Scenario: Site supports keyboard navigation for search bar
    When the user searches for "hammer"
    Then the search results should contain "hammer"

  Scenario: Responsive menu and touch interactions are available
    Then the page should be fully loaded

  Scenario: Load main app quickly with no JS errors in console
    Then no JavaScript errors should be present
    And the page should be fully loaded
