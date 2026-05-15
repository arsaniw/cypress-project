Feature: Practice Software Testing - Product Management

  Background:
    Given the user opens the home page
    And the user initializes page objects

  Scenario: Search for hammer product
    When the user searches for "hammer"
    Then the search results should contain "hammer"
    And the page should display product results

  Scenario: Search for pliers and open product details
    When the user searches for "pliers"
    Then the search results should contain "pliers"

  Scenario: Search for screwdriver
    When the user searches for "screwdriver"
    Then the search results should contain "screwdriver"
    And the page should display product results

  Scenario: Apply price range filter
    When the user selects the "Hand Tools" category
    Then the products should be filtered by "Hand Tools"

  Scenario: View product with category filter applied
    When the user selects the "Hand Tools" category
    Then the products should be filtered by "Hand Tools"
    And the page should display product results
