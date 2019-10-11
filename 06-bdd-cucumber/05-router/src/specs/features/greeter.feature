Feature: Custom user greet

Scenario: User sets its custom greet
  Given I am a user setting my custom greet
  When I set the greet
  Then the greeter should appear

Scenario: User visist his todos
  Given I am a user with my custom greet
  When I visit my todos
  Then the todos list appears

