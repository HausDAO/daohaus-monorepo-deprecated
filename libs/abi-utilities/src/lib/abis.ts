import BAAL from '../abi/Baal.json';
import BAAL_SUMMONER from '../abi/BaalSummoner.json';
import GNOSIS_MULTISEND from '../abi/GnosisMultisend.json';
import LOOT from '../abi/Loot.json';
import POSTER from '../abi/Poster.json';
import SHARES from '../abi/Shares.json';
import TRIBUTE_MINION from '../abi/TributeMinion.json';

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

export const LOCAL_ABI: Record<string, (JsonFragmentType | JsonFragment)[]> = {
  BAAL,
  BAAL_SUMMONER,
  GNOSIS_MULTISEND,
  LOOT,
  POSTER,
  SHARES,
  TRIBUTE_MINION,
};
