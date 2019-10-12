import * as React from 'react';
import { TodoComponent } from './todo.component';
import { Todo } from '../viewmodels/todo.viewmodel';

interface Props {
  todos: Todo[];
}

export const TodosListComponent: React.FunctionComponent<Props> = props => {
  const { todos } = props;

  return (
    <ul data-testid="todos">
      {todos.map(todo => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
