# 04 External Resource

Let's refactor our pod and split it into multiple components
We will start from `03-refactor`

Summary steps:

- Create a new pod todos
- Create an api that will return user related todos
- Develop new features using BDD

## 1. Let's create a new file that will host our **todos** api

Let's install **axios**

```bash
npm i axios -S
```

Create _./src\pods\todos\api\todo.model.ts_

```typescript
export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
```

Create _./src\pods\todos\api\todo.api.ts_

```typescript
import Axios from 'axios';
import { Todo } from './todo.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/users/';

export const getUserTodos = (id: number): Promise<Todo[]> => {
  const url = `${baseUrl}${id}/todos`;
  return Axios.get(url).then(({ data }) => data.filter(d => d.userId === id));
};
```

Create _./src\pods\todos\api\index.ts_

```typescript
export * from './todo.model';
export * from './todo.api';
```

## 2. Our new feature is that users can host a TODO list in our application.

Create _./src\specs\features\todos.feature_

```
Feature: User todos track

Scenario: User reads its todo list
  Given I am a user opening my todo list
  When I open the todo list
  Then the todo list should appear
  Then the todo list show my todos

```

Create _./src\specs\step-definitions\todos.feature.steps.tsx_

```tsx
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/specs/features/todos.feature');

defineFeature(feature, test => {
  test('User reads its todo list', ({ given, when, then }) => {
    given('I am a user opening my todo list', () => {});

    when('I open the todo list', () => {});

    then('the todo list should appear', () => {});

    then('the todo list show my todos', () => {});
  });
});
```

## 3. Now we're going to implement this new feature.

Let's start by creating new components

Create _./src\pods\todos\viewmodels\todo.viewmodel.ts_

```typescript
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

Create _./src\pods\todos\components\todo.component.tsx_

```tsx
import * as React from 'react';
import { Todo } from '../viewmodels/todo.viewmodel';

interface Props {
  todo: Todo;
}

export const TodoComponent: React.FunctionComponent<Props> = props => {
  const { completed, title, id } = props.todo;
  return (
    <li>
      <input type="checkbox" checked={completed} />
      <span>{title}</span>
    </li>
  );
};
```

Create _./src\pods\todos\components\todos-list.component.tsx_

```tsx
import * as React from 'react';
import { TodoComponent } from './todo.component';
import { Todo } from '../viewmodels/todo.viewmodel';

interface Props {
  todos: Todo[];
}

export const TodosListComponent: React.FunctionComponent<Props> = props => {
  const { todos } = props;

  return (
    <ul>
      {todos.map(todo => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
```

## 4. We're ready to start to deal with a new container for our todos

Create a new file _./src\pods\todos\mappers\index.ts_

```typescript
import * as model from '../api';
import { Todo } from '../viewmodels/todo.viewmodel';

export const mapTodoModelToTodoVM = (todos: model.Todo[]) =>
  todos.map<Todo>(tm => tm);
```

## 5. We have every thing settle to start with our container

Create _./src\pods\todos\todos.container.tsx_

```typescript
import * as React from 'react';
import { TodosListComponent } from './components/todos-list.component';
import { getUserTodos } from './api';
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
```

## 6. Now lets implement our test

Modify _./src\pods\greeter\greeter.container.tsx_

```diff
import { loadFeature, defineFeature } from 'jest-cucumber';
+import * as React from 'react';
+import { TodosContainer } from '../../pods/todos/todos.container';
+import { render, waitForElement, act } from '@testing-library/react';
+import * as api from '../../pods/todos/api/todo.api';

const feature = loadFeature('./src/specs/features/todos.feature');

defineFeature(feature, test => {
  test('User reads its todo list', ({given, when, then}) => {
+   let todosContainer;
+   let getStub;
+   let element;
    given('I am a user opening my todo list', () => {
+     getStub = jest.spyOn(api, 'getUserTodos').mockImplementation(() => Promise.resolve([
+       {
+         id: 1,
+         userId: 1,
+         completed: false,
+         title: 'test todo',
+       }
+     ]));
    });

    when('I open the todo list', () => {
+     act(() => {
+       todosContainer = render(<TodosContainer />);
+     });
    });

    then('the todo list should appear', async () => {
+     const { getByText } = todosContainer;
+     element = await waitForElement(() => getByText('test todo'));
+     expect(getStub).toHaveBeenCalled();
    });

    then('the todo list show my todos', () => {
+     expect(element).not.toBeUndefined();
    });
  });
});


```

Let's give a try and run our tests.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
