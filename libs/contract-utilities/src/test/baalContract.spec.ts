import { ethers } from 'ethers';
import { getContractsForChainOrThrow } from '../contract';
import { Contracts } from '../contract/types';

describe('baal contract loads', () => {
  let baal: Contracts;

  beforeAll(() => {
    baal = getContractsForChainOrThrow(
      0x5,
      new ethers.providers.JsonRpcProvider()
    );
  });

  it('should include contracts of the chainId', () => {
    expect(baal.baalContract).toBeDefined();
    expect(baal.baalSummonerContract).toBeDefined();
    expect(baal.lootContract).toBeDefined();
    expect(baal.sharesContract).toBeDefined();
    expect(baal.tributeMinionContract).toBeDefined();
    expect(baal.posterContract).toBeDefined();
    expect(baal.gnosisMultisendContract).toBeDefined();
  });
});
