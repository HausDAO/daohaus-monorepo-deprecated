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

const haus = Haus.create();
```

Once this is imported you can access the SDK methods that are available. For example, to use the functionality related to user profiles, you can use the following:

```jsx
// App.tsx

const profile = await haus.profile.get(address);

const profileDaoMemberships = await haus.profile.listDaosByMember({
  networkId: ['0x5'],
});
```

You'll want to wrap this in a `try/catch` block to handle any errors that may occur like you would with other asynchronous calls.

## Core Features

We'll be adding more documentation and detail to this section, so keep checking back.

### Profile

The SDK provides a `profile` method that includes functionality related to profiles. This includes interacting with [Ceramic](https://ceramic.network/) to get a user's profile. We have a series of fallbacks in place if a user doesn't have a basic profile set.

To get ens names with the profile include a mainnet rpc endpoint in the init options:

```js
const haus = Haus.create({ providers: { '0x0': 'https://somerpc.com' } });

const profile = await haus.profile.get('0x0');
// console.log(profile)
// {
//   address: '0x0',
//   ens: 'woodrowwilson.eth',
//   image: 'ifshash',
//   name: 'woody',
//   description: '28th president of the united states of america',
//   emoji: "🦅"
// }

const profileDaoMemberships = await haus.profile.listDaosByMember({
  memberAddress: '0x0',
  networkId: ['0x5'],
});
// console.log(profileDaoMemberships)
// [{
//   address: '0x0somedaocontractaddress',
//   name: 'potusDAO',
//   ... more dao data
// }]
```

### Query

The SDK provides a `query` method that can be used for querying the subgraph for DAO related data such as DAO members, proposals, and more.

#### List queries

```js
const daos = await haus.query.listDaos({
  networkId: '0x5',
});

const proposals = await haus.query.listProposals({
  networkId: '0x5',
  filter: { dao: '0x0' },
});

const members = await haus.query.listMembers({
  networkId: '0x5',
  filter: { dao: '0x0' },
  ordering: {
    orderBy: 'shares'
    orderDirection: 'asc'
  },
  pagination: {
    pageSize: 4,
    offset: 0,
  }
});
```

#### Find queries

```js
const dao = await haus.query.findDao({
  networkId: '0x5',
  dao: '0x0',
  includeTokens: true,
});

const proposal = await query.findProposal({
  networkId: '0x5',
  dao: '0x0',
  proposalId: '3',
});

const member = await query.findMember({
  networkId: '0x5',
  dao: '0x0',
  memberAddress: '0x123',
});
```

#### Optional Query Parameters

**filters**

Provide any query the graph supports on fields within the entity you are querying.

example:

```js
{
  createdAt_gte: '1656693140'
}

{
  createdAt_lt: '1656693140',
  totalShares_gt: '10000000000000000000'
}
```

[The Graph Docs](https://thegraph.com/docs/en/developer/graphql-api/#all-filters)

[Subgraph Schema](https://github.com/HausDAO/daohaus-monorepo/blob/develop/apps/v3-subgraph/schema.graphql)

**ordering**

Provide a field to order by and the order direction (asc or desc).

example:

```js
{
  orderBy: 'createdAt',
  orderDirection: 'asc'
}

{
  totalShares: '1656693140',
  orderDirection: 'desc'
}
```

**pagination**

Provide options for pagination. The SDK supports offest and cursor pagination. Offset pagination will return query options for fetching the next page and previous page. Cursor pagination is better for larger data sets, defaults sort to the ID field and provides query options for fetching the next page.

```js
{
  pageSize: '20',
  offset: '0'
}

{
  pageSize: '2000',
  lastId: '0'
}

## Running Unit Tests

Run `NODE_OPTIONS=--experimental-vm-modules nx run dao-data:test` to execute the unit tests via [Jest](https://jestjs.io).

Be sure to include the `NODE_OPTIONS=--experimental-vm-modules` flag when running the tests or else the tests will throw an error.

## Generating GraphQL Schema and Types

1. When updates are deployed to the Daohaus V3 subgraphs, a new schema should be generated

   run `nx generate-gql-schema dao-data` to create a new `src/subgraph/schema.graphql` file

2. When there is a new schema or new query files are added, new types should be generated

   run `nx generate-gql-types dao-data` to create type files for each query file in `src/subgraph/queries`
```
