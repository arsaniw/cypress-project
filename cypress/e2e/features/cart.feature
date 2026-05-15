Feature: Practice Software Testing - Shopping Cart

  Background:
    Given the user opens the home page
    And the user initializes page objects

  Scenario: Search for products
    When the user searches for "hammer"
    Then the search results should contain "hammer"
    And the page should display product results

  Scenario: Filter products by category
    When the user selects the "Hand Tools" category
    Then the products should be filtered by "Hand Tools"
    And the page should display product results

  Scenario: Filter products by brand
    When the user checks filter panel visibility
    Then the filter panel should be visible
    And the page should display product results
