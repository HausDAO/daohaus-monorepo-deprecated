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
  it('can order daos by id desc', async () => {
    const networkId = '0x5';

    const res = await haus.query.listDaos({
      networkId,
      paging: { paginationType: 'offset', pageSize: 2, offset: 0 },
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(Number(res?.data?.daos[0].createdAt)).toBeGreaterThan(
        Number(res?.data?.daos[1].createdAt)
      );
    }
  });
});
