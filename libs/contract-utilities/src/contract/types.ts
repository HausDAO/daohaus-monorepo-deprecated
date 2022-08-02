import {
  PosterFactory,
  BaalFactory,
  BaalSummonerFactory,
  LootFactory,
  SharesFactory,
  TributeMinionFactory,
  MultiSendFactory,
} from '@daohaus/baal-contracts';

export interface Contracts {
  baalContract: ReturnType<typeof BaalFactory.connect>;
  baalSummonerContract: ReturnType<typeof BaalSummonerFactory.connect>;
  lootContract: ReturnType<typeof LootFactory.connect>;
  sharesContract: ReturnType<typeof SharesFactory.connect>;
  tributeMinionContract: ReturnType<typeof TributeMinionFactory.connect>;
  posterContract: ReturnType<typeof PosterFactory.connect>;
  gnosisMultisendContract: ReturnType<typeof MultiSendFactory.connect>;
}
