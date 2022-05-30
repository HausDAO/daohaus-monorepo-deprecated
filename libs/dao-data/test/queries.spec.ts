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
    const dao = '0x209866bbc39e0ac02ca7f2d0acd107ab95610439';

    const res = await haus.query.listProposals({
      networkId,
      filter: { dao },
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.proposals.length).toBe(0);
  });

  it('can fetch a list of dao members', async () => {
    const networkId = '0x5';
    const dao = '0x209866bbc39e0ac02ca7f2d0acd107ab95610439';

    const res = await haus.query.listMembers({
      networkId,
      filter: { dao },
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.members.length).toBeGreaterThan(2);
    expect(res?.data?.members[0].memberAddress).toBe(
      '0xf100041473280B594D78AB5Fa4C44Ba81edd367B'.toLowerCase()
    );
  });

  it('can fetch a dao', async () => {
    const networkId = '0x5';
    const dao = '0x209866bbc39e0ac02ca7f2d0acd107ab95610439';

    const res = await haus.query.findDao({
      networkId,
      dao,
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.dao?.shareTokenName).toEqual('Baal Shares');
  });

  it('can fetch a single member', async () => {
    const networkId = '0x5';
    const dao = '0x209866bbc39e0ac02ca7f2d0acd107ab95610439';
    const memberAddress = '0xf100041473280b594d78ab5fa4c44ba81edd367b';

    const res = await haus.query.findMember({
      networkId,
      dao,
      memberAddress,
    });

    expect(res.error).toBeUndefined();
    expect(res?.data?.member?.createdAt).toEqual('1653592270');
  });

  it('can fetch a single proposal', async () => {
    const networkId = '0x5';
    const dao = '0x209866bbc39e0ac02ca7f2d0acd107ab95610439';
    const proposalId = '1';

    const res = await haus.query.findProposal({
      networkId,
      dao,
      proposalId,
    });

    expect(res.error).toBeUndefined();
  });

  it('can fetch latest transaction by dao address', async () => {
    const networkId = '0x5';
    const dao = '0x209866bbc39e0ac02ca7f2d0acd107ab95610439';

    const res = await haus.query.findLatestTransaction({
      networkId,
      dao,
    });

    console.log(res);

    expect(res.error).toBeUndefined();
    expect(res?.data?.transactions?.length).toBe(1);
  });
});
