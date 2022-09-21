import { Keychain } from '@daohaus/common-utilities';
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

export type SummonArgs = {
  initializationParams: ethers.BytesLike;
  initializationActions: ethers.BytesLike[];
  _saltNonce: ethers.BigNumber;
  overrides?: ethers.Overrides;
};

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
  _saltNonce: ethers.BigNumber;
  overrides?: ethers.Overrides;
};

export type SubmitProposalArgs = {
  proposalData: ethers.BytesLike;
  expiration: ethers.BigNumber;
  baalGas: ethers.BigNumber;
  details: string;
  overrides?: ethers.Overrides;
};

export type ProcessProposalArgs = {
  id: ethers.BigNumber;
  proposalData: ethers.BytesLike;
  overrides?: ethers.Overrides;
};
