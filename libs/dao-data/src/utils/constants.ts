import { KeychainList } from '@daohaus/common-utilities';
import { QueryError } from '..';

export const ENDPOINTS: KeychainList = {
  V3_SUBGRAPH: {
    '0x4': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-rinkeby',
    '0x2a': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-kovan',
  },
};

export const INVALID_NETWORK_ERROR: QueryError = {
  name: 'unsupportedNetworkID',
  message: 'Unsupported Network',
};
