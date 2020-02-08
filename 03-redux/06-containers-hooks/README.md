# 06 Containers Hooks

In this sample we are going to refactor our container to use hooks from `react-redux`.

We will start from sample _05-containers_.

# Steps to build it

- Be sure dependencies are installed, otherwise just run:

```bash
npm install
```

## Refactoring `mapStateToProps`

Let's start by refactoring `mapStateToProps`. In order to do that we're going to remove prop by prop from the container and props and apply `useSelector` from `react-redux`.

First, let's refactor `members` prop:

```diff
  import * as React from 'react';
- import { connect } from 'react-redux';
+ import { connect, useSelector } from 'react-redux';
  import { Dispatch } from 'redux';
  import { State } from '../../reducers';
  import { MembersAction } from './actions';
  import { fetchMembersRequest } from './actions/fetchMembers';
  import { MemberListPage } from './page';
  import { getMembersListVM, getServerError } from './selectors';
- import { Member } from './viewModel';

  const mapStateToProps = (state: State) => ({
-   members: getMembersListVM(state),
    serverError: getServerError(state),
  });

  const mapDispatchToProps = (dispatch: Dispatch<MembersAction>) => ({
    fetchMembers: () => {
      dispatch(fetchMembersRequest());
    },
  });

  interface Props {
-   members: Member[];
    serverError: string | null;
    fetchMembers: () => void;
  }

  const PageContainer: React.FunctionComponent<Props> = React.memo((props) => {
-   const { members, serverError, fetchMembers } = props;
+   const { serverError, fetchMembers } = props;
+   const members = useSelector(getMembersListVM);
    React.useEffect(fetchMembers, []);

    return <MemberListPage members={members} serverError={serverError} />;
  });

  export const MemberListPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageContainer);
```

Let's extract `serverError` from `Props` the same way applying the `serverError` selector and remove `mapStateToProps`.

```diff
  import * as React from 'react';
  import { connect, useSelector } from 'react-redux';
  import { Dispatch } from 'redux';
- import { State } from '../../reducers';
  import { MembersAction } from './actions';
  import { fetchMembersRequest } from './actions/fetchMembers';
  import { MemberListPage } from './page';
  import { getMembersListVM, getServerError } from './selectors';

- const mapStateToProps = (state: State) => ({
-   serverError: getServerError(state),
- });

  const mapDispatchToProps = (dispatch: Dispatch<MembersAction>) => ({
    fetchMembers: () => {
      dispatch(fetchMembersRequest());
    },
  });

  interface Props {
-   serverError: string | null;
    fetchMembers: () => void;
  }

  const PageContainer: React.FunctionComponent<Props> = React.memo((props) => {
    const { serverError, fetchMembers } = props;
    const members = useSelector(getMembersListVM);
+   const serverError = useSelector(getServerError);
    React.useEffect(fetchMembers, []);

    return <MemberListPage members={members} serverError={serverError} />;
  });

  export const MemberListPageContainer = connect(
-   mapStateToProps,
+   null,
    mapDispatchToProps
  )(PageContainer);
```

We can check the app is still working as expected by running our tests using

```bash
npm run test:watch
```

## Refactoring `mapDispatchToProps`

In order to refactor `mapDispatchToProps` we can create a custom hook that uses `dispatch` from `useDispatch` and returns the same signature for our `fetchMembers` method:

```diff
  import * as React from 'react';
- import { connect, useSelector } from 'react-redux';
+ import { connect, useDispatch, useSelector } from 'react-redux';
- import { Dispatch } from 'redux';
- import { MembersAction } from './actions';
  import { fetchMembersRequest } from './actions/fetchMembers';
  import { MemberListPage } from './page';
  import { getMembersListVM, getServerError } from './selectors';
-
- const mapDispatchToProps = (dispatch: Dispatch<MembersAction>) => ({
-   fetchMembers: () => {
-     dispatch(fetchMembersRequest());
-   },
- });
-
- interface Props {
-   fetchMembers: () => void;
- }

- const PageContainer: React.FunctionComponent<Props> = React.memo((props) => {
+ const PageContainer: React.FunctionComponent = React.memo(() => {
-   const { serverError, fetchMembers } = props;
    const members = useSelector(getMembersListVM);
    const serverError = useSelector(getServerError);
+   const fetchMembers = useFetchMembers();
    React.useEffect(fetchMembers, []);

    return <MemberListPage members={members} serverError={serverError} />;
  });
+
+ const useFetchMembers = () => {
+   const dispatch = useDispatch();
+   return React.useCallback(() => {
+     dispatch(fetchMembersRequest());
+   }, []);
+ };

  export const MemberListPageContainer = connect(
    null,
-   mapDispatchToProps
+   null
  )(PageContainer);
```

We can see our tests are still passing.

Finally let's get rid of `connect` HOC since we are not using it at all:

```diff
  import * as React from 'react';
- import { connect, useDispatch, useSelector } from 'react-redux';
+ import { useDispatch, useSelector } from 'react-redux';
  import { fetchMembersRequest } from './actions/fetchMembers';
  import { MemberListPage } from './page';
  import { getMembersListVM, getServerError } from './selectors';

- const PageContainer: React.FunctionComponent = React.memo(() => {
+ export const MemberListPageContainer: React.FunctionComponent = React.memo(() => {
    const members = useSelector(getMembersListVM);
    const serverError = useSelector(getServerError);
    const fetchMembers = useFetchMembers();
    React.useEffect(fetchMembers, []);

    return <MemberListPage members={members} serverError={serverError} />;
  });

  const useFetchMembers = () => {
    const dispatch = useDispatch();
    return React.useCallback(() => {
      dispatch(fetchMembersRequest());
    }, []);
  };

- export const MemberListPageContainer = connect(
-   null,
-   null
- )(PageContainer);
```

As we can see our container has lost a lot of boilerplate.

## Refactoring `useSelector` calls

Our implementation is good, but, we could make our container more _redux optimized_. We have to take in consideration how `useSelector` and `useDispatch` work. The `useSelector` custom hook creates a subscription so it can be notified by redux when a changed has been made in our store. That means having multiple calls to `useSelector` in the same container will create multiple subscriptions. That's not good for a big app with a lot of mounted containers. Although our cointainer will be notified more than one time when our `MembersState` changes (because `FETCH_MEMBERS_SUCCESS` action modifies `serverError` and `members` and we're picking up both props from state) **our container _should_ render once**. In order to optimize our store subscription we'll create an unique selector that picks `serverError` and `members`. Does it sound familiar? We're recreating `mapStateToProps`!

```diff
  import * as React from 'react';
- import { useDispatch, useSelector } from 'react-redux';
  import { useDispatch, useSelector, shallowEqual } from 'react-redux';
+ import { State } from '../../reducers';
  import { fetchMembersRequest } from './actions/fetchMembers';
  import { MemberListPage } from './page';
  import { getMembersListVM, getServerError } from './selectors';
+
+ const mapStateToProps = (state: State) => ({
+   members: getMembersListVM(state),
+   serverError: getServerError(state),
+ });

  export const MemberListPageContainer: React.FunctionComponent = React.memo(() => {
-   const members = useSelector(getMembersListVM);
-   const serverError = useSelector(getServerError);
+   const { members, serverError } = useSelector(mapStateToProps, shallowEqual);
    const fetchMembers = useFetchMembers();
    React.useEffect(fetchMembers, []);

    return <MemberListPage members={members} serverError={serverError} />;
  });

  const useFetchMembers = () => {
    const dispatch = useDispatch();
    return React.useCallback(() => {
      dispatch(fetchMembersRequest());
    }, []);
  };
```

> NOTE: By default `useSelector` uses **reference equality** to trigger or not a render. Since our selector `mapStateToProps` always returns a new object this is the perfect scenario to use `shallowEqual` comparator. We could take another approximation and create a new memoized selector using `reselect` and keep the default equallity function since `reselect` combinator function already checks every argument. This would be the implementation:
>
> ```ts
> const mapStateToProps = createSelector(
>   [getMembersListVM, getServerError],
>   (members, serverError) => ({ members, serverError })
> );
>
> // Usage
> const { members, serverError } = useSelector(mapStateToProps);
> ```

Regarding `useDispatch`, since it doesn't create new subscriptions we have no optimization to do here. However, if we want to dispatch different actions and create different methods we could create a `mapDispatchToProps` custom hook that require `dispatch` from `useDispatch` and create the needed functions.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
