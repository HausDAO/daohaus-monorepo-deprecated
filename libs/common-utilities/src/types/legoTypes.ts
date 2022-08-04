import { JSXElementConstructor } from 'react';
import { ValidateField } from '../utils';
import { ABI, ArgType } from './contract';
import { Keychain } from './keychains';

export type LookupType = Record<
  string,
  // React wants me to use JSXElementConstructor<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>;

export type FieldValidationType = keyof typeof ValidateField;

export type FieldLegoBase<Lookup extends LookupType> = {
  [FieldType in keyof Lookup]: React.ComponentProps<Lookup[FieldType]> & {
    type: FieldType;
    expectType?: FieldValidationType;
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

export type StringSearch = `.${string}`;

type JSONSearchParam = Record<string, StringSearch>;
export type JSONDetailsSearch = {
  type: 'JSONDetails';
  args: JSONSearchParam[];
};
type MulticallAction = {
  contract: ContractLego;
  method: string;
  args: ArgAggrageteType;
};
type SearchArgType = MulticallAction | JSONDetailsSearch | StringSearch;

export type MulticallDataSearch = {
  type: 'MulticallData';
  args: MulticallAction[];
};

type SearchArgs = {
  type: 'searchArgs';
  args: SearchArgType[];
};
type CallbackArgs = {
  type: 'callbackArgs';
  callbackName: string;
};
type StaticArgs = ArgType[];
export type ArgAggrageteType = SearchArgs | CallbackArgs | StaticArgs;
export type TxStates = 'idle' | 'submitting' | 'polling' | 'failed' | 'success';

export type TXLego = {
  id: string;
  contract: ContractLego;
  method: string;
  custonPoll?: string;
  txSuccessMessage?: string;
  finalSuccessMessage?: string;
  errorMessage?: string;
  status?: TxStates;
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
