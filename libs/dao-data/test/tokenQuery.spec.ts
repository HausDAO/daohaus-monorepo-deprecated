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
    const safeAddress = '0x7d231D960651D4405559cc4FC66EFb8aAA5c19F3';

    const res = await haus.query.listTokenBalances({
      networkId,
      safeAddress,
    });

    expect(res?.data?.tokenBalances.length).toBeGreaterThan(0);
    expect(res?.data?.fiatTotal).toBe(0);
  });
});
