# matchd-frontend

[![.github/workflows/ci.yml](https://github.com/matchd-ch/matchd-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/matchd-ch/matchd-frontend/actions/workflows/ci.yml)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### GraphQL Introspection and Schema generation
The local deployment offers an unsecured —no CSRF token required— GraphQL endpoint which can be used
for introspection or schema generation with third party tools.

http://api.matchd.lo:8080/introspection


To generate JSON Schemas and its respective Typescript types you can do the following:
```
$ npx apollo service:download --endpoint=http://api.matchd.lo:8080/introspection ./src/api/remote-schema.json

$ npm run codegen
```
Or use the [JetBrains GraphQL](https://plugins.jetbrains.com/plugin/8097-js-graphql) plugin with the
introspection URL.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
