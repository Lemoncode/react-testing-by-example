import * as React from 'react';
import { Todo } from '../viewmodels/todo.viewmodel';

interface Props {
  todo: Todo;
}

export const TodoComponent: React.FunctionComponent<Props> = props => {
  const { completed, title, id } = props.todo;
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={e => console.log(e)}
      />
      <span>{title}</span>
    </li>
  );
};
