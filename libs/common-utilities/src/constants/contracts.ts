import { KeychainList, ValidNetwork } from '..';

export type ContractKey =
  | 'V3_FACTORY'
  | 'LOOT_SINGLETON'
  | 'SHARES_SINGLETON'
  | 'BAAL_SINGLETON'
  | 'GNOSIS_MULTISEND'
  | 'TRIBUTE_MINION'
  | 'POSTER';

export type AddressKeyChain = { [key in ValidNetwork]?: string };
// export type ContractAddressList = Record<ContractKey, KeychainList>;
export type ContractAddressList = Record<ContractKey, AddressKeyChain>;

export const CONTRACTS: ContractAddressList = {
  V3_FACTORY: {
    '0x5': '0x0C5fd8AAdF995e11E5Ac1CD72139Ee4fd72cDeFC',
  },
  LOOT_SINGLETON: {
    '0x5': '0x0De84DCAc3B2d52581120059ee9723FDDecCB044',
  },
  SHARES_SINGLETON: {
    '0x5': '0x3109AeD0fD9777cEFb24dBa5eb5030987bd9E3F3',
  },
  BAAL_SINGLETON: {
    '0x5': '0x69b442eb55714A0B144134AED015517394Ed1871',
  },
  GNOSIS_MULTISEND: {
    '0x5': '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
  },
  TRIBUTE_MINION: {
    '0x5': '0x9C6f6e6E461FB1dB9761c960900A0Ae05B9786A7',
  },
  POSTER: {
    '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
  },
};

export const SHAMAN_PERMISSIONS = {
  0: {
    id: 0,
    displayName: '0 - No permission',
  },
  1: {
    id: 1,
    displayName: '1 - Admin only',
  },
  2: {
    id: 2,
    displayName: '2 - Manager only',
  },
  3: {
    id: 3,
    displayName: '3 - Admin and manager',
  },
  4: {
    id: 4,
    displayName: '4 - Governance only',
  },
  5: {
    id: 5,
    displayName: '5 - Admin and governance',
  },
  6: {
    id: 6,
    displayName: '6 - Manager and governance',
  },
  7: {
    id: 7,
    displayName: '7 - Admin, manager and governance',
  },
};
