import { Keychain } from '@daohaus/common-utilities';
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

  it('can fetch all daos for an account', async () => {
    const networkIds: (keyof Keychain)[] = ['0x4', '0x2a'];
    const memberAddress = '0xced608aa29bb92185d9b6340adcbfa263dae075b';

    const res = await haus.query.listDaosByMember({
      memberAddress,
      networkIds,
    });

    console.log('res', res[1]?.data?.members);

    expect(res.length).toBe(2);
  });
});
