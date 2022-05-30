import { KeychainList } from '..';

export const ENDPOINTS: KeychainList = {
  V3_SUBGRAPH: {
    '0x5': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli',
  },
  // RPC: {
  // '0x1': `https://${process.env['NX_RIVET_KEY']}.eth.rpc.rivet.cloud/`,
  // '0x5': `https://${process.env['NX_RIVET_KEY']}.goerli.rpc.rivet.cloud/`,
  // '0x64': 'https://rpc.gnosischain.com/',
  // },
  EXPLORER: {
    '0x1': 'https://etherscan.io',
    '0x5': 'https://goerli.etherscan.io',
    '0x64': 'https://blockscout.com/poa/xdai',
    '0xa': 'https://optimistic.etherscan.io',
    '0x89': 'https://polygonscan.com',
    '0xa4b1': 'https://arbiscan.io/',
    '0xa4ec': 'https://explorer.celo.org',
  },
  GNOSIS_API: {
    '0x1': 'https://safe-transaction.gnosis.io/api/v1',
    '0x5': 'https://safe-transaction.goerli.gnosis.io/api/v1',
    '0x64': 'https://safe-transaction.xdai.gnosis.io/api/v1',
  },
};
