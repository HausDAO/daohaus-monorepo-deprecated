import { ethers } from 'ethers';
import { getContractsForChain } from '../contract';
import { Contracts, ContractsAndFactories } from '../contract/types';

describe('baal contract loads', () => {
  let baal: ContractsAndFactories;
  let baalOnlyContracts: Contracts;

  it('should include contracts of the chainId', () => {
    /* prettier-ignore */
    baalOnlyContracts = getContractsForChain('0x5', new ethers.providers.JsonRpcProvider(), true);

    expect(baalOnlyContracts.baalContract).toBeDefined();
    expect(baalOnlyContracts.baalSummonerContract).toBeDefined();
    expect(Object.keys(baalOnlyContracts).length).toBe(2);
  });
  it('should include contracts of the chainId', () => {
    /* prettier-ignore */
    baal = getContractsForChain('0x5', new ethers.providers.JsonRpcProvider()) as ContractsAndFactories;

    expect(baal.baalContract).toBeDefined();
    expect(baal.baalSummonerContract).toBeDefined();
    expect(baal.baalFactory).toBeDefined();
    expect(baal.baalSummonerFactory).toBeDefined();
    expect(baal.lootFactory).toBeDefined();
    expect(baal.sharesFactory).toBeDefined();
    expect(baal.tributeMinionFactory).toBeDefined();
    expect(baal.posterFactory).toBeDefined();
    expect(baal.gnosisMultisendFactory).toBeDefined();
    expect(Object.keys(baal).length).toBe(9);
  });
});
