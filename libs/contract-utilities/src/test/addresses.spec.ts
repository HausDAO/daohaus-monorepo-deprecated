import { getContractAddressesForChainOrThrow } from '../contract/addresses';
import { ContractAddresses } from '../contract/types';

describe('baal contract loads', () => {
  let addresses: ContractAddresses;

  beforeAll(() => {
    addresses = getContractAddressesForChainOrThrow('0x5');
  });

  it('should include contracts of the chainId', () => {
    expect(addresses.poster).toBeDefined();
    expect(addresses.gnosisMultisend).toBeDefined();
    expect(addresses.baalSummoner).toBeDefined();
    expect(addresses.baal).toBeDefined();
    expect(addresses.loot).toBeDefined();
    expect(addresses.shares).toBeDefined();
    expect(addresses.tributeMinion).toBeDefined();
  });
});
