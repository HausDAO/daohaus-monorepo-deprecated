import { Haus } from '../src/index';

describe('haus', () => {
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create();
  });

  it('can fetch a list of members - cursor', async () => {
    const networkId = '0x5';

    const res = await haus.query.listMembers({
      networkId,
      paging: {
        pageSize: 1,
        lastId: '0',
      },
    });

    const nextPageRes = await haus.query.listMembers({
      networkId,
      paging: res.nextPaging,
    });

    expect(res.error).toBeUndefined();
    expect(res.items.length).toBe(1);
    expect(nextPageRes.items.length).toBe(1);
  });
});
