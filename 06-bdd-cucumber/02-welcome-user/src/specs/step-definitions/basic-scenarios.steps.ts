import { loadFeature, defineFeature } from 'jest-cucumber';

import { Rocket } from '../../rocket';

const feature = loadFeature('./src/specs/features/basic-scenarios.feature');

/*
Scenario: Launching a SpaceX rocket
  Given I am Elon Musk attempting to launch a rocket into Space
  When I launch the rocket
  Then the rocket should end up in Space
  And the booster(s) should land back on the launch pad
  And nobody should doubt me ever again
*/

defineFeature(feature, test => {
  test('Launching a SpaceX rocket', ({ given, when, then }) => {
    let rocket: Rocket;

    given('I am Elon Musk attempting to launch a rocket into Space', () => {
      rocket = new Rocket();
    });

    when('I launch the rocket', () => {
      rocket.launch();
    });

    then('the rocket should end up in Space', () => {
      expect(rocket.isInSpace).toBeTruthy();
    });

    then('the booster(s) should land back on the launch pad', () => {
      expect(rocket.boostersLanded).toBeTruthy();
    });

    then('nobody should doubt me ever again', () => {
      expect('people').not.toBe('haters');
    });
  });
});
