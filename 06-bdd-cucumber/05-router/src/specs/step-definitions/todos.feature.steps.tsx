import { loadFeature, defineFeature } from 'jest-cucumber';
import * as React from 'react';
import { TodosContainer } from '../../pods/todos/todos.container';
import { render, waitForElement, act } from '@testing-library/react';
import * as api from '../../pods/todos/api/todo.api';

const feature = loadFeature('./src/specs/features/todos.feature');

defineFeature(feature, test => {
  test('User reads its todo list', ({ given, when, then }) => {
    let todosContainer;
    let getStub;
    let element;
    given('I am a user opening my todo list', () => {
      getStub = jest.spyOn(api, 'getUserTodos').mockImplementation(() =>
        Promise.resolve([
          {
            id: 1,
            userId: 1,
            completed: false,
            title: 'test todo',
          },
        ])
      );
    });

    when('I open the todo list', () => {
      act(() => {
        todosContainer = render(<TodosContainer />);
      });
    });

    then('the todo list should appear', async () => {
      const { getByText } = todosContainer;
      element = await waitForElement(() => getByText('test todo'));
      expect(getStub).toHaveBeenCalled();
    });

    then('the todo list show my todos', () => {
      expect(element).not.toBeUndefined();
    });
  });
});
