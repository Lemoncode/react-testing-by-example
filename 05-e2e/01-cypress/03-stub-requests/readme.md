# 03 Debug

In this example we are going to configure cypress to debug it.

We will start from `02-selectors`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- We are going to configure debug, first we need to enable debug mode in cypress chrome browser:

### ./cypress/plugins/index.js

```diff
module.exports = (on, config) => {
- // `on` is used to hook into various events Cypress emits
- // `config` is the resolved Cypress config
+ on('before:browser:launch', (browser = {}, args) => {
+   if (browser.name === 'chrome') {
+     args.push('--remote-debugging-port=9222');
+     return args;
+   }
+ });
};
```

> More info [here](https://docs.cypress.io/guides/tooling/plugins-guide.html#Configuration)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
