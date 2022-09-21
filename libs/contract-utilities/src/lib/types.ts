import { ethers } from 'ethers';
import {
  PosterFactory,
  BaalFactory,
  BaalSummonerFactory,
  LootFactory,
  SharesFactory,
  TributeMinionFactory,
  MultiSendFactory,
} from '@daohaus/baal-contracts';

import MolochV3Contract from './moloch-v3-contract';
import BaalSummonerContract from './moloch-v3-summoner-contract';

export interface Contracts {
  molochV3Contract: ReturnType<typeof MolochV3Contract.create>;
  baalSummonerContract: ReturnType<typeof BaalSummonerContract.create>;
}

export interface ContractsAndFactories extends Contracts {
  baalFactory: ReturnType<typeof BaalFactory.connect>;
  baalSummonerFactory: ReturnType<typeof BaalSummonerFactory.connect>;
  lootFactory: ReturnType<typeof LootFactory.connect> | null;
  sharesFactory: ReturnType<typeof SharesFactory.connect> | null;
  tributeMinionFactory: ReturnType<typeof TributeMinionFactory.connect> | null;
  posterFactory: ReturnType<typeof PosterFactory.connect> | null;
  gnosisMultisendFactory: ReturnType<typeof MultiSendFactory.connect> | null;
}

export type ContractConfig = {
  address: string;
  provider: ethers.providers.Provider | ethers.Signer;
};

export type BaseOverrideArgs = ethers.Overrides;

export type SummonArgs = {
  initializationParams: ethers.BytesLike;
  initializationActions: ethers.BytesLike[];
  _saltNonce: ethers.BigNumberish;
  overrides?: ethers.Overrides;
};

export type SubmitProposalArgs = {
  proposalData: ethers.BytesLike;
  expiration: ethers.BigNumberish;
  baalGas: ethers.BigNumberish;
  details: string;
  overrides?: ethers.Overrides;
};

export type ProposalIdArgs = {
  id: ethers.BigNumberish;
  overrides?: ethers.Overrides;
};

export type ProcessProposalArgs = {
  proposalData: ethers.BytesLike;
  overrides?: ethers.Overrides;
} & ProposalIdArgs;

export type SubmitVoteArgs = {
  approved: boolean;
  overrides?: ethers.Overrides;
} & ProposalIdArgs;

export type RagequitArgs = {
  to: string;
  sharesToBurn: ethers.BigNumberish;
  lootToBurn: ethers.BigNumberish;
  tokens: string[];
  overrides?: ethers.Overrides;
};

export type DelegateArgs = {
  delegatee: string;
  overrides?: ethers.Overrides;
};
