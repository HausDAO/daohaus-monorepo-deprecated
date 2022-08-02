import { JSXElementConstructor } from 'react';
import { ABI } from './contract';
import { Keychain } from './keychains';

export type LookupType = Record<
  string,
  // React wants me to use JSXElementConstructor<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>;
export type FieldLegoBase<Lookup extends LookupType> = {
  [FieldType in keyof Lookup]: React.ComponentProps<Lookup[FieldType]> & {
    type: FieldType;
  };
}[keyof Lookup];

export type FormLegoBase<Lookup extends LookupType = LookupType> = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  tx?: TXLego;
  fields: FieldLegoBase<Lookup>[];
  requiredFields?: Record<string, boolean>;
  log?: boolean;
  devtool?: boolean;
  submitButtonText?: string;
};

export type RequiredFields = Record<string, boolean>;

export type TXLego = {
  id: string;
  contract: ContractLego;
  method: string;
  gatherArgs?: string[];
  argsFromCallback?: string;
  localArgs?: [];
};

export type LocalContract = {
  contractName: string;
  type: 'local';
  abi: ABI;
  keychain: Keychain;
};

export type RemoteContract = {
  contractName: string;
  type: 'remote';
  keychain: Keychain;
};

type ContractLego = LocalContract | RemoteContract;
