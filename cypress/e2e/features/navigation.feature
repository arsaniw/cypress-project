Feature: Practice Software Testing - Navigation and Footer

  Background:
    Given the user opens the home page
    And the user initializes page objects

  Scenario: Privacy policy page is accessible from footer
    When the user clicks the privacy policy link
    Then the privacy page should load

  Scenario: Privacy page contains policy information
    When the user clicks the privacy policy link
    Then the privacy policy content should be visible

  Scenario: Footer contains copyright information
    Then the footer should be present
    And the copyright notice should be present

  Scenario: Navigation menu is present
    Then the navigation header should be present

  Scenario: Footer is present and contains expected content
    Then the footer should be present
    And the footer should contain "Practice"
