# DAOhaus v3 Subgraph

The v3 subgraph currently supports goerli. It's deployed here: https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli/graphql

## Local Development

TBD

### Subgraph yaml Generation

`nx run v3-subgraph:generate-config --network=goerli`
`nx run v3-subgraph:generate-config --network=xdai`
`nx run v3-subgraph:generate-config --network=mainnet`

Supported Networks:

- goerli
- gnosis
- mainnet

### Generate Subgraph Code

To generate subgraph code, run the following command:

`nx run v3-subgraph:generate-code`

## Deployment

`nx run v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-goerli --network=goerli`
`nx run v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-gnosis --network=xdai`

### mainnet deployment to studio

`nx run v3-subgraph:graph-deploy-studio --name=daohaus-v3 --network=mainnet`

_These require installing the graph cli locally and auth tokens for deployment to the hosted service or studio subgraphs_
`npm install -g @graphprotocol/graph-cli`

Supported names:

- `hausdao/daohaus-v3-goerli`
- `hausdao/daohaus-v3-gnosis`
- `daohaus-v3`
