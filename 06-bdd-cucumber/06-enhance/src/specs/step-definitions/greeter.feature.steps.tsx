import { loadFeature, defineFeature } from 'jest-cucumber';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { history } from '../../core/router/history';
import { Switch, Route, Router } from 'react-router-dom';
import { TodosContainer, GreeterContainer } from 'pods';

const feature = loadFeature('./src/specs/features/greeter.feature');

const renderWithRouter = component => {
  return {
    ...render(
      <Router history={history}>
        <Switch>
          <Route path="/users/:id" component={TodosContainer} />
        </Switch>
        {component}
      </Router>
    ),
  };
};

defineFeature(feature, test => {
  test('User sets its custom greet', ({ given, when, then }) => {
    let greeterContainer;
    given('I am a user setting my custom greet', () => {
      greeterContainer = renderWithRouter(<GreeterContainer />);
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
  /*diff*/
  test('User visist his todos', ({ given, when, then }) => {
    let greeterContainer;
    given('I am a user with my custom greet', () => {
      greeterContainer = renderWithRouter(<GreeterContainer />);
    });

    when('I visit my todos', () => {
      const { getByTestId } = greeterContainer;
      fireEvent.click(getByTestId('navigate'));
    });

    then('the todos list appears', () => {
      const { getByTestId } = greeterContainer;
      let todos = getByTestId('todos');
      expect(todos).not.toBeUndefined();
    });
  });
  /*diff*/
});
