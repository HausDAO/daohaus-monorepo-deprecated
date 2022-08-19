import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { ContractLego, CONTRACTS } from '@daohaus/common-utilities';

const BaalSummonerContract: ContractLego = {
  contractName: 'BaalSummoner',
  type: 'static',
  abi: LOCAL_ABI.BAAL_SUMMONER,
  targetAddress: CONTRACTS.V3_FACTORY,
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalSummonerContract,
  method: 'summonBaalAndSafe',
};
