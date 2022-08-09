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

import BaalContract from './BaalContract';
import BaalSummonerContract from './BaalSummoner';

export interface Contracts {
  baalContract: ReturnType<typeof BaalContract.create>;
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
