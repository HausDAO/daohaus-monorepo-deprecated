import { getContractAddressesForChainOrThrow } from '../contract';

describe('baal contract loads', () => {
  let posterAddress: string;
  let gnosisMultisendAddress: string;
  let baalSummonerAddress: string;
  let baalAddress: string;
  let lootAddress: string;
  let sharesAddress: string;
  let tributeMinionAddress: string;

  beforeAll(() => {
    posterAddress = getContractAddressesForChainOrThrow('V3_FACTORY', '0x5');
    gnosisMultisendAddress = getContractAddressesForChainOrThrow(
      'LOOT_SINGLETON',
      '0x5'
    );
    baalSummonerAddress = getContractAddressesForChainOrThrow(
      'SHARES_SINGLETON',
      '0x5'
    );
    baalAddress = getContractAddressesForChainOrThrow('BAAL_SINGLETON', '0x5');
    lootAddress = getContractAddressesForChainOrThrow(
      'GNOSIS_MULTISEND',
      '0x5'
    );
    sharesAddress = getContractAddressesForChainOrThrow(
      'TRIBUTE_MINION',
      '0x5'
    );
    tributeMinionAddress = getContractAddressesForChainOrThrow('POSTER', '0x5');
  });

  it('should include contracts of the chainId', () => {
    expect(posterAddress).toBeDefined();
    expect(gnosisMultisendAddress).toBeDefined();
    expect(baalSummonerAddress).toBeDefined();
    expect(baalAddress).toBeDefined();
    expect(lootAddress).toBeDefined();
    expect(sharesAddress).toBeDefined();
    expect(tributeMinionAddress).toBeDefined();
  });
});
