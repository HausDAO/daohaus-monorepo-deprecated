import { Keychain } from '@daohaus/common-utilities';
import { Haus } from '../src/index';

describe('haus', () => {
  const rpcConfig = {
    '0x5': 'https://<somekey>.goerli.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });

  it('can fetch all daos for an account', async () => {
    const networkIds: (keyof Keychain)[] = ['0x5'];
    const memberAddress = '0xced608aa29bb92185d9b6340adcbfa263dae075b';

    const res = await haus.query.listDaosByMember({
      memberAddress,
      networkIds,
    });

    expect(res?.data?.daos.length).toBeGreaterThan(18);
  });

  it('can request tokens with the daos', async () => {
    const networkIds: (keyof Keychain)[] = ['0x5'];
    const memberAddress = '0xced608aa29bb92185d9b6340adcbfa263dae075b';

    const res = await haus.query.listDaosByMember({
      memberAddress,
      networkIds,
      includeTokens: true,
    });

    expect(res?.data?.daos.length).toBeGreaterThan(2);
    expect(res.data?.daos[0].tokenBalances?.length).toBeGreaterThan(1);
  });
});
