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

  it('should have a account class', () => {
    expect(haus.account).toBeTruthy();
  });

  // TODO: Setup profile
  it('should have a a ceramic profile', async () => {
    const profile = await haus
      .account('testnet-clay', 'testnet-clay')
      .get('0x4', '0xEAC5F0d4A9a45E1f9FdD0e7e2882e9f60E301156');
    console.log(profile);
    expect(profile).toBeTruthy();
  });
});
