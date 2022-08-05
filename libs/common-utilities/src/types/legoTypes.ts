import { LOCAL_ABI } from '@daohaus/abi-utilities';
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
type MulticallAction = {
  contract: ContractLego;
  method: string;
  args: ValidArgType[];
};

type Multicall = {
  type: 'multicall';
  actions: MulticallAction[];
};
type StaticArg = {
  type: 'static';
  value: ArgType;
};

export type ValidArgType =
  | StringSearch
  | JSONDetailsSearch
  | Multicall
  | StaticArg;

export type TxStates = 'idle' | 'submitting' | 'polling' | 'failed' | 'success';

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
};

export type TXLego = RequireOnlyOne<TXLegoBase, 'args' | 'argCallback'>;

export type StaticContract = {
  contractName: string;
  type: 'static';
  abi: ABI;
  keychain: Keychain;
};
export type LocalContract = {
  contractName: keyof typeof LOCAL_ABI;
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
export type ContractLego = StaticContract | RemoteContract | ProcessedContract;
