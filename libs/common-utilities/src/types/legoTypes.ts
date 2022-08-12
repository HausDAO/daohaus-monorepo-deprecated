import { JSXElementConstructor } from 'react';
import { ValidateField } from '../utils';
import { ABI, ArgType } from './contract';
import { RequireOnlyOne } from './general';
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

type JSONSearchParam = Record<string, ValidArgType>;
export type JSONDetailsSearch = {
  type: 'JSONDetails';
  args: JSONSearchParam[];
};
export type MulticallAction = {
  contract: ContractLego;
  method: string;
  args: ValidArgType[];
};
export type MulticallArg = {
  type: 'multicall';
  actions: MulticallAction[];
};
export type EstmimateGas = {
  type: 'estimateGas';
  actions: MulticallAction[];
};

type ProposalExpiry = {
  type: 'proposalExpiry';
  search?: StringSearch;
  fallback: number;
};

type StaticArg = {
  type: 'static';
  value: ArgType;
};

export type ValidArgType =
  | StringSearch
  | JSONDetailsSearch
  | EstmimateGas
  | MulticallArg
  | ProposalExpiry
  | StaticArg;

export type TxStates =
  | 'idle'
  | 'submitting'
  | 'polling'
  | 'pollFailed'
  | 'failed'
  | 'success';

export type TXLegoBase = {
  id: string;
  contract: ContractLego;
  method: string;
  custonPoll?: string;
  txSuccessMessage?: string;
  finalSuccessMessage?: string;
  errorMessage?: string;
  status?: TxStates;
  args?: ValidArgType[];
  argCallback?: string;
  staticArgs: ArgType[];
};

export type TXLego = RequireOnlyOne<
  TXLegoBase,
  'args' | 'argCallback' | 'staticArgs'
>;

export type StaticContract = {
  contractName: string;
  type: 'static';
  abi: ABI;
  keychain: Keychain;
};
export type LocalContract = {
  contractName: string;
  type: 'local';
  keychain: Keychain;
};
export type RemoteContract = {
  contractName: string;
  type: 'remote';
  keychain: Keychain;
};
export type ProcessedContract = {
  type: 'processed';
  contractName: string;
  abi: ABI;
  address: string;
};
export type ContractLego =
  | StaticContract
  | RemoteContract
  | LocalContract
  | ProcessedContract;
