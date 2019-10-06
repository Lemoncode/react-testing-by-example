# 02 Reducers

In this sample we are going to test Redux reducers.

We will start from sample _01-actions_.

Summary steps:

- Add tests for `members/list/reducers/members` reducer

# Steps to build it

- Be sure dependencies are installed, otherwise just run:

```bash
npm install
```

First we'll add a new dependency: `deep-freeze`. This library is useful to ensure our reducers keeps state transformations immutable.

```bash
npm i -D deep-freeze
```

Let's launch jest in watch mode to start the sample:

```bash
npm run test:watch
```

We will start creating a `members.spec.ts` file near to its implementation under `./src/pages/members/list/reducers` folder

### **./src/pages/members/list/reducers/members.spec.ts**

```ts
describe('pages/members/list/reducers/members reducer tests', () => {
  it('', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

Redux reducers have a minimum of three executions. The first one is when the store is initialized and every reducer creates all chunks of the initial state (if initialState is not fed in `createStore` at the time of creating the store). Redux will launch a `@@INIT` action to initialize all reducers. So let's use that text as the first one:

### **./src/pages/members/list/reducers/members.spec.ts**

```diff
+ import { BaseAction } from '../../../../common/types';
+ import { MembersAction } from '../actions';
+ import { membersReducer, MembersState } from './members';
+
  describe('pages/members/list/reducers/members reducer tests', () => {
+   it('should return the expected state when initialized with undefined initial state', () => {
      // Arrange
+     const action: BaseAction = {
+       type: 'foo',
+       payload: null,
+     };
+
+     const initialState: MembersState = {
+       members: [],
+       serverError: null,
+     };

      // Act
+     const result = membersReducer(undefined, action as MembersAction);

      // Assert
+     expect(result).toEqual(initialState);
    });
  });
```

Next we'll test the behavior when it receives an action with type FETCH_MEMBERS_SUCCESS. It should update `members` and reset `serverError`:

### **./src/pages/members/list/reducers/members.spec.ts**

```diff
+ import deepFreeze from 'deep-freeze';
  import { BaseAction } from '../../../../common/types';
+ import { Member } from '../../../../rest-api/model';
  import { MembersAction } from '../actions';
+ import { actionIds } from '../actions/actionIds';
+ import { FetchMembersSuccessAction } from '../actions/fetchMembers';
  import { membersReducer, MembersState } from './members';

  describe('pages/members/list/reducers/members reducer tests', () => {
    it('should return the expected state when initialized with undefined initial state', () => {
      ...
    });
+
+   it('should return the expected state when action type is FETCH_MEMBERS_SUCCESS', () => {
+     // Arrange
+     const members: Member[] = [{ id: 1, login: 'test name', avatar_url: 'test avatar' }];
+     const action: FetchMembersSuccessAction = {
+       type: actionIds.FETCH_MEMBERS_SUCCESS,
+       payload: members,
+     };
+     const initialState: MembersState = deepFreeze({
+       members: [],
+       serverError: 'test error',
+     });
+
+     // Act
+     const result = membersReducer(initialState, action);
+
+     // Assert
+     expect(result.members).toBe(members);
+     expect(result.serverError).toBeNull();
+   });
  });
```

Let's see how `deep-freeze` helps us to check immutability. Let's refactor `handleFetchMembersSuccess` case and mutate the state:

### **./src/pages/members/list/reducers/members.ts**

```diff
- const handleFetchMembersSuccess = (_state: MembersState, members: Member[]): MembersState => ({
-   members,
-   serverError: null,
- });
+ const handleFetchMembersSuccess = (state: MembersState, members: Member[]): MembersState => {
+   for (const member of members) {
+     state.members.push(member);
+   }
+   return {
+     members: state.members,
+     serverError: null,
+   };
+ };
```

We'll see an error like this one:

```
TypeError: Cannot add property 0, object is not extensible
  at Array.push (<anonymous>)
```

That's because `deep-freeze` makes all properties of our `state` object non writable. When we try to mutate a property an error is thrown. Let's change back the implementation to get all tests happy.

### **./src/pages/members/list/reducers/members.ts**

```diff
- const handleFetchMembersSuccess = (state: MembersState, members: Member[]): MembersState => {
-   for (const member of members) {
-     state.members.push(member);
-   }
-   return {
-     members: state.members,
-     serverError: null,
-   };
- };
+ const handleFetchMembersSuccess = (_state: MembersState, members: Member[]): MembersState => ({
+   members,
+   serverError: null,
+ });
```

Let's add the proper test when an action with type `FETCH_MEMBERS_ERROR`: it should add to the state the error message from payload:

### **./src/pages/members/list/reducers/members.spec.ts**

```diff
  import deepFreeze from 'deep-freeze';
  import { BaseAction } from '../../../../common/types';
  import { Member } from '../../../../rest-api/model';
  import { MembersAction } from '../actions';
  import { actionIds } from '../actions/actionIds';
- import { FetchMembersSuccessAction } from '../actions/fetchMembers';
+ import { FetchMembersErrorAction, FetchMembersSuccessAction } from '../actions/fetchMembers';
  import { membersReducer, MembersState } from './members';

  describe('pages/members/list/reducers/members reducer tests', () => {
    it('should return the expected state when initialized with undefined initial state', () => {
      ...
    });

    it('should return the expected state when action type is FETCH_MEMBERS_SUCCESS', () => {
      ...
    });
+
+   it('should return the expected state when action type is FETCH_MEMBERS_ERROR', () => {
+     // Arrange
+     const action: FetchMembersErrorAction = {
+       type: actionIds.FETCH_MEMBERS_ERROR,
+       payload: 'test error',
+     };
+     const initialState: MembersState = deepFreeze({
+       members: [],
+       serverError: null,
+     });

+     // Act
+     const result = membersReducer(initialState, action);

+     // Assert
+     expect(result.members).toBe(initialState.members);
+     expect(result.serverError).toBe('test error');
+   });
  });
```

Finally, le'll test how it behaves when an action with an arbitrary type is passed. It should return the state without modifications:

### **./src/pages/members/list/reducers/members.spec.ts**

```diff
  import deepFreeze from 'deep-freeze';
  import { BaseAction } from '../../../../common/types';
  import { Member } from '../../../../rest-api/model';
  import { MembersAction } from '../actions';
  import { actionIds } from '../actions/actionIds';
  import { FetchMembersErrorAction, FetchMembersSuccessAction } from '../actions/fetchMembers';
  import { membersReducer, MembersState } from './members';

  describe('pages/members/list/reducers/members reducer tests', () => {
    it('should return the expected state when initialized with undefined initial state', () => {
      ...
    });

    it('should return the expected state when action type is FETCH_MEMBERS_SUCCESS', () => {
      ...
    });

    it('should return the expected state when action type is FETCH_MEMBERS_ERROR', () => {
      ...
    });
+
+   it('should return the current state if action type is not known', () => {
+     // Arrange
+     const action: BaseAction = {
+       type: 'foo',
+       payload: null,
+     };
+     const initialState: MembersState = deepFreeze({
+       members: [],
+       serverError: null,
+     });
+
+     // Act
+     const result = membersReducer(initialState, action as MembersAction);
+
+     // Assert
+     expect(result).toBe(initialState);
+   });
  });
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
