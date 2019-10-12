import { loadFeature, defineFeature } from 'jest-cucumber';
import * as React from 'react';
import { TodosContainer } from '../../pods/todos/todos.container';
import { render, waitForElement, act, fireEvent } from '@testing-library/react';
import * as api from '../../pods/todos/api/todo.api';
import { TodosListComponent } from 'pods/todos/components/todos-list.component';

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

  test('User updates his todo list', ({ given, when, then }) => {
    let props;
    let todosList;
    given('I am a user with my todo list', () => {
      props = {
        todos: [{ id: 1, title: 'test todo', completed: false }],
        toggleTodo: jest.fn(),
      };
    });

    when('I update a todo', () => {
      const { getByTestId } = render(<TodosListComponent {...props} />);
      fireEvent.click(
        getByTestId('toggle-check').querySelector('input[type="checkbox"]')
      );
    });

    then('the todo gets updated', () => {
      expect(props.toggleTodo).toHaveBeenCalled();
    });
  });
});
