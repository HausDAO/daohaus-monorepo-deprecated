import { ethers } from 'ethers';
import { getContractAddressesForChain } from '../src/lib/contract-meta';
import MolochV3Contract from '../src/lib/moloch-v3-contract';

describe('baal contract loads', () => {
  let molochV3: MolochV3Contract;

  beforeAll(async () => {
    const address = getContractAddressesForChain('V3_FACTORY', '0x5');
    const provider = new ethers.providers.JsonRpcProvider(
      `https://12345.goerli.rpc.rivet.cloud`
    );
    if (address) {
      molochV3 = MolochV3Contract.create({
        address,
        provider,
      });
    }
  });

  it('should exist', () => {
    expect(molochV3).toBeDefined();
  });
});
