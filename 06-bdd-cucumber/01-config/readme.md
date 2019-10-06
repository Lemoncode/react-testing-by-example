# 01 Getting started

We're going to use jest-cucumber.

```bash
$ npm install jest-cucumber --save-dev
```

Config **jest.json** to handle _step files_ as tests.

```diff
{
  "rootDir": "../../",
  "preset": "ts-jest",
  "restoreMocks": true,
+ "testMatch": [
+   "**/*.steps.ts"
+ ],
  "setupFilesAfterEnv": ["@testing-library/react/cleanup-after-each"],
  "moduleNameMapper": {
    "^common-app(.*)$": "<rootDir>/src/common-app/$1",
    "^common(.*)$": "<rootDir>/src/common/$1",
    "^scenes(.*)$": "<rootDir>/src/scenes/$1",
    "^core(.*)$": "<rootDir>/src/core/$1",
    "^layout(.*)$": "<rootDir>/src/layout/$1",
    "^pods(.*)$": "<rootDir>/src/pods/$1"
  }
}

```

Create _src/specs/features/basic-scenario.feature_

```
Feature: Rocket Launchinng

Scenario: Launching a SpaceX rocket
  Given I am Elon Musk attempting to launch a rocket into Space
  When I launch the rocket
  Then the rocket should end up in Space
  And the booster(s) should land back on the launch pad
  And nobody should doubt me ever again

```

Create _src/specs/step-definitions/basic-scenario.steps.ts_

```typescript
import { loadFeature, defineFeature } from 'jest-cucumber';

import { Rocket } from '../../rocket';

const feature = loadFeature('./src/specs/features/basic-scenarios.feature');

defineFeature(feature, test => {
  test('Launching a SpaceX rocket', ({ given, when, then }) => {
    let rocket: Rocket;

    given(
      'Given I am Elon Musk attempting to launch a rocket into Space',
      () => {
        rocket = new Rocket();
      }
    );

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
```

# References:

> jest-cucumber typescript: https://github.com/bencompton/jest-cucumber/tree/ea2dd48835af06246785b1f12686e92cff076297/examples/typescript

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
