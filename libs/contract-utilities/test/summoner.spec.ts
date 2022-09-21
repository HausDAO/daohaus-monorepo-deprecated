import { ethers } from 'ethers';
import { MolochV3SummonerContract } from '../src/index';
import { getContractAddressesForChain } from '../src/lib/contract-meta';

describe('baal contract loads', () => {
  // eslint-disable-next-line
  let summoner: MolochV3SummonerContract;

  beforeAll(async () => {
    const address = getContractAddressesForChain('V3_FACTORY', '0x5');
    const provider = new ethers.providers.JsonRpcProvider(
      `https://12345.goerli.rpc.rivet.cloud`
    );
    if (address) {
      summoner = MolochV3SummonerContract.create({
        address,
        provider,
      });
    }
  });

  it('should exist', () => {
    expect(summoner).toBeDefined();
  });
});
