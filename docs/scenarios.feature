Feature: Practice Software Testing Application Verification

  # Four scenarios selected from the original Module 2 Gherkin document.
  # This file records the requirements; Playwright executes tests/shop.spec.js.

  # Area 3: Product details page
  Scenario: User views detailed information for a specific tool
    Given the user is on the main catalog page
    When the user clicks on the "Combination Pliers" product card
    And the product details page loads completely
    Then the page should display the product name, price, and description

  # Area 4: Basket
  Scenario: User adds a product to the shopping cart
    Given the user is viewing the details page of "Pliers"
    When the user selects a quantity of 2
    And the user clicks the "Add to Cart" button
    Then the shopping cart badge count should increase to 2

  # Area 6: Search for an exact product
  Scenario: User searches for a specific product by name
    Given the user is on the home page
    When the user enters "Hammer" into the search bar
    And the user clicks the search button
    Then the search results should display only items matching "Hammer"

  # Area 7: Filter and sort products
  Scenario: User sorts products by price from lowest to highest
    Given the user is on the main shop page displaying all items
    When the user selects "Price (Low - High)" from the sort dropdown menu
    And the product list refreshes
    Then the first displayed product should have the lowest price in the list
