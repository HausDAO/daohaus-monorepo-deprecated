import { Haus } from '../src/index';

describe('haus', () => {
  const rpcConfig = {
    '0x4': 'https://<somekey>.rinkeby.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });
  it('can order daos by createdAt desc', async () => {
    const networkId = '0x4';

    const res = await haus.query.listDaos({ networkId });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(Number(res?.data?.daos[1].createdAt)).toBeGreaterThan(
        Number(res?.data?.daos[2].createdAt)
      );
    }
  });

  it('can order daos by createdAt asc', async () => {
    const networkId = '0x4';

    const res = await haus.query.listDaos({
      networkId,
      ordering: {
        orderBy: 'createdAt',
        orderDirection: 'asc',
      },
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(Number(res?.data?.daos[2].createdAt)).toBeGreaterThan(
        Number(res?.data?.daos[1].createdAt)
      );
    }
  });

  it('can order daos by totalShares asc', async () => {
    const networkId = '0x4';

    const res = await haus.query.listDaos({
      networkId,
      ordering: {
        orderBy: 'totalShares',
        orderDirection: 'asc',
      },
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(Number(res?.data?.daos[5].totalShares)).toBeGreaterThan(
        Number(res?.data?.daos[1].totalShares)
      );
    }
  });

  it('can order daos by totalShares desc', async () => {
    const networkId = '0x4';

    const res = await haus.query.listDaos({
      networkId,
      ordering: {
        orderBy: 'totalShares',
        orderDirection: 'desc',
      },
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(Number(res?.data?.daos[1].totalShares)).toBeGreaterThan(
        Number(res?.data?.daos[5].totalShares)
      );
    }
  });
});
