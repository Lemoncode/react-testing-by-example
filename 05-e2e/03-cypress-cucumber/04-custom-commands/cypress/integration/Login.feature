Feature: User gets access to application

Scenario: User reaches login page
  Given I am a user that reaches login page

Scenario: User does not provide right credentials
  Given I am a user that reaches login page
  When User provides right login name
  When User provides wrong password
  When User feeds credentials to app
  Then Notify user something goes wrong
