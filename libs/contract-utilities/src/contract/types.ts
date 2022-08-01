import {
  PosterFactory,
  BaalFactory,
  BaalSummonerFactory,
  LootFactory,
  SharesFactory,
  TributeMinionFactory,
} from '@daohaus/baal-contracts';

export interface ContractAddresses {
  poster: string;
  baal: string;
  baalSummoner: string;
  loot: string;
  shares: string;
  tributeMinion: string;
}

export interface Contracts {
  baalContract: ReturnType<typeof BaalFactory.connect>;
  baalSummonerContract: ReturnType<typeof BaalSummonerFactory.connect>;
  lootContract: ReturnType<typeof LootFactory.connect>;
  sharesContract: ReturnType<typeof SharesFactory.connect>;
  tributeMinionContract: ReturnType<typeof TributeMinionFactory.connect>;
  posterContract: ReturnType<typeof PosterFactory.connect>;
}

export enum ChainId {} // TODO
