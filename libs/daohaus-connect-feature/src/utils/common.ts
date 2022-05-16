export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const TEMPORARY_RPC = {
  '0x1': `https://${import.meta.env.NX_RIVET_KEY}.eth.rpc.rivet.cloud/`,
  '0x4': `https://${import.meta.env.NX_RIVET_KEY}.rinkeby.rpc.rivet.cloud/`,
  '0x2a': `https://kovan.infura.io/v3/${import.meta.env.NX_INFURA_PROJECT_ID}`,
  '0x64': 'https://rpc.gnosischain.com/',
  '0xa': 'https://mainnet.optimism.io',
  '0x89': 'https://polygon-rpc.com/',
  '0xa4b1': 'https://arb1.arbitrum.io/rpc',
  '0xa4ec': 'https://forno.celo.org',
};
