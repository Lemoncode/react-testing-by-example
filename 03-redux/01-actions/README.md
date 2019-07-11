# 01 Actions creators

In this sample we are going to test Redux actions creators.

We will start from sample _00-boilerplate_.

Summary steps:

- Add `pages/members/list/actions/fetchMembers` specs:
  - Add `fetchMembersRequest` tests
  - Add `fetchMembersSuccess` tests
  - Add `fetchMembersError` tests

# Steps to build it

- Be sure dependencies are installed, otherwise just run:

```bash
npm install
```

## Adding `pages/members/list/actions/fetchMembers` specs

Let's launch jest in watch mode to start the sample:

```bash
npm run test:watch
```

We will start adding tests for `updateLoginEntityField`. Let's create the file `updateLoginEntityField.spec.ts`

### **./src/pages/members/list/actions/fetchMembers.spec.ts**

```ts
describe('pages/members/list/actions/fetchMembers action creators', () => {
  describe('fetchMembersRequest', () => {
    it('', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

Action creators are just simple function that return plain action objects, so it is very easy to test. The only thing we should test is its return type.

### **./src/pages/members/list/actions/fetchMembers.spec.ts**

```diff
+ import { actionIds } from './actionIds';
+ import { fetchMembersRequest } from './fetchMembers';

  describe('pages/members/list/actions/fetchMembers action creators', () => {
    describe('fetchMembersRequest', () => {
-     it('', () => {
+     it('should return an action with type FETCH_MEMBERS_REQUEST and payload null', () => {
        // Arrange

        // Act
+       const result = fetchMembersRequest();
+
        // Assert
+       expect(result.type).toBe(actionIds.FETCH_MEMBERS_REQUEST);
+       expect(result.payload).toBeNull();
      });
    });
  });
```

Next we'll add tests for `fetchMembersSuccess` action creator:

### **./src/pages/members/list/actions/fetchMembers.spec.ts**

```diff
+ import { Member } from '../../../../rest-api/model';
  import { actionIds } from './actionIds';
- import { fetchMembersRequest } from './fetchMembers';
+ import { fetchMembersRequest, fetchMembersSuccess } from './fetchMembers';

  describe('pages/members/list/actions/fetchMembers action creators', () => {
    describe('fetchMembersRequest', () => {
      ...
    });

+   describe('fetchMembersSuccess', () => {
+     it('should return an action with type FETCH_MEMBERS_SUCCESS and payload the given members', () => {
+       // Arrange
+       const members: Member[] = [
+         { id: 1, login: 'John', avatar_url: 'John avatar' },
+         { id: 2, login: 'Jane', avatar_url: 'Jane avatar' },
+         { id: 3, login: 'David', avatar_url: 'David avatar' },
+       ];
+
+       // Act
+       const result = fetchMembersSuccess(members);
+
+       // Assert
+       expect(result.type).toBe(actionIds.FETCH_MEMBERS_SUCCESS);
+       expect(result.payload).toBe(members);
+     });
+   });
  });
```

Finally, the tests for `fetchMembersError` action creator:

### **./src/pages/members/list/actions/fetchMembers.spec.ts**

```diff
  import { Member } from '../../../../rest-api/model';
  import { actionIds } from './actionIds';
- import { fetchMembersRequest, fetchMembersSuccess } from './fetchMembers';
+ import { fetchMembersRequest, fetchMembersSuccess, fetchMembersError } from './fetchMembers';

  describe('pages/members/list/actions/fetchMembers action creators', () => {
    describe('fetchMembersRequest', () => {
      ...
    });

    describe('fetchMembersSuccess', () => {
      ...
    });

+   describe('fetchMembersError', () => {
+     it('should return an action with type FETCH_MEMBERS_ERROR and payload the given error', () => {
+       // Arrange
+       const error = 'Something went wrong';
+
+       // Act
+       const result = fetchMembersError(error);
+
+       // Assert
+       expect(result.type).toBe(actionIds.FETCH_MEMBERS_ERROR);
+       expect(result.payload).toBe(error);
+     });
+   });
  });
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
