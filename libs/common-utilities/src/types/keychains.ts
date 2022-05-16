import { VALID_NETWORKS } from '../constants';

export type ValidNetwork = keyof typeof VALID_NETWORKS;
export type Keychain<T = string> = { [key in ValidNetwork]?: T };
export type KeychainList = Record<string, Keychain>;
