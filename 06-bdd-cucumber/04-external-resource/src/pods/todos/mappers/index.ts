import * as model from '../api';
import { Todo } from '../viewmodels/todo.viewmodel';

export const mapTodoModelToTodoVM = (todos: model.Todo[]) =>
  todos.map<Todo>(tm => tm);
