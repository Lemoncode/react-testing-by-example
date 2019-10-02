# 03 Sagas

In this sample we are going to test Redux sagas.

We will start from sample _02-reducers_.

Summary steps:

- Add tests for `pages/members/list/sagas/fetchMembersSaga.ts` saga
- Add tests for `pages/members/list/sagas/index.ts` root module saga
- Add tests for `pages/sagas.ts` root saga

# Steps to build it

- Be sure dependencies are installed, otherwise just run:

```bash
npm install
```

A saga is nothing but a generator. So in order to test a saga we can test it as a normal generator. The good news when testing sagas is that all `redux-saga` effects are declarative and just descriptions of what is need to be done.

## Adding tests for `pages/members/list/sagas/fetchMembersSaga.ts`

Let's create the `fetchMembersSaga.spec.ts` file near to its implementation under `./src/pages/members/list/sagas`:

### **./src/pages/members/sagas/fetchMembersSaga.spec.ts**

```ts
describe('pages/members/sagas/fetchMembers sagas', () => {});
```

The first saga we test will be the watcher one. Let's add a separated spec for that one:

### **./src/pages/members/sagas/fetchMembersSaga.spec.ts**

```diff
+ import { fetchMembersSaga, watchFetchMembersRequest } from './fetchMembersSaga';

  describe('pages/members/sagas/fetchMembers sagas', () => {
+   describe('watchFetchMembersRequest', () => {
+     it('should wait for expected action and execute the expected worker', () => {
+       // Arrange
+
+       // Act
+
+       // Assert
+     });
+   });
  });
```

In order to test that generator we need to create an instance of `watchFetchMembersRequest` and compare results of
`instance.next().value` with what we expect:

### **./src/pages/members/sagas/fetchMembersSaga.spec.ts**

```diff
+ import { takeLatest } from 'redux-saga/effects';
+ import { actionIds } from '../actions/actionIds';
  import { fetchMembersSaga, watchFetchMembersRequest } from './fetchMembersSaga';

  describe('pages/members/sagas/fetchMembers sagas', () => {
    describe('watchFetchMembersRequest', () => {
      it('should wait for expected action and execute the expected worker', () => {
        // Arrange
+       const saga = watchFetchMembersRequest();

        // Act
+       const result = saga.next();

        // Assert
+       expect(result.value).toEqual(takeLatest(actionIds.FETCH_MEMBERS_REQUEST, fetchMembersSaga));
      });
    });
  });
```

Next we'll test the worker one: `fetchMembersSaga`. As we can see it has some `yield` so we'll need to get the value and assert.
Let's start with the case when the API call is successful and return a members list:

### **./src/pages/members/sagas/fetchMembersSaga.spec.ts**

```diff
- import { takeLatest } from 'redux-saga/effects';
+ import { call, put, takeLatest } from 'redux-saga/effects';
+ import { fetchMembers } from '../../../../rest-api/api/member';
+ import { Member } from '../../../../rest-api/model';
  import { actionIds } from '../actions/actionIds';
+ import { FetchMembersRequestAction, fetchMembersSuccess } from '../actions/fetchMembers';
  import { fetchMembersSaga, watchFetchMembersRequest } from './fetchMembersSaga';

  describe('pages/members/sagas/fetchMembers sagas', () => {
    describe('watchFetchMembersRequest', () => {
      ...
    });
+
+   describe('fetchMembersSaga', () => {
+     it('should put fetchMembersSuccess with given members when API call is succesful', () => {
+       // Arrange
+       const fetchMembersRequest: FetchMembersRequestAction = {
+         type: actionIds.FETCH_MEMBERS_REQUEST,
+         payload: null,
+       };
+       const saga = fetchMembersSaga(fetchMembersRequest);
+       const members: Member[] = [{ id: 1, login: 'test login', avatar_url: 'test avatar' }];

+       // Act & Assert
+       expect(saga.next().value).toEqual(call(fetchMembers));
+       expect(saga.next(members).value).toEqual(put(fetchMembersSuccess(members)));
+     });
    });
  });
```

Now we'll test the non happy path when API returns an error:

### **./src/pages/members/sagas/fetchMembersSaga.spec.ts**

```diff
  import { call, put, takeLatest } from 'redux-saga/effects';
  import { fetchMembers } from '../../../../rest-api/api/member';
  import { Member } from '../../../../rest-api/model';
  import { actionIds } from '../actions/actionIds';
- import { FetchMembersRequestAction, fetchMembersSuccess } from '../actions/fetchMembers';
+ import { fetchMembersError, FetchMembersRequestAction, fetchMembersSuccess } from '../actions/fetchMembers';
  import { fetchMembersSaga, watchFetchMembersRequest } from './fetchMembersSaga';

  describe('pages/members/sagas/fetchMembers sagas', () => {
    describe('watchFetchMembersRequest', () => {
      ...
    });

    describe('fetchMembersSaga', () => {
      it('should put fetchMembersSuccess with givne members when API call is succesful', () => {
        ...
      });
+
+     it('should put fetchMembersError with given error when API call is not succesful', () => {
+       // Arrange
+       const fetchMembersRequest: FetchMembersRequestAction = {
+         type: actionIds.FETCH_MEMBERS_REQUEST,
+         payload: null,
+       };
+       const saga = fetchMembersSaga(fetchMembersRequest);
+       const thrownError = new Error('test error');

+       // Act & Assert
+       expect(saga.next().value).toEqual(call(fetchMembers));
+       expect(saga.throw(thrownError).value).toEqual(put(fetchMembersError(thrownError.message)));
+     });
    });
  });
```

We'll explore another way to test sagas. This approximation can be used only when a saga ends and is not stuck in blocking calls in a infinite loop and it will give us all dispatched actions to the store via `put` effect. Let's create the folder `src/common/test` that will be used to store all our test utilities. Now we'll create a `getDispatchedActionsFromSaga.ts` file:

### **./src/common/test/getDispatchedActionsFromSaga.ts**

```ts
import { runSaga } from 'redux-saga';

export async function getDispatchedActionsFromSaga(saga, initialAction) {
  const dispatchedActions = [];

  await runSaga(
    {
      dispatch: (action) => dispatchedActions.push(action),
    },
    saga,
    initialAction
  ).toPromise();

  return dispatchedActions;
}
```

Let's add a barrel for our `test` folder:

### **./src/common/test/index.ts**

```ts
export * from './getDispatchedActionsFromSaga';
```

Since using this approximation the saga will be launched as in real app we need to mock the API call.

### **./src/pages/members/sagas/fetchMembersSaga.spec.ts**

```diff
  import { call, put, takeLatest } from 'redux-saga/effects';
+ import { getDispatchedActionsFromSaga } from '../../../../common/test';
+ import * as api from '../../../../rest-api/api/member';
- import { fetchMembers } from '../../../../rest-api/api/member';
  import { Member } from '../../../../rest-api/model';
+ import { MembersAction } from '../actions';
  import { actionIds } from '../actions/actionIds';
  import { fetchMembersError, FetchMembersRequestAction, fetchMembersSuccess } from '../actions/fetchMembers';
  import { fetchMembersSaga, watchFetchMembersRequest } from './fetchMembersSaga';

  describe('pages/members/sagas/fetchMembers sagas', () => {
    describe('watchFetchMembersRequest', () => {
      ...
    });

    describe('fetchMembersSaga', () => {
      it('should put fetchMembersSuccess with givne members when API call is succesful', () => {
        ...
-       expect(saga.next().value).toEqual(call(fetchMembers));
+       expect(saga.next().value).toEqual(call(api.fetchMembers));
        ...
      });

      it('should put fetchMembersError with given error when API call is not succesful', () => {
        ...
-       expect(saga.next().value).toEqual(call(fetchMembers));
+       expect(saga.next().value).toEqual(call(api.fetchMembers));
        ...
      });
+
+     it('should dispatch the expected actions if API call is successful', async () => {
+       // Arrange
+       const fetchMembersRequest: FetchMembersRequestAction = {
+         type: actionIds.FETCH_MEMBERS_REQUEST,
+         payload: null,
+       };
+       const members: Member[] = [{ id: 1, login: 'test login', avatar_url: 'test avatar' }];
+       jest.spyOn(api, 'fetchMembers').mockImplementation(() => Promise.resolve(members));
+       const expectedActions: MembersAction[] = [fetchMembersSuccess(members)];

+       // Act
+       const dispatchedActions = await getDispatchedActionsFromSaga(fetchMembersSaga, fetchMembersRequest);

+       // Assert
+       expect(dispatchedActions).toEqual(expectedActions);
+     });
    });
  });
```

Finally let's use the same approximation for a failed API call:

### **./src/pages/members/sagas/fetchMembersSaga.spec.ts**

```diff
  import { call, put, takeLatest } from 'redux-saga/effects';
  import { getDispatchedActionsFromSaga } from '../../../../common/test';
  import * as api from '../../../../rest-api/api/member';
  import { Member } from '../../../../rest-api/model';
  import { MembersAction } from '../actions';
  import { actionIds } from '../actions/actionIds';
  import { fetchMembersError, FetchMembersRequestAction, fetchMembersSuccess } from '../actions/fetchMembers';
  import { fetchMembersSaga, watchFetchMembersRequest } from './fetchMembersSaga';

  describe('pages/members/sagas/fetchMembers sagas', () => {
    describe('watchFetchMembersRequest', () => {
      it('should wait for expected action and execute the expected worker', () => {
        ...
      });
    });

    describe('fetchMembersSaga', () => {
      it('should put fetchMembersSuccess with givne members when API call is succesful', () => {
        ...
      });

      it('should put fetchMembersError with given error when API call is not succesful', () => {
        ...
      });

      it('should dispatch the expected actions if API call is successful', async () => {
        ...
      });
+
+     it('should dispatch the expected actions if API call is not successful', async () => {
+       // Arrange
+       const fetchMembersRequest: FetchMembersRequestAction = {
+         type: actionIds.FETCH_MEMBERS_REQUEST,
+         payload: null,
+       };
+       const thrownError = new Error('test error');
+       jest.spyOn(api, 'fetchMembers').mockImplementation(() => Promise.reject(thrownError));
+       const expectedActions: MembersAction[] = [fetchMembersError(thrownError.message)];
+
+       // Act
+       const dispatchedActions = await getDispatchedActionsFromSaga(fetchMembersSaga, fetchMembersRequest);
+
+       // Assert
+       expect(dispatchedActions).toEqual(expectedActions);
+     });
    });
  });
```

## Adding tests for `pages/members/list/sagas/index.ts`

Let's create a `index.spec.ts` file near the implementation under `./src/pages/members/list/sagas`. This test should be pretty straightforward, checking that our root saga runs our `watchFetchMembersRequest` watcher:

### **./src/pages/members/sagas/index.spec.ts**

```ts
import { watchFetchMembersRequest } from './fetchMembersSaga';
import { membersRootSaga } from './index';

describe('pages/members/list/membersRootSaga', () => {
  it('should spawn watchFetchMembersRequest saga', () => {
    // Arrange
    const saga = membersRootSaga();

    // Act
    const result = saga.next();

    // Assert
    expect(result.value).toEqual(watchFetchMembersRequest());
  });
});
```

Finally we could test our top level saga to check it calls membersRootSaga:

### **./src/pages/sagas.ts**

```ts
import { membersRootSaga } from './members';
import { rootSaga } from './sagas';

describe('pages/sagas.ts', () => {
  it('should call expected modules root sagas', () => {
    // Arrange
    const saga = rootSaga();

    // Act
    const result = saga.next();

    // Assert
    expect(result.value).toEqual(membersRootSaga());
  });
});
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
