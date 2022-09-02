# DAOhaus v3 Subgraph

The v3 subgraph currently supports goerli. It's deployed here: https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli/graphql

## Local Development

TBD

### Subgraph yaml Generation

`nx run v3-subgraph:generate-config --network=goerli`
`nx run v3-subgraph:generate-config --network=xdai`

Supported Networks:

- goerli

### Generate Subgraph Code

To generate subgraph code, run the following command:

`nx run v3-subgraph:generate-code`

## Deployment


`nx run v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-goerli`
`nx run v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-gnosis`

_These require installing the graph cli locally_
`npm install -g @graphprotocol/graph-cli`

Supported names:

- `hausdao/daohaus-v3-goerli`
- `hausdao/daohaus-v3-gnosis`
