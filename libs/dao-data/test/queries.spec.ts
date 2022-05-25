import { Haus } from '../src/index';

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
      ordering: {
        orderBy: 'createdAt',
        orderDirection: 'asc',
      },
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.daos.length).toBeGreaterThan(0);
  });

  it('can fetch a list of dao proposals', async () => {
    const networkId = '0x5';
    const dao = '0x69fe2468a844ae30dfd3e49e9790347491999a03';

    const res = await haus.query.listProposals({
      networkId,
      filter: { dao },
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.proposals.length).toBeGreaterThan(0);
  });

  it('can fetch a list of dao members', async () => {
    const networkId = '0x5';
    const dao = '0x5e3b62ac3da3c469e92f70f4d515701c785842e2';

    const res = await haus.query.listMembers({
      networkId,
      filter: { dao },
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.members.length).toBeGreaterThan(0);
    expect(res?.data?.members[0].memberAddress).toBe(
      '0x756ee8b8e898d497043c2320d9909f1dd5a7077f'
    );
  });

  it('can fetch a dao', async () => {
    const networkId = '0x5';
    const dao = '0x5e3b62ac3da3c469e92f70f4d515701c785842e2';

    const res = await haus.query.findDao({
      networkId,
      dao,
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.dao?.shareTokenName).toEqual('Baal Shares');
  });

  it('can fetch a single member', async () => {
    const networkId = '0x5';
    const dao = '0x067c7885df54e92884221b67901c3daeab3c6a1c';
    const memberAddress = '0xf100041473280b594d78ab5fa4c44ba81edd367b';

    const res = await haus.query.findMember({
      networkId,
      dao,
      memberAddress,
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.member?.createdAt).toEqual('1647545399');
  });

  it('can fetch a single proposal', async () => {
    const networkId = '0x5';
    const dao = '0x69fe2468a844ae30dfd3e49e9790347491999a03';
    const proposalId = '1';

    const res = await haus.query.findProposal({
      networkId,
      dao,
      proposalId,
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.proposal?.createdAt).toEqual('1653066832');
  });

  it('can fetch latest transaction by dao address', async () => {
    const networkId = '0x5';
    const dao = '0x69fe2468a844ae30dfd3e49e9790347491999a03';

    const res = await haus.query.findLatestTransaction({
      networkId,
      dao,
    });

    console.log(res);

    expect(res.error).toBeUndefined();
    expect(res?.data?.transactions?.length).toBe(1);
  });
});
