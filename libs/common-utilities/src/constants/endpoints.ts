import { KeychainList } from '..';

export const ENDPOINTS: KeychainList = {
  V3_SUBGRAPH: {
    '0x4': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-rinkeby',
    '0x2a': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-kovan',
  },
  // RPC: {
  // '0x1': `https://${process.env['NX_RIVET_KEY']}.eth.rpc.rivet.cloud/`,
  // '0x4': `https://${process.env['NX_RIVET_KEY']}.rinkeby.rpc.rivet.cloud/`,
  // '0x2a': `https://kovan.infura.io/v3/${process.env['NX_INFURA_PROJECT_ID']}`,
  // '0x64': 'https://rpc.gnosischain.com/',
  // },
  EXPLORER: {
    '0x1': 'https://etherscan.io',
    '0x4': 'https://rinkeby.etherscan.io',
    '0x2a': 'https://kovan.etherscan.io',
    '0x64': 'https://blockscout.com/poa/xdai',
    '0xa': 'https://optimistic.etherscan.io',
    '0x89': 'https://polygonscan.com',
    '0xa4b1': 'https://arbiscan.io/',
    '0xa4ec': 'https://explorer.celo.org',
  },
  GNOSIS_API: {
    '0x1': 'https://safe-transaction.gnosis.io/api/v1',
    '0x4': 'https://safe-transaction.rinkeby.gnosis.io/api/v1',
    '0x2a': 'https://safe-transaction.kovan.gnosis.io/api/v1',
    '0x64': 'https://safe-transaction.xdai.gnosis.io/api/v1',
  },
};
// https://safe-transaction.gnosis.io/api/v1/safes/0x648DfEBbaf3638cDa047141dbF4AF3006e880f49/balances/usd/?trusted=false&exclude_spam=false
