import { loadFeature, defineFeature } from 'jest-cucumber';
/*
Feature: Custom user greet

Scenario: User sets its custom greet
  Given I am a user setting my custom greet
  When I set the greet
  Then the greeter should appear


*/
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GreeterContainer } from '../../pods/greeter/greeter.container';

const feature = loadFeature('./src/specs/features/greeter.feature');

defineFeature(feature, test => {
  test('User sets its custom greet', ({ given, when, then }) => {
    let greeterContainer;
    given('I am a user setting my custom greet', () => {
      greeterContainer = render(<GreeterContainer />);
    });

    when('I set the greet', () => {
      const { getByTestId } = greeterContainer;
      const greetSetter = getByTestId('greet-setter');
      fireEvent.change(greetSetter, { target: { value: 'John' } });
    });

    then('the greeter should appear', () => {
      const { getByTestId } = greeterContainer;
      const greet = getByTestId('greet');
      expect(greet.textContent).toEqual('John');
    });
  });
});
