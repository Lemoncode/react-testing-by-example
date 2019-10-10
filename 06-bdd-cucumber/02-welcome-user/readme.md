# 02 Welcome User

We want to implement a new feature inour app that greets users in a custom way. To achieve that, each user can set is own custo greet in our app.

We will start from `01-config`

Summary steps:

- Create feature and scenario
- Write tests
- Implement componentso the tests can pass

## 1. Following the **BDD** aproach first we are going to create the scenario(s) for this new feature

Create _./specs/features/greeter.feature_

```
Feature: Custom user greet

Scenario: User sets its custom greet
  Given I am a user setting my custom greet
  When I set the greet
  Then the greeter should appear

```

## 2. Now that we have this is time to create our step definitions.

Create _./specs/step-definitions/greeter.feature.steps.ts_

```typescript
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/specs/features/greeter.feature');

defineFeature(feature, test => {
  test('User sets its custom greet', ({ given, when, then }) => {
    given('I am a user setting my custom greet', () => {});

    when('I set the greet', () => {});

    then('the greeter should appear', () => {});
  });
});
```

## 3. It's time to code, lets create this new feature in our app.

Create _./src\pods\greeter\greeter.container.tsx_

```tsx
import * as React from 'react';

export const GreeterContainer: React.FunctionComponent = () => {
  const [greet, setGreet] = React.useState('');

  return (
    <>
      <h3 data-testid="greet">{greet}</h3>
      <input
        data-testid="greet-setter"
        type="text"
        value={greet}
        onChange={e => setGreet(e.target.value)}
      />
    </>
  );
};
```

## 4. Now we can start to add the tests.

Edit _./src\specs\step-definitions\greeter.feature.steps.ts_

```diff
import { loadFeature, defineFeature } from 'jest-cucumber';
+import * as React from 'react';
+import { render, fireEvent } from '@testing-library/react';
+import { GreeterContainer } from '../../pods/greeter/greeter.container';

const feature = loadFeature('./src/specs/features/greeter.feature');

defineFeature(feature, (test) => {
  test('User sets its custom greet', ({ given, when, then}) => {
+   let greeterContainer;
    given('I am a user setting my custom greet', () => {
+     greeterContainer = render(<GreeterContainer />);
    });

    when('I set the greet', () => {
+     const { getByTestId } = greeterContainer;
+     const greetSetter = getByTestId('greet-setter');
+     fireEvent.change(greetSetter, { target: { value: 'John' } });
    });

    then('the greeter should appear', () => {
+     const { getByTestId } = greeterContainer;
+     const greet = getByTestId('greet');
+     expect(greet.textContent).toEqual('John');
    });
  });
});

```

Now if we run our tests, just one get hit. We have to change the _jest configuration_ in order to get this new test discover. Modify _./config\test\jest.json_

```diff
{
  "rootDir": "../../",
  "preset": "ts-jest",
  "restoreMocks": true,
  "testMatch": [
   "**/*.steps.ts",
+  "**/*.steps.tsx"
  ],
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

Now if we run the tests all test pass.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
