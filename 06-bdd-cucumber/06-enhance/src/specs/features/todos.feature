Feature: User todos track

Scenario: User reads its todo list
  Given I am a user opening my todo list
  When I open the todo list
  Then the todo list should appear
  Then the todo list show my todos

Scenario: User updates his todo list
  Given I am a user with my todo list
  When I update a todo
  Then the todo gets updated
