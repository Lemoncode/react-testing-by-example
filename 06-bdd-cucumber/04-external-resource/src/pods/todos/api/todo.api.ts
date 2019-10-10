import Axios from 'axios';
import { Todo } from './todo.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/users/';

// const url = 'https://jsonplaceholder.typicode.com/users/1/todos'
export const getUserTodos = (id: number): Promise<Todo[]> => {
  const url = `${baseUrl}${id}/todos`;
  return Axios.get(url).then(({ data }) => data.filter(d => d.userId === id));
};
