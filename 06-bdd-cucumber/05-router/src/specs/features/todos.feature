Feature: User todos track

Scenario: User reads its todo list
  Given I am a user opening my todo list
  When I open the todo list
  Then the todo list should appear
  Then the todo list show my todos
