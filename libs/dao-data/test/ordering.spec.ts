import { Haus } from '../src/index';

describe('haus', () => {
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create();
  });
  it('can order daos by id desc', async () => {
    const networkId = '0x5';

    const res = await haus.query.listDaos({
      networkId,
      // paging: { paginationType: 'offset', pageSize: 2, offset: 0 },
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(Number(res?.data?.daos[0].createdAt)).toBeGreaterThan(
        Number(res?.data?.daos[1].createdAt)
      );
    }
  });
});
