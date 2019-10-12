import * as React from 'react';
import { TodoComponent } from './todo.component';
import { Todo } from '../viewmodels/todo.viewmodel';

export interface Props {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

export const TodosListComponent: React.FunctionComponent<Props> = props => {
  const { todos, toggleTodo } = props;

  return (
    <ul data-testid="todos" style={{ listStyleType: 'none' }}>
      {todos.map(todo => (
        <TodoComponent toggleTodo={toggleTodo} key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
