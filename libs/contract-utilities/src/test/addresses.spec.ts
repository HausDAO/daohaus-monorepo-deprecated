import { getContractAddressesForChain } from '../contract';

describe('baal contract loads', () => {
  let contracts: any;

  beforeAll(() => {
    /* prettier-ignore */
    contracts = {
      posterAddress: getContractAddressesForChain('POSTER', '0x5'),
      gnosisMultisendAddress: getContractAddressesForChain('GNOSIS_MULTISEND','0x5'),
      baalSummonerAddress: getContractAddressesForChain('V3_FACTORY', '0x5'),
      baalAddress: getContractAddressesForChain('BAAL_SINGLETON', '0x5'),
      lootAddress: getContractAddressesForChain('LOOT_SINGLETON', '0x5'),
      sharesAddress: getContractAddressesForChain('SHARES_SINGLETON', '0x5'),
      tributeMinionAddress: getContractAddressesForChain('TRIBUTE_MINION','0x5'),
    }
  });

  it('should include contracts of the chainId', () => {
    expect(contracts.posterAddress).toBeDefined();
    expect(contracts.gnosisMultisendAddress).toBeDefined();
    expect(contracts.baalSummonerAddress).toBeDefined();
    expect(contracts.baalAddress).toBeDefined();
    expect(contracts.lootAddress).toBeDefined();
    expect(contracts.sharesAddress).toBeDefined();
    expect(contracts.tributeMinionAddress).toBeDefined();
  });
});
