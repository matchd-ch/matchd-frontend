# matchd-frontend

[![.github/workflows/ci.yml](https://github.com/matchd-ch/matchd-frontend/actions/workflows/branch_main.yml/badge.svg)](https://github.com/matchd-ch/matchd-frontend/actions/workflows/branch_main.yml)

## Bugs / Feature Requests

https://github.com/matchd-ch/stories

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:ct
```

### Lints and fixes files

```
npm run test:lint
```

### GraphQL Introspection and Schema generation

The local deployment offers an unsecured —no CSRF token required— GraphQL endpoint which can be used
for introspection or schema generation with third party tools.

https://development-matchd-backend.joshmartin.ch/graphql/

To generate JSON Schemas and its respective Typescript types you can do the following:

```console
$ npm i -g apollo graphql

$ asdf reshim

$ apollo service:download --endpoint=$VUE_APP_API_URL/graphql/ ./src/api/remote-schema.json

$ npm run codegen
```

Or use the [JetBrains GraphQL](https://plugins.jetbrains.com/plugin/8097-js-graphql) plugin with the
introspection URL.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


## Matchd Test Accounts

https://github.com/matchd-ch/matchd-backend/blob/main/ACCOUNTS.md