import { JSXElementConstructor } from 'react';
import { ABI, ArgType } from './contract';
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

type SearchArgs = {
  type: 'searchArgs';
  args: string[];
};
type CallbackArgs = {
  type: 'callbackArgs';
  callbackName: string;
};
type StaticArgs = ArgType[];
export type ArgAggrageteType = SearchArgs | CallbackArgs | StaticArgs;

export type TXLego = {
  id: string;
  contract: ContractLego;
  method: string;
  custonPoll?: string;
  txSuccessMessage?: string;
  finalSuccessMessage?: string;
  errorMessage?: string;
  args: ArgAggrageteType;
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

export type ContractLego = LocalContract | RemoteContract;
