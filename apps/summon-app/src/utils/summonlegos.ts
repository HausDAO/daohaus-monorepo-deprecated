import { BAAL_SUMMONER_ABI } from '@daohaus/contract-utilities';
import { ContractLego, CONTRACTS } from '@daohaus/common-utilities';

const BaalSummonerContract: ContractLego = {
  contractName: 'BaalSummoner',
  type: 'static',
  abi: BAAL_SUMMONER_ABI,
  targetAddress: CONTRACTS.V3_FACTORY,
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalSummonerContract,
  method: 'summonBaalAndSafe',
};
