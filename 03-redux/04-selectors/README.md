# 04 Selectors

In this sample we are going to test Redux selectors.

We will start from sample _03-sagas_.

Summary steps:

- Create `pages/members/list` selectors
- Create viewmodel selector with `reselect`
- Create proper tests for created selectors

# Steps to build it

- Be sure dependencies are installed, otherwise just run:

```bash
npm install
```

A selector is nothing that a function that picks a slice from state. Selectors are useful for composition and abstraction. We'll install `reselect` to create memoized selectors. Memoized selectors are useful when we apply transformations from the redux state to another entity and we don't want to run that transformation again if that slice of state is not changed.

```bash
npm i -S reselect
```

Let's create a `selectors.ts` file under `./src/pages/members/list`. And create our first selector. This selector will get the root `member` from state:

### **./src/pages/members/list/selectors.ts**

```ts
import { State } from '../../reducers';

export const getMembersState = (state: State) => state.members;
```

Then we'll import `createSelector` from `reselect` to start creating cached selectors with composition:

### **./src/pages/members/list/selectors.ts**

```diff
+ import { createSelector } from 'reselect';
  import { State } from '../../reducers';

  export const getMembersState = (state: State) => state.members;
+
+ export const getMembersList = createSelector(
+   getMembersState,
+   ({ members }) => members
+ );
```

Next we'll create our first viewmodel selector that picks the member list from state and transforms them in `Member` entity from our viewmodel:

### **./src/pages/members/list/selectors.ts**

```diff
  import { createSelector } from 'reselect';
  import { State } from '../../reducers';
+ import { mapMemberListModelToVM } from './mappers';

  export const getMembersState = (state: State) => state.members;

  export const getMembersList = createSelector(
    getMembersState,
    ({ members }) => members
  );
+
+ export const getMembersListVM = createSelector(
+   getMembersList,
+   (members) => mapMemberListModelToVM(members)
+ );
```

Finally let's create another selector to pick `serverError` from state:

### **./src/pages/members/list/selectors.ts**

```diff
  import { createSelector } from 'reselect';
  import { State } from '../../reducers';
  import { mapMemberListModelToVM } from './mappers';

  export const getMembersState = (state: State) => state.members;

  export const getMembersList = createSelector(
    getMembersState,
    ({ members }) => members
  );

  export const getMembersListVM = createSelector(
    getMembersList,
    (members) => mapMemberListModelToVM(members)
  );
+
+ export const getServerError = createSelector(
+   getMembersState,
+   ({ serverError }) => serverError
+ );
```

Let's use our selectors in `pageContainer.tsx`:

### **./src/pages/members/list/pageContainer.tsx**

```diff
  import * as React from 'react';
  import { connect } from 'react-redux';
  import { Dispatch } from 'redux';
  import { State } from '../../reducers';
  import { MembersAction } from './actions';
  import { fetchMembersRequest } from './actions/fetchMembers';
- import { mapMemberListModelToVM } from './mappers';
+ import { getMembersListVM, getServerError } from './selectors';
  import { MemberListPage } from './page';
  import { Member } from './viewModel';

  const mapStateToProps = (state: State) => ({
-   members: mapMemberListModelToVM(state.members.members),
-   serverError: state.members.serverError,
+   members: getMembersListVM(state),
+   serverError: getServerError(state),
  });

  const mapDispatchToProps = (dispatch: Dispatch<MembersAction>) => ({
    ...
  });

  interface Props {
    ...
  }

  const PageContainer: React.FunctionComponent<Props> = React.memo((props) => {
    ...
  });

  export const MemberListPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageContainer);
```

Let's create a `selectors.spec.ts` file near implementation to test they work as expected:

### **./src/pages/members/list/selectors.spec.ts**

```ts
describe('pages/members/list/selectors', () => {});
```

First selector we'll test is `getMembersState`. We should test it provides the expected slice from state:

### **./src/pages/members/list/selectors.spec.ts**

```diff
+ import { State } from '../../reducers';
+ import { getMembersState } from './selectors';

  describe('pages/members/list/selectors', () => {
+   describe('getMembersState', () => {
+     it('should return membersState from state', () => {
+       // Arrange
+       const state: State = {
+         members: {
+           members: [],
+           serverError: null,
+         },
+       };

+       // Act
+       const result = getMembersState(state);

+       // Assert
+       expect(result).toBe(state.members);
+     });
+   });
  });
```

Next We'll test `getMembersList`. It should return members list from state:

### **./src/pages/members/list/selectors.spec.ts**

```diff
  import { State } from '../../reducers';
- import { getMembersState } from './selectors';
+ import { getMembersList, getMembersState } from './selectors';

  describe('pages/members/list/selectors', () => {
    describe('getMembersState', () => {
      ...
    });
+
+   describe('getMembersList', () => {
+     it('should return the expected members list from state', () => {
+       // Arrange
+       const state: State = {
+         members: {
+           members: [],
+           serverError: null,
+         },
+       };

+       // Act
+       const result = getMembersList(state);

+       // Assert
+       expect(result).toBe(state.members.members);
+     });
+   });
  });
```

Now we'll test `getMembersListVM` selector. It relies on `mapMemberListModelToVM` to return the result so we'll have to mock it:

### **./src/pages/members/list/selectors.spec.ts**

```diff
  import { State } from '../../reducers';
+ import * as mappers from './mappers';
- import { getMembersList, getMembersState } from './selectors';
+ import { getMembersList, getMembersListVM, getMembersState } from './selectors';
+ import { Member } from './viewModel';

  describe('pages/members/list/selectors', () => {
    describe('getMembersState', () => {
      ...
    });

    describe('getMembersList', () => {
      ...
    });
+
+   describe('getMembersListVM', () => {
+     it('should return the expected members list from state', () => {
+       // Arrange
+       const state: State = {
+         members: {
+           members: [
+             { id: 1, login: 'test login 1', avatar_url: 'test avatar 1' },
+             { id: 2, login: 'test login 2', avatar_url: 'test avatar 2' },
+           ],
+           serverError: null,
+         },
+       };

+       const membersVM: Member[] = [
+         { id: 1, name: 'test login 1', avatarUrl: 'test avatar 1' },
+         { id: 2, name: 'test login 2', avatarUrl: 'test avatar 2' },
+       ];

+       const mapMemberListModelToVM = jest.spyOn(mappers, 'mapMemberListModelToVM').mockImplementation(() => membersVM);

+       // Act
+       const result = getMembersListVM(state);

+       // Assert
+       expect(result).toBe(membersVM);
+       expect(mapMemberListModelToVM).toHaveBeenCalledWith(state.members.members);
+     });
+   });
  });
```

We could even test the selector computes the result once if we called it multiple times. We'll add another spec for that, however this test should not be necessary.

### **./src/pages/members/list/selectors.spec.ts**

```diff
  import { State } from '../../reducers';
  import * as mappers from './mappers';
  import { getMembersList, getMembersListVM, getMembersState } from './selectors';
  import { Member } from './viewModel';

  describe('pages/members/list/selectors', () => {
    describe('getMembersState', () => {
      ...
    });

    describe('getMembersList', () => {
      ...
    });

    describe('getMembersList', () => {
      it('should return the expected members list from state', () => {
        ...
      });
+
+     it('returns the same state without recomputations when it is called with same state', () => {
+       // Arrange
+       const state: State = {
+         members: {
+           members: [
+             { id: 1, login: 'test login 1', avatar_url: 'test avatar 1' },
+             { id: 2, login: 'test login 2', avatar_url: 'test avatar 2' },
+           ],
+           serverError: null,
+         },
+       };

+       const membersVM: Member[] = [
+         { id: 1, name: 'test login 1', avatarUrl: 'test avatar 1' },
+         { id: 2, name: 'test login 2', avatarUrl: 'test avatar 2' },
+       ];

+       const mapMemberListModelToVM = jest.spyOn(mappers, 'mapMemberListModelToVM').mockImplementation(() => membersVM);

+       // Act
+       const result1 = getMembersListVM(state);
+       const result2 = getMembersListVM(state);
+       const result3 = getMembersListVM(state);

+       // Assert
+       expect(result1 === result2).toBeTruthy();
+       expect(result2 === result3).toBeTruthy();
+       expect(mapMemberListModelToVM).toBeCalledTimes(1);
+     });
    });
  });
```

Finally let's test `getServerError` selector:

```diff
  import { State } from '../../reducers';
  import * as mappers from './mappers';
- import { getMembersList, getMembersListVM, getMembersState } from './selectors';
+ import { getMembersList, getMembersListVM, getMembersState, getServerError } from './selectors';
  import { Member } from './viewModel';

  describe('pages/members/list/selectors', () => {
    describe('getMembersState', () => {
      ...
    });

    describe('getMembersList', () => {
      ...
    });

    describe('getMembersListVM', () => {
      ...
    });
+
+   describe('getServerError', () => {
+     it('should return the expected serverError from state', () => {
+       // Arrange
+       const state: State = {
+         members: {
+           members: [],
+           serverError: 'test error',
+         },
+       };

+       // Act
+       const result = getServerError(state);

+       // Assert
+       expect(result).toBe(state.members.serverError);
+     });
+   });
  });
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
