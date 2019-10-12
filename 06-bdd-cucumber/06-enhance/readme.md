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

## 2. After this little enhancement we're ready to add a new scenario to our todos feature.

```diff
Feature: User todos track

Scenario: User reads its todo list
  Given I am a user opening my todo list
  When I open the todo list
  Then the todo list should appear
  Then the todo list show my todos

+Scenario: User updates his todo list
+  Given I am a user with my todo list
+  When I update a todo
+  Then the todo gets updated

```

Add the step definitions

```tsx
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

  test('User updates his todo list', ({ given, when, then }) => {
    given('I am a user with my todo list', () => {});

    when('I update a todo', () => {});

    then('the todo gets updated', () => {});
  });
});
```

## 2. Let's implement the tests

```diff
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
+   let props;
+   let todosList;
    given('I am a user with my todo list', () => {
+     props = {
+       todos: [ {id: 1, title: 'test todo', completed: false } ],
+       toggleTodo: jest.fn(),
+     };
    });

    when('I update a todo', () => {
+     const { getByTestId } = render(<TodosListComponent {...props}/>);
+     fireEvent.click(getByTestId('toggle-check').querySelector('input[type="checkbox"]'));
    });

    then('the todo gets updated', () => {
+     expect(props.toggleTodo).toHaveBeenCalled();
    });
  });
});

```

The tricky part here is that we're dealing with material-ui library, and can get difficult to reach our elements.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
