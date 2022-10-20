# contract-utilities

This library was generated with [Nx](https://nx.dev).

## Usage

```js
const molochV3 = MolochV3Contract.create({
  address: '0x0somedaoaddress',
  provider: new ethers.providers.JsonRpcProvider('someproviderurl'),
});

molochV3.sponsorProposal('1');
```

## Running unit tests

Run `nx test contract-utilities` to execute the unit tests via [Jest](https://jestjs.io).
