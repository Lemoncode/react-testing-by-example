# 03 Debug

In this example we are going to add debug configuration.

We will start from `02-selectors`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's add a debug config with VSCode:

### ./.vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "protocol": "inspector",
      "name": "Run e2e",
      "program": "${workspaceRoot}/node_modules/testcafe/bin/testcafe.js",
      "args": ["chrome", "${relativeFile}"],
      "console": "integratedTerminal"
    }
  ]
}
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
