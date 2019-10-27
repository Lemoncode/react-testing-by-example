# 01 Config

In this example we are going to add a basic setup needed to support end to end testing with TestCafe.

We will start from `00-boilerplate`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

# Libraries

- We are going to install the main library which we base all our unit tests, [TestCafe](https://devexpress.github.io/testcafe/documentation/getting-started/).

```bash
npm install testcafe --save-dev
```

# Config

- We can just add testcafe command to scripts and running it:

### ./package.json

```diff
"scripts": {
...
    "build:dev": "npm run clean && webpack --config ./config/webpack/dev.js",
    "postinstall": "cd ./server && npm install",
+   "test:e2e": "testcafe chrome tests/"
  },
```

- Run it:

```bash
npm run test:e2e
```

We can see that a new chrome window is open, but as no tets have been set it close immediately.

- Create `tests` folder

### ./tests/login.spec.js

```javascript
fixture('Login specs');

test('visit the login page', async t => {
  await t.navigateTo('http://localhost:8080');
});
```

- An important note is that we need to running the app to execute the e2e tests:

Install _npm-run-all_, this package allows to have multiple processes running at the same time from a single terminal.

### ./package.json

```diff
"scripts": {
...
-   "test:e2e": "testcafe chrome tests/"
+   "test:e2e": "npm-run-all -p -l -r start:dev start:e2e",
+   "start:e2e": "testcafe chrome tests/"
  },
```

> NOTE: We add -r (or --race) flag to stop process because testcafe is a single run process

- So far so good, we can add the base app url in `testcafe.js` to avoid repeat it in whole tests:

### ./testcafe.config.js

```javascript
const config = {
  baseUrl: 'http://localhost:8080',
};

export { config };
```

> NOTE: this is a normal javascript file, it's not a official config file.

### ./tests/login.spec.js

```diff
+ import { config } from '../testcafe.config';
- fixture('Login specs');
+ fixture('Login specs').page(config.baseUrl);

test('visit the login page', async t => {
- await t.navigateTo('http://localhost:8080');
});

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
