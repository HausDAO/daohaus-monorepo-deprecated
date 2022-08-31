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
      ordering: { orderBy: 'createdAt', orderDirection: 'desc' },
      paging: { pageSize: 2, offset: 0 },
    });

    expect(res.error).toBeUndefined();
    if (res.items) {
      expect(Number(res?.items[0].createdAt)).toBeGreaterThan(
        Number(res?.items[1].createdAt)
      );
    }
  });
});
