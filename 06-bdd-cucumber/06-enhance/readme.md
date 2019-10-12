# 06 Enhance

Now it's time to give a little twist to our design using an a external libraary
We will start from `05-router`

Summary steps:

- Enhance `todos` using material ui card

## 1. Let's refactor our **todo** component using material-ui cards

Edit _./src\pods\todos\components\todo.component.tsx_ as follows

```diff
import * as React from 'react';
import { Todo } from '../viewmodels/todo.viewmodel';
+import Checkbox from '@material-ui/core/Checkbox'
+import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
  todo: Todo;
}

export const TodoComponent: React.FunctionComponent<Props> = props => {
  const { completed, title, id } = props.todo;
  return (
    <li>
-     <input
-       type="checkbox"
-       checked={completed}
-       onChange={e => console.log(e)}
-     />
-     <span>{title}</span>
+     <FormControlLabel
+       label={title}
+       labelPlacement="end"
+       control={<Checkbox checked={completed} onChange={e => console.log(e)} />}
+     />
    </li>
  );
};

```

If we run our tests nothing changes at all, still working.

Now we're going to handle todo toggle.

Edit _./src\pods\todos\components\todo.component.tsx_

```diff
import * as React from 'react';
import { Todo } from '../viewmodels/todo.viewmodel';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
  todo: Todo;
+ toggleTodo: (id: number) => void
}

export const TodoComponent: React.FunctionComponent<Props> = props => {
  const { completed, title, id } = props.todo;
  const { toggleTodo } = props;
+ const toggleTodoHandler = (id) => () => {
+   toggleTodo(id);
+ };
  return (
    <li>
      <FormControlLabel
        label={title}
        labelPlacement="end"
-       control={<Checkbox checked={completed} onChange={e => console.log(e)} />}
+       control={<Checkbox checked={completed} onChange={toggleTodoHandler(id)} />}
      />
    </li>
  );
};

```

If we run our tests still passing.

Modify _./src\pods\todos\components\todos-list.component.tsx_

```diff
import * as React from 'react';
import { TodoComponent } from './todo.component';
import { Todo } from '../viewmodels/todo.viewmodel';

interface Props {
  todos: Todo[];
+ toggleTodo: (id: number) => void;
}

export const TodosListComponent: React.FunctionComponent<Props> = props => {
  const { todos, toggleTodo } = props;

  return (
    <ul data-testid="todos">
      {todos.map(todo => (
-       <TodoComponent key={todo.id} todo={todo} />
+       <TodoComponent toggleTodo={toggleTodo} key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

```

Modify _./src\pods\todos\todos.container.tsx_

```diff
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

+ const toggleTodo = (id: number) => {
+   const updatedTodos = todos.map((t) => {
+     if (t.id !== id) {
+       return t;
+     }
+     return {
+       ...t,
+       completed: !t.completed,
+     };
+   });
+   setTodos(updatedTodos);
+ };

- return <TodosListComponent todos={todos} />;
+ return <TodosListComponent toggleTodo={toggleTodo} todos={todos} />;
};

```

Our tests still passing.

For last we're going to remove the bullets from the list.

Edit _./src\pods\todos\components\todos-list.component.tsx_

```diff
import * as React from 'react';
import { TodoComponent } from './todo.component';
import { Todo } from '../viewmodels/todo.viewmodel';

interface Props {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

export const TodosListComponent: React.FunctionComponent<Props> = props => {
  const { todos, toggleTodo } = props;

  return (
-   <ul data-testid="todos">
+   <ul data-testid="todos" style={{ listStyleType: 'none' }}>
      {todos.map(todo => (
        <TodoComponent toggleTodo={toggleTodo} key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
