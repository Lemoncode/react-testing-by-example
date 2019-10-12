import * as React from 'react';
import { TodosListComponent } from './components/todos-list.component';
import { getUserTodos } from './api/todo.api';
import { mapTodoModelToTodoVM } from './mappers';

export const TodosContainer: React.FunctionComponent = () => {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    getUserTodos(1)
      .then(todos => todos)
      .then(todos => mapTodoModelToTodoVM(todos))
      .then(todos => setTodos(todos));
  }, []);

  return <TodosListComponent todos={todos} />;
};
