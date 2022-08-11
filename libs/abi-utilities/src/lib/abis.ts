import BAAL from '../abi/baal.json';
import BAAL_SUMMONER from '../abi/baalSummoner.json';
import GNOSIS_MULTISEND from '../abi/gnosisMultisend.json';
import LOOT from '../abi/loot.json';
import POSTER from '../abi/poster.json';
import SHARES from '../abi/shares.json';
import TRIBUTE_MINION from '../abi/tributeMinion.json';
interface JsonFragmentType {
  readonly name?: string;
  readonly indexed?: boolean;
  readonly type?: string;
  readonly internalType?: string;
  readonly components?: ReadonlyArray<JsonFragmentType>;
}

interface JsonFragment {
  readonly name?: string;
  readonly type?: string;

  readonly anonymous?: boolean;

  readonly payable?: boolean;
  readonly constant?: boolean;
  readonly stateMutability?: string;

  readonly inputs?: ReadonlyArray<JsonFragmentType>;
  readonly outputs?: ReadonlyArray<JsonFragmentType>;

  readonly gas?: string;
}

type ContractABIKey =
  | 'BAAL'
  | 'BAAL_SUMMONER'
  | 'GNOSIS_MULTISEND'
  | 'LOOT'
  | 'POSTER'
  | 'SHARES'
  | 'TRIBUTE_MINION';

export const LOCAL_ABI: Record<
  ContractABIKey,
  (JsonFragmentType | JsonFragment)[]
> = {
  BAAL,
  BAAL_SUMMONER,
  GNOSIS_MULTISEND,
  LOOT,
  POSTER,
  SHARES,
  TRIBUTE_MINION,
};
