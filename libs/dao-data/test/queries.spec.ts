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

  it('can fetch a list of daos - offset', async () => {
    const networkId = '0x5';
    const dao = '0x3ebd5cf78cb8e100b88f96adbd836bb1ae9a05ca';

    const res = await haus.query.listDaos({
      networkId,
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.daos.length).toBe(1);
  });

  it('can fetch a list of daos - cursor', async () => {
    const networkId = '0x5';

    const res = await haus.query.listDaos({
      networkId,
      paging: {
        pageSize: 1,
        lastId: '0',
      },
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.daos.length).toBe(1);
  });
});
