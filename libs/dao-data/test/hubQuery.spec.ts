import { Keychain } from '@daohaus/common-utilities';
import { Haus } from '../src/index';

describe('haus', () => {
  const rpcConfig = {
    '0x5': 'https://<somekey>.goerli.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create({ providers: rpcConfig });
  });

  it('can fetch all daos for an account', async () => {
    const networkIds: (keyof Keychain)[] = ['0x5'];
    const memberAddress =
      '0xf100041473280b594d78ab5fa4c44ba81edd367b'.toLowerCase();

    const res = await haus.profile.listDaosByMember({
      memberAddress,
      networkIds,
    });

    expect(res?.data?.daos.length).toBeGreaterThan(0);
  });
});
