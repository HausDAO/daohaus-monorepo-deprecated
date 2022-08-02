import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { ABI, Keychain } from '@daohaus/common-utilities';
import { FindTxQuery, IFindQueryResult } from '@daohaus/dao-data';
import React, { JSXElementConstructor } from 'react';
import { CoreFieldLookup } from '../components/CoreFieldLookup';
import { ValidateField } from '../utils/rules';

export type FieldValidationType = keyof typeof ValidateField;

export type CoreFields = typeof CoreFieldLookup;

export type LookupType = Record<
  string,
  // React wants me to use JSXElementConstructor<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>;

export type FieldLegoBase<Lookup extends LookupType> = {
  [FieldType in keyof Lookup]: React.ComponentProps<Lookup[FieldType]> & {
    type: FieldType;
    expectType?: FieldValidationType;
  };
}[keyof Lookup];

export type FieldLego<Lookup extends LookupType = CoreFields> =
  FieldLegoBase<Lookup>;

export type FormLego<Lookup extends LookupType = CoreFields> = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  tx?: TXLego;
  fields: FieldLego<Lookup>[];
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

export type LiveTX = TXLego & {
  status: TxStates;
  lifeCycleFns?: {
    onTxHash?: (txHash: string) => void;
    onTxError?: (error: unknown) => void;
    onTxSuccess?: (txHash: string) => void;
    onPollFire?: () => void;
    onPollError?: (error: unknown) => void;
    onPollSuccess?: (result: IFindQueryResult<FindTxQuery> | undefined) => void;
  };
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

const contract: ContractLego = {
  type: 'local',
  keychain: {
    '0x1': '0x134jd93jdskdjfk3903KKdsls3',
  },
  abi: LOCAL_ABI.BAAL,
};
