import * as React from 'react';
import { Todo } from '../viewmodels/todo.viewmodel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

export const TodoComponent: React.FunctionComponent<Props> = props => {
  const { completed, title, id } = props.todo;
  const { toggleTodo } = props;
  const toggleTodoHandler = id => () => {
    toggleTodo(id);
  };
  return (
    <li>
      <FormControlLabel
        label={title}
        labelPlacement="end"
        control={
          <Checkbox checked={completed} onChange={toggleTodoHandler(id)} />
        }
      />
    </li>
  );
};
