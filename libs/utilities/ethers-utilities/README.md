# Common Utilities

Our **Common Utilities** package is a set of helper tools and utilities that are used throughout our libraries and apps. This includes things like our constants, types that are commonly shared across packages, and various utilities and helper functions.

This library was generated with [Nx](https://nx.dev).

## Installation

Once this package is published on `npm` we'll have instructions in how to import and use in your apps. If you're using it from inside the monorepo, you can import directly from the package.

The package name for importing is `@daohaus/common-utilities`. If you're working on another package inside the monorepo, such as a feature or an app, you can reference it via this namespace, such as `import { addKeychain } from '@daohaus/common-utilities';`

## Overview

Future documentation will go more in depth about each part of the common utilities package, but for now, here is an overview of each folder:

### Constants

**Constants** are a set of constants that are used throughout our libraries and apps that we need to frequently use and that we want to ensure are consistent.

`chainData.ts`

This contains constants and helpers related to working with networks. For example, the `VALID_NETWORKS` is a list of the networks that we currently support in our apps.

There are several utility functions related to the network as well, such as `getNetwork`, `isValidNetwork`, and `addKeychain`. These are used throughout our apps and libraries, and we'll be including deeper documentation about them in the future.

`contracts.ts`

Exports contract addresses for contracts that we commonly use throughout our packages.

`endpoints.ts`

Exports the endpoints for the `V3_SUBGRAPH`, `EXPLORERS`, and the `GNOSIS_API`.

`proposals.ts`

This contains our commonly used proposal statuses.

### Types

This folder contains commonly used types such as ones that relate to contracts, keychains, and a React _setter_ pattern.

### Utils

This folder is a collection of utility functions mostly related to data formatting, processing, and encoding.

## Usage

All of the constants, types, and utilities can be imported directly from the package. You don't need to specify that you're importing from `types`, for example.

If you wanted to import the `addKeychain` function, you would do:

```typescript
import { addKeychain } from '@daohaus/common-utilities';
```

Similarly, if you wanted to use the `EXPLORER` constant, you can import the `ENDPOINTS` constant object and then reference the `EXPLORER` constant with `ENDPOINTS.EXPLORER`.
