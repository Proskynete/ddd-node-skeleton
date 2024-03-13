Feature: Create example controller
  In order to have a working example
  As a developer
  I want to create a controller that returns a string

  Scenario: Create example controller
    Given I send a GET request to "/" with body:
    """
    {
      "name": "example",
    }
    """
    Then the response status should be 200
    And the response body should be empty