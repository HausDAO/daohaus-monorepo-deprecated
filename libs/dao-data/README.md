# @daohaus/data

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build dao-data` to build the library.

## Running unit tests

Run `NODE_OPTIONS=--experimental-vm-modules nx run dao-data:test` to execute the unit tests via [Jest](https://jestjs.io).

## Generating GraphQL Schema and Types

1. When updates are deployed to the Daohaus V3 subgraphs, a new schema should be generated

   run `nx generate-gql-schema dao-data` to create a new `src/subgraph/schema.graphql` file

2. When there is a new schema or new qury files are added, new types should be generated

   run `nx generate-gql-types dao-data` to create type fiels for each query file in `src/subgraph/queries`
