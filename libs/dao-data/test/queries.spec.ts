import { Haus } from '../src/index';
import { statusFilter } from '../src/utils';

describe('haus', () => {
  const rpcConfig = {
    '0x5': `https://${process.env['RIVET_KEY']}.rinkeby.rpc.rivet.cloud`,
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });

  it('can fetch a list of daos', async () => {
    const networkId = '0x5';

    const res = await haus.query.listDaos({
      networkId,
    });

    console.log('res', res?.data?.daos);

    expect(res.error).toBeUndefined();
    expect(res?.data?.daos.length).toBe(1);
  });
});
