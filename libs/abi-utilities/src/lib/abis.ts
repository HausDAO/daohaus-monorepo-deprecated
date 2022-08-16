import { ABI } from '@daohaus/common-utilities';
import BAAL from '../abi/baal.json';
import BAAL_SUMMONER from '../abi/baalSummoner.json';
import GNOSIS_MULTISEND from '../abi/gnosisMultisend.json';
import GNOSIS_PROXY from '../abi/gnosisProxy.json';
import LOOT from '../abi/loot.json';
import POSTER from '../abi/poster.json';
import SHARES from '../abi/shares.json';
import SUPERFLUID_PROXY from '../abi/superfluidProxy.json';
import TRIBUTE_MINION from '../abi/tributeMinion.json';

type ContractABIKey =
  | 'BAAL'
  | 'BAAL_SUMMONER'
  | 'GNOSIS_MULTISEND'
  | 'GNOSIS_PROXY'
  | 'LOOT'
  | 'POSTER'
  | 'SHARES'
  | 'SUPERFLUID_PROXY'
  | 'TRIBUTE_MINION';

export const LOCAL_ABI: Record<ContractABIKey, ABI> = {
  BAAL,
  BAAL_SUMMONER,
  GNOSIS_MULTISEND,
  GNOSIS_PROXY,
  LOOT,
  POSTER,
  SHARES,
  SUPERFLUID_PROXY,
  TRIBUTE_MINION,
};
