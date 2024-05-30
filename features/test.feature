Feature: Sauce Demo E-commerce Flow

  Scenario: Complete E-commerce flow on Sauce Demo
    Given I open the Sauce Demo website
    When I login with userID "standard_user" and password "secret_sauce"
    Then I add items to the cart from CSV "data/testData.csv"
    And I verify all items are present on the landing page
    And I go to the cart
    And I remove "Sauce Labs Bike Light" from the cart
    And I remove "Sauce Labs Bolt T-Shirt" from the checkout
    And I go to the cart
    And I click "Checkout"
    And I provide the customer information "John", "Doe", "12345"
    And I click "Continue"
    And I check the total price and click "Finish" if total is less than $40.00 else click "Cancel"
    Then I should see the confirmation message "Thank you for your order!"
    And I click "Back Home"
    And I logout from the webapp
