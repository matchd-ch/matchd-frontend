# Matchd Frontend

## Introduction

Matchd is a job matching system that matches candidates to companies based on a number of factors, making the screening process much easier for recruiters and thus faciliting the talent search process for companies.

[![.github/workflows/ci.yml](https://github.com/matchd-ch/matchd-frontend/actions/workflows/branch_main.yml/badge.svg)](https://github.com/matchd-ch/matchd-frontend/actions/workflows/branch_main.yml)

## Getting started

Matchd is a VUE 2 based project and uses a GraphQL as its main (and only) API. A local development environment is available to quickly get up and running.

## Project setup

```shell
$ npm ci
```

### Compiles and hot-reloads for development

```shell
$ npm run dev
```

### Compiles and minifies for production

```shell
$ npm run build
```

## Linting & Testing

### Lints and fixes files

```shell
$ npm run test:lint
```

### Run your unit tests

```shell
$ npm run test:ct
```

## GraphQL

The local deployment offers an unsecured —no CSRF token required— GraphQL endpoint which can be used for introspection or schema generation with third party tools.

https://api.development.matchd.ch/graphql/

### Schema generation

To generate JSON Schemas and its respective Typescript types you can do the following:

```shell
$ npm run graphql:introspection

$ npm run graphql:codegen

## Or use the following command to run both commands in a row succession.

$ npm run graphql
```

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Matchd Test Accounts

https://github.com/matchd-ch/matchd-backend/blob/main/ACCOUNTS.md

## Bugs / Feature Requests

https://github.com/matchd-ch/stories
