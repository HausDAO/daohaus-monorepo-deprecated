import { ABI, Keychain, ValidNetwork } from '@daohaus/common-utilities';
import { ethers } from 'ethers';

export type ContractConfig = {
  address: string;
  provider: ethers.providers.Provider | ethers.Signer;
};

export type ContractNetworkConfig = {
  networkId: keyof Keychain;
  provider: ethers.providers.Provider | ethers.Signer;
};

export type BaseOverrideArgs = ethers.Overrides;

type daoTokenConfigArgs = {
  to: string[];
  amount: ethers.BigNumber[];
};

export type SummonMolochV3Args = {
  sharesTokenName: string;
  sharesTokenSymbol: string;
  safeAddress?: string;
  tokenConfig: {
    pauseShares: boolean;
    pauseLoot: boolean;
  };
  governanceConfig: {
    voting: ethers.BigNumber;
    grace: ethers.BigNumber;
    newOffering: ethers.BigNumber;
    quorum: ethers.BigNumber;
    sponsor: ethers.BigNumber;
    minRetention: ethers.BigNumber;
  };
  shamanConfig: {
    shamans: string[];
    permissions: ethers.BigNumber[];
  };
  sharesConfig: daoTokenConfigArgs;
  lootConfig: daoTokenConfigArgs;
  daoName: string;
  overrides?: ethers.Overrides;
};

type ProposalActionParams = {
  abi: ABI;
  fnName: string;
  functionArgs: ReadonlyArray<unknown>;
  to: string;
  value: ethers.BigNumber;
  operation: number;
};

export type SubmitProposalArgs = {
  proposalActions: ProposalActionParams[];
  expiration: ethers.BigNumber;
  baalGas?: ethers.BigNumber;
  networkId: ValidNetwork;
  details: string;
  overrides?: ethers.Overrides;
};

export type ProcessProposalArgs = {
  id: ethers.BigNumber;
  proposalData: ethers.BytesLike;
  overrides?: ethers.Overrides;
};
