import { Haus } from '../src/index';
import { DEFAULT_DAO_QUERY } from '../src/utils';

describe('haus', () => {
  const rpcConfig = {
    '0x4': 'https://<somekey>.rinkeby.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });

  // it('can fetch a list of daos', async () => {
  //   const networkId = '0x4';

  //   const res = await haus.query.listDaos({
  //     networkId,
  //   });

  //   expect(res.error).toBeUndefined();
  //   if (res.data) {
  //     expect(res.data['daos'].length).toBeGreaterThan(10);
  //     expect(res.data['daos'].length).toBeLessThan(1001);
  //   }
  // });

  // it('can fetch a list of dao proposals', async () => {
  //   const networkId = '0x4';
  //   const dao = '0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364';

  //   const res = await haus.query.listProposals({
  //     networkId,
  //     filter: { dao },
  //   });

  //   expect(res.error).toBeUndefined();
  //   if (res.data) {
  //     expect(res.data['proposals'].length).toBeGreaterThan(10);
  //   }
  // });

  // it('can fetch a list of dao members', async () => {
  //   const networkId = '0x4';
  //   const dao = '0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364';

  //   const res = await haus.query.listMembers({
  //     networkId,
  //     filter: { dao },
  //   });

  //   expect(res.error).toBeUndefined();
  //   if (res.data) {
  //     expect(res.data['members'].length).toBeGreaterThan(0);
  //   }
  // });

  it('can fetch a list of dao members from gql', async () => {
    // const networkId = '0x4';
    const networkId = '0x4';
    const dao = '0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364';

    const res = await haus.query.listMembersGQL({
      networkId,
      ordering: {
        orderBy: 'shares',
        orderDirection: 'asc',
      },
      filter: { dao },
    });

    // expect(res.error).toBeUndefined();
    // if (res.data) {
    //   expect(res.data['members'].length).toBeGreaterThan(0);
    // }
  });

  it('can fetch a dao', async () => {
    const networkId = '0x4';
    const dao = '0x01bdc8eb83282f2ea61bf3387b24a8e760411655';

    const res = await haus.query.findDao({
      networkId,
      dao,
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(res.data['dao'].shareTokenName).toEqual('8Baal Shares');
    }
  });

  it('can fetch a single member', async () => {
    const networkId = '0x4';
    const dao = '0x067c7885df54e92884221b67901c3daeab3c6a1c';
    const memberAddress = '0xf100041473280b594d78ab5fa4c44ba81edd367b';

    const res = await haus.query.findMember({
      networkId,
      dao,
      memberAddress,
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(res.data['member'].createdAt).toEqual('1647545399');
    }
  });

  it('can fetch a single proposal', async () => {
    const networkId = '0x4';
    const dao = '0x02515f07132f9bb6a30364d7dcb14f1b8f916f81';
    const proposalId = '2';

    const res = await haus.query.findProposal({
      networkId,
      dao,
      proposalId,
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(res.data['proposal'].createdAt).toEqual('1648060445');
    }
  });

  it('can fetch latest transaction by dao address', async () => {
    const networkId = '0x4';
    const dao = '0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364';

    const res = await haus.query.findLatestTransaction({
      networkId,
      dao,
    });

    expect(res.error).toBeUndefined();
    if (res.data) {
      expect(res.data['eventTransactions'].length).toBe(1);
      expect(res.data['eventTransactions'][0].createdAt).toBe('1649105343');
    }
  });

  it('can make a generic query', async () => {
    const query = DEFAULT_DAO_QUERY;
    const networkId = '0x4';
    const filter = { dao: '0xcfeed89f67ce9c05c43efc7a0ee2e931f22c1bc5' };

    const res = await haus.query.graphFetch({ query, networkId, filter });

    expect(res.error).toBeUndefined();
    expect(res.data).toBe;
    if (res.data) {
      expect(res.data['dao'].metaData.name).toEqual('Salty Nonce DAO');
    }
  });

  it('can fetch all daos for an account', async () => {
    const networks = ['0x4', '0x2a'];
    const account = '0xced608aa29bb92185d9b6340adcbfa263dae075b';

    const res = await haus.query.listDaosByAccount({
      account,
      networks,
    });

    expect(res.length).toBe(2);
  });
});
