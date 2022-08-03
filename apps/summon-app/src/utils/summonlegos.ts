import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { ContractLego, CONTRACTS, TXLego } from '@daohaus/common-utilities';

const BaalSummonerContract: ContractLego = {
  contractName: 'BaalSummoner',
  type: 'local',
  abi: LOCAL_ABI.BAAL_SUMMONER,
  keychain: CONTRACTS.V3_FACTORY,
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalSummonerContract,
  method: 'summonBaalAndSafe',
};
