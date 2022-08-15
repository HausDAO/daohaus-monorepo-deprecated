import { getContractAddressesForChain } from '../contract';

describe('baal contract loads', () => {
  let posterAddress: string | null;
  let gnosisMultisendAddress: string | null;
  let baalSummonerAddress: string | null;
  let baalAddress: string | null;
  let lootAddress: string | null;
  let sharesAddress: string | null;
  let tributeMinionAddress: string | null;

  beforeAll(() => {
    posterAddress = getContractAddressesForChain('V3_FACTORY', '0x5');
    gnosisMultisendAddress = getContractAddressesForChain(
      'LOOT_SINGLETON',
      '0x5'
    );
    baalSummonerAddress = getContractAddressesForChain(
      'SHARES_SINGLETON',
      '0x5'
    );
    baalAddress = getContractAddressesForChain('BAAL_SINGLETON', '0x5');
    lootAddress = getContractAddressesForChain('GNOSIS_MULTISEND', '0x5');
    sharesAddress = getContractAddressesForChain('TRIBUTE_MINION', '0x5');
    tributeMinionAddress = getContractAddressesForChain('POSTER', '0x5');
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
