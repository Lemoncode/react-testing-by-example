# 02 Travis CI

In this example we will configure Travis CI.

We will start from `01-coverage`.

# Steps

- `npm install` to install previous sample packages:

```bash
npm install
```

- If we take a look to [`Travis CI pricing`](https://travis-ci.com/plans) we could see that we have free CI for `open sources` or `private` projects.

- So, we need to upload our work in a Github/Bitbucket repository:

```bash
git add .
git commit -m "base project structure"
git push
```

- Link `Travis CI` with our Github account.

- We are going to create a branch in this repository to add `.travis.yml` config file:

> [Building travis file for Node](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)

### ./.travis.yml
```yml
language: node_js
node_js:
  - "10"
install:
  - npm install
script:
  - npm test
```

- Commit, push:

```bash
git add .
git commit -m "add travis ci file"
git push
```

- Create a pull request.

- Now a CI build is running once we merge to master, but if we create a new branch and related pull request, we could see that Travis builds are running on PRs too.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
