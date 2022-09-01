import { ValidNetwork } from '..';

export type ContractKey =
  | 'V3_FACTORY'
  | 'LOOT_SINGLETON'
  | 'SHARES_SINGLETON'
  | 'BAAL_SINGLETON'
  | 'GNOSIS_MULTISEND'
  | 'TRIBUTE_MINION'
  | 'POSTER';

export type AddressKeyChain = { [key in ValidNetwork]?: string };
export type ContractAddressList = Record<ContractKey, AddressKeyChain>;

// https://github.com/HausDAO/Baal#addresses-beta-factories-and-templates
export const CONTRACTS: ContractAddressList = {
  V3_FACTORY: {
    '0x5': '0xEd6AA9879Ed6ba07411C3224F748Dc65D3f8e685',
    '0x64': '0x3Bd3fDf6db732F8548638Cd35B98d624c77FB351',
  },
  LOOT_SINGLETON: {
    '0x5': '0xd867ACaaDB7B8930EcA709c470B872185698F0EA',
    '0x64': '0x39bDc48E7b15C63FE54779E93b2ce46555A37609',
  },
  SHARES_SINGLETON: {
    '0x5': '0x25D6d13fD0a8071E1AA0f4b8978c706e715fDd3A',
    '0x64': '0x678f62F2d9dE2e196B79ca853f811E6D0A47460B',
  },
  BAAL_SINGLETON: {
    '0x5': '0xB70A2cd3f672cB06e577378578a7AcbF1b68Df56',
    '0x64': '0xDb3e9Ded9843358fbbe758c4e73cCfEb9061d4Ed',
  },
  GNOSIS_MULTISEND: {
    '0x5': '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
    '0x64': '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
  },
  TRIBUTE_MINION: {
    '0x5': '0x9C6f6e6E461FB1dB9761c960900A0Ae05B9786A7',
    '0x64': '0x9391b6A7c55832a6802484dE054d81496D56545A',
  },
  POSTER: {
    '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
    '0x64': '0x000000000000cd17345801aa8147b8d3950260ff',
  },
};

export const SHAMAN_PERMISSIONS = [
  {
    id: '0',
    displayName: '0 - No permission',
  },
  {
    id: '1',
    displayName: '1 - Admin only',
  },
  {
    id: '2',
    displayName: '2 - Manager only',
  },
  {
    id: '3',
    displayName: '3 - Admin and manager',
  },
  {
    id: '4',
    displayName: '4 - Governance only',
  },
  {
    id: '5',
    displayName: '5 - Admin and governance',
  },
  {
    id: '6',
    displayName: '6 - Manager and governance',
  },
  {
    id: '7',
    displayName: '7 - Admin, manager and governance',
  },
];
