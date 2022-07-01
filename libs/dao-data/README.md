# DAO Data SDK

Our **DAO Data SDK** is a library that provides a set of functions for interacting with the DAO data. This includes querying subgraphs, querying our jobs, and other tools.

This library was generated with [Nx](https://nx.dev).

## Installation

Once this package is published on `npm` we'll have instructions in how to import and use in your apps. If you're using it from inside the monorepo, you can import directly from the package.

The package name for importing is `@daohaus/data`. If you're working on another package inside the monorepo, such as a feature or an app, you can reference it via this namespace, such as `import { Haus } from '@daohaus/dao-data';`

## Building

Run `nx build dao-data` to build the library.

## Usage

The SDK provides a `Haus` class that you'll need to import into your component and instantiate it:

```jsx
// App.tsx

import { Haus } from '@daohaus/dao-data';

const haus = Haus.create(rpcs);
```

Once this is imported you can access the SDK methods that are available. For example, to use the functionality related to user profiles, you can use the following:

```jsx
// App.tsx

const profile = await haus.profile.get(address);
```

You'll want to wrap this in a `try/catch` block to handle any errors that may occur like you would with other asynchronous calls.

## Core Features

We'll be adding more documentation and detail to this section, so keep checking back.

### Profile

The SDK provides a `profile` method that includes functionality related to profiles. This includes interacting with [Ceramic](https://ceramic.network/) to get a user's profile. We have a series of fallbacks in place if a user doesn't have a basic profile set.

### Query

The SDK provides a `query` method that can be used for querying the subgraph for DAO related data such as DAO members, proposals, and more.

## Running Unit Tests

Run `NODE_OPTIONS=--experimental-vm-modules nx run dao-data:test` to execute the unit tests via [Jest](https://jestjs.io).

Be sure to include the `NODE_OPTIONS=--experimental-vm-modules` flag when running the tests or else the tests will throw an error.

## Generating GraphQL Schema and Types

1. When updates are deployed to the Daohaus V3 subgraphs, a new schema should be generated

   run `nx generate-gql-schema dao-data` to create a new `src/subgraph/schema.graphql` file

2. When there is a new schema or new query files are added, new types should be generated

   run `nx generate-gql-types dao-data` to create type fiels for each query file in `src/subgraph/queries`
