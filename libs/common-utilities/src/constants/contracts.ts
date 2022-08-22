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

export const CONTRACTS: ContractAddressList = {
  V3_FACTORY: {
    '0x5': '0x9AC9d5c6D2f9728cf5c9B6D80D1cdbD4Cf27F58B',
  },
  LOOT_SINGLETON: {
    '0x5': '0x6da85411875DC35B2f7ab389deBeef1F1430f740',
  },
  SHARES_SINGLETON: {
    '0x5': '0x6dE9C87155CC95415419d9B330c2458adc14A7A1',
  },
  BAAL_SINGLETON: {
    '0x5': '0xD0F58943FBDF29E8947ab6CD5297433dC9cc291b',
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
