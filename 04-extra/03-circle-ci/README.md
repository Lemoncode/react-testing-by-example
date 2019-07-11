# 03 Circle CI

In this example we will configure Circle CI.

We will start from `02-travis-ci`.

# Steps

- `npm install` to install previous sample packages:

```bash
npm install
```

- If we take a look to [`Circle CI pricing`](https://circleci.com/pricing/) we could see that we have free CI for open sources projects.

- So, we need to upload our work in a Github repository:

```bash
git add .
git commit -m "base project structure"
git push
```

- Link `Circle CI` with our Github account.

- We are going to create a branch in this repository to add `.travis.yml` config file:

> [Building circleci file for Node](https://circleci.com/docs/2.0/language-javascript/#quickstart-demo-javascript-nodejs-reference-project)

### ./.circleci/config.yml
```yml
version: 2
jobs:
  build:
    working_directory: ~/test-ci-code
    docker:
      - image: circleci/node:10
    steps:
      - checkout
      - run:
          name: install
          command: 'npm install'
      - run:
          name: test
          command: 'npm test'

```

- Commit, push:

```bash
git add .
git commit -m "add circle ci file"
git push
```

- Create a pull request.

- Now a CI build is running once we merge to master, but if we create a new branch and related pull request, we could see that Travis builds are running on PRs too.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
