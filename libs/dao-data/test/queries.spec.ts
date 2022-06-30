import { Haus } from '../src/index';

describe('haus', () => {
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create();
  });

  it('can fetch a list of daos - offset', async () => {
    const networkId = '0x5';

    const res = await haus.query.listDaos({
      networkId,
      paging: { offset: 0, pageSize: 2 },
    });

    const nextPageRes = await haus.query.listDaos({
      networkId,
      paging: res.nextPaging,
    });

    const previousPageRes = await haus.query.listDaos({
      networkId,
      paging: res.previousPaging,
    });

    expect(res.error).toBeUndefined();
    expect(res.items.length).toBe(2);
    expect(nextPageRes.items.length).toBe(2);
    expect(res.previousPaging).toBeFalsy();
    expect(nextPageRes.previousPaging).toBeTruthy();

    expect(res.items[0].id).toEqual(previousPageRes.items[0].id);
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

    const nextPageRes = await haus.query.listProposals({
      networkId,
      paging: res.nextPaging,
    });

    expect(res.error).toBeUndefined();
    expect(res.items.length).toBe(1);
    expect(nextPageRes.items.length).toBe(1);
  });
});
