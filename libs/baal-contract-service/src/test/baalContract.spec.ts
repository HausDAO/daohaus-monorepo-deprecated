import { ethers } from 'ethers';
import { BaalContract } from '../index';

describe('baal contract sdk', () => {
  const contractConfig = {
    address: '0x69fe2468a844ae30dfd3e49e9790347491999a03',
    chainId: 0x5,
    provider: new ethers.providers.JsonRpcProvider(),
  };
  let baal: BaalContract;

  beforeAll(() => {
    baal = BaalContract.create(contractConfig);
  });
  it('should init', () => {
    expect(baal.baal.functions).toBeDefined();
  });
});
