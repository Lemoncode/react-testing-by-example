# 08 CI

In this example we are going to continuous integration config.

We will start from `07-edit-hotel`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Add script commands to run in ci process:

### ./package.json

```diff
...
"scripts": {
    "test:e2e": "npm-run-all -p -l -r start:dev start:e2e",
    "start:e2e": "testcafe chrome tests"
+   "test:e2e:ci": "npm-run-all -p -l -r start:dev start:e2e:ci",
+   "start:e2e:ci": "testcafe chrome:headless tests"
  },
...
```

- And run it:

```bash
npm run test:e2e:ci
```

- Notice that TestCafe doesn't add `screenshots` and `videos` by default, you should install some `dependencies`, more info [here](https://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/screenshots-and-videos.html)

- Add circe ci config file:

### ./.circleci/config.yml

```yml
version: 2
jobs:
  build:
    working_directory: ~/test-ci-code
    docker:
      - image: circleci/node:10.14-browsers
    steps:
      - checkout
      - run:
          name: install
          command: 'npm install'
      - run:
          name: test:e2e
          command: 'npm run test:e2e:ci'
```

> More info [here](https://devexpress.github.io/testcafe/documentation/continuous-integration/circleci.html)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
