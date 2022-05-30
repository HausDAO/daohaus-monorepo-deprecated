import { Haus } from '../src/index';

describe('haus', () => {
  const rpcConfig = {
    '0x5': 'https://<somekey>.rinkeby.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });

  it('can fetch all token balances for a dao', async () => {
    const networkId = '0x5';
    const safeAddress = '0x1149a4bfd9c23f3c49ff786ef55f869c24009d3b';

    const res = await haus.query.listTokenBalances({
      networkId,
      safeAddress,
    });

    expect(res?.data?.tokenBalances.length).toBeGreaterThan(0);
    expect(res?.data?.fiatTotal).toBe(0);
  });
});
