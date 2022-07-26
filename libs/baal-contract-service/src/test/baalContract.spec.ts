import { ethers } from 'ethers';
import { BaalContract } from '../index';

describe('baal contract sdk', () => {
  const contractConfig = {
    address: '0x0C5fd8AAdF995e11E5Ac1CD72139Ee4fd72cDeFC',
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
